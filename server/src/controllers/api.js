import paths from "../paths";

let createApiControllers = db => {
  const {
    Category,
    Brand,
    Product,
    User,
    Robot,
    Order,
    UserProduct,
    OrderProduct,
    Sequelize: { Op }
  } = db;

  return {
    brandRead: (request, response) => {
      const { category } = request.query;
      console.log(category);

      if (category) {
        // Retrieves all brands that have products from this specific category
        Category.findOne({
          where: { name: category }
        })
          .then(category => {
            if (category === null) {
              return [];
            } else {
              return category.getProducts();
            }
          })
          .then(products => {
            const brandIds = products
              .map(product => product.brandId)
              .filter(
                (brandId, index, self) => self.indexOf(brandId) === index
              );
            const brandQueries = brandIds.map(brandId =>
              Brand.findById(brandId)
            );
            Promise.all(brandQueries).then(brands => {
              const brandsList = brands.map(brand => ({
                name: brand.name,
                img: brand.img
              }));
              response.json({ success: true, brandsList });
            });
          })
          .catch(err => response.json({ success: false }));
      } else {
        // Retrieve all brands
        Brand.all()
          .then(brands => {
            const brandsList = brands.map(brand => ({
              name: brand.name,
              img: brand.img
            }));
            response.json({ success: true, brandsList });
          })
          .catch(err => response.json({ success: false }));
      }
    },

    productRead: async (request, response) => {
      const { category, brand } = request.query;
      if (category && brand) {
        try {
          const currentBrand = await Brand.findOne({
            where: { name: brand }
          });
          const productListRaw = await Product.findAll({
            where: { brandId: currentBrand.id },
            include: [
              {
                model: Category,
                where: {
                  name: category
                }
              }
            ]
          });
          const productList = productListRaw.map(product => ({
            id: product.id,
            name: product.name,
            img: product.img,
            price: product.price,
            brandId: product.brandId
          }));
          response.json({ success: true, productList });
        } catch (error) {
          response.json({ success: false });
        }
      }
    },

    orderRead: async (request, response) => {
      try {
        const orders = await Order.findAll();
        const history = await Promise.all(
          orders.map(async order => {
            const prods = await order.getProducts();
            return {
              id: order.id,
              deliveryStatus: order.deliveryStatus,
              date: `${order.createdAt.getDate()}/${order.createdAt.getMonth()}/${order.createdAt.getFullYear()}`,
              products: prods.map(product => ({
                name: product.name,
                price: product.price
              }))
            };
          })
        );
        response.json({ success: true, history });
      } catch (error) {
        response.json({ success: false });
      }
    },

    addToCart: async (request, response) => {
      const { id } = request.params;
      const { product_id } = request.query;

      if (id && product_id) {
        try {
          const user = await User.findById(id);
          const product = await Product.findById(product_id);
          const hasProduct = await user.hasProduct(product);
          if (hasProduct) {
            const association = await UserProduct.findOne({
              where: { userId: id, productId: product_id }
            });
            association.count++;
            await association.save();
          } else {
            const feedback = await user.addProduct(product);
            if (feedback.length === 0) return response.json({ success: false });
          }
          return response.json({ success: true });
        } catch (error) {
          response.json({ success: false });
        }
      }
      response.json({ success: false });
    },

    removeFromCart: async (request, response) => {
      const { id, product_id } = request.params;

      if (id && product_id) {
        try {
          const user = await User.findById(id);
          const product = await Product.findById(product_id);
          const hasProduct = await user.hasProduct(product);
          if (hasProduct) {
            const association = await UserProduct.findOne({
              where: { userId: id, productId: product_id }
            });
            if (association.count === 1) {
              await association.destroy();
            } else {
              association.count--;
              await association.save();
            }
          } else {
            const feedback = await user.removeProduct(product);
            if (feedback.length === 0) return response.json({ success: true });
          }
        } catch (error) {
          response.json({ success: false });
        }
      }
      response.json({ success: false });
    },

    getCart: async (request, response) => {
      const { id } = request.params;

      if (id) {
        try {
          const user = await User.findById(id);
          const cartRaw = await user.getProducts();
          const cart = await Promise.all(
            cartRaw.map(async item => {
              const association = await UserProduct.findOne({
                where: { userId: id, productId: item.id }
              });
              return {
                id: item.id,
                name: item.name,
                price: item.price,
                count: association.count
              };
            })
          );
          response.json({ success: true, cart });
        } catch (error) {
          response.json({ success: false });
        }
      }
      response.json({ success: false });
    },

    getUser: async (request, response) => {
      const { id } = request.params;
      if (id) {
        try {
          const userRaw = await User.findById(id);
          const user = {
            id: userRaw.id,
            email: userRaw.email,
            name: userRaw.name,
            block: userRaw.block,
            level: userRaw.level,
            unit: userRaw.unit,
            phone: userRaw.phone
          };
          response.json({ success: true, user });
        } catch (error) {
          response.json({ success: false });
        }
      }
      response.json({ success: false });
    },

    createOrder: async (request, response) => {
      const { id } = request.params;
      if (id) {
        try {
          const order = await Order.findOne({
            where: {
              userId: id,
              [Op.or]: [
                { deliveryStatus: "Preparing" },
                { deliveryStatus: "On the way" }
              ]
            }
          });

          if (order) {
            return response.json({ success: false });
          }

          const user = await User.findById(id);
          const products = await user.getProducts();
          const newOrder = await Order.create({
            deliveryStatus: "Preparing",
            userId: id
          });

          const feedback = await newOrder.setProducts(products);

          const associations = await OrderProduct.findAll({
            where: {
              orderId: newOrder.id
            }
          });
          await Promise.all(
            associations.map(async association => {
              const { count } = await UserProduct.findOne({
                where: {
                  productId: association.productId,
                  userId: id
                }
              });
              association.count = count;
              await association.save();
            })
          );

          if (!newOrder.id) {
            return response.json({ success: false });
          } else {
            return response.json({ success: true, orderId: newOrder.id });
          }
        } catch (error) {
          response.json({ success: false });
        }
      }
      response.json({ success: false });
    },

    clearCart: async (request, response) => {
      const { id } = request.params;
      if (id) {
        try {
          const user = await User.findById(id);
          const feedback = await user.setProducts([]);
          // const product = await Product.findById(product_id);
          // const feedback = await user.removeProduct(product);
          return response.json({ success: true });
        } catch (error) {
          response.json({ success: false });
        }
      }
      response.json({ success: false });
    },

    getActiveOrder: async (request, response) => {
      const { id: userId } = request.params;
      if (userId) {
        try {
          const order = await Order.findOne({
            where: {
              userId,
              [Op.or]: [
                { deliveryStatus: "Preparing" },
                { deliveryStatus: "On the way" }
              ]
            }
          });

          if (!order) {
            return response.json({ success: true });
          }

          const products = await order.getProducts();
          const orderProducts = await Promise.all(
            products.map(async item => {
              const association = await OrderProduct.findOne({
                where: { orderId: order.id, productId: item.id }
              });
              return {
                id: item.id,
                name: item.name,
                price: item.price,
                count: association.count
              };
            })
          );
          response.json({
            success: true,
            orderId: order.id,
            orderStatus: order.deliveryStatus,
            orderProducts
          });
        } catch (error) {
          response.json({ success: false });
        }
      }
      response.json({ success: false });
    },

    getOrders: async (request, response) => {
      const { id: userId } = request.params;
      if (userId) {
        try {
          const orders = await Order.findAll({
            where: { userId: userId, deliveryStatus: "Closed" }
          });
          const history = await Promise.all(
            orders.map(async order => {
              const prods = await order.getProducts();
              return {
                date: `${order.createdAt.getDate()}/${order.createdAt.getMonth()}/${order.createdAt.getFullYear()}`,
                products: prods.map(product => ({
                  name: product.name,
                  price: product.price
                }))
              };
            })
          );
          response.json({ success: true, history });
        } catch (error) {
          response.json({ success: false });
        }
      }
      response.json({ success: false });
    },

    profileUpdate: async (request, response) => {
      const { id } = request.params;
      const { block, level, unit, phone } = request.body.user;
      if (id) {
        try {
          const user = await User.findById(id);
          const feedback = await user.update({
            block,
            level,
            unit,
            phone
          });
          if (feedback) {
            return response.json({ success: false });
          } else {
            return response.json({ success: true });
          }
        } catch (error) {
          response.json({ success: false });
        }
      }
      response.json({ success: false });
    },

    getOrderUser: async (request, response) => {
      const { id } = request.params;
      if (id) {
        try {
          const order = await Order.findById(id);
          const userId = await order.userId;
          const user = await User.findById(userId);
          response.json({
            success: true,
            user,
            orderStatus: order.deliveryStatus
          });
        } catch (error) {
          response.json({ success: false });
        }
      }
      response.json({ success: false });
    },

    dispatchRobot: async (request, response) => {
      const { id } = request.params;

      const order = await Order.findById(id);
      console.log("Finding order");

      if (!order) return response.json({ success: false });
      console.log("Found order");

      // find available robot
      const robot = await Robot.findOne({
        where: {
          status: "Available"
        }
      });
      console.log("Robot:", robot);

      // assign orderid to robot (if found one)
      if (!robot) return response.json({ success: false });

      console.log("Found one");

      robot.orderId = id;
      robot.status = "On the way";
      await robot.save();

      order.deliveryStatus = "On the way";
      await order.save();

      // Start simulation
      console.log(`Starting simulation for robot: ${robot.id}`);
      const timer = setInterval(async () => {
        // Fetch current pose for robot with orderId
        try {
          console.log(`Simulation step for robot: ${robot.id}`);
          // const robot = await Robot.findOne({
          //   where: {
          //     orderId
          //   }
          // });
          // if (robot.length === 0) return;
          const currentPath = paths[order.userId];
          if (robot.poseIndex === currentPath.length - 1) {
            order.deliveryStatus = "Closed";
            await order.save();
            robot.poseIndex = 0;
            robot.status = "Available";
            await robot.save();
            console.log("Order delivered. Shutting simulation down");
            clearInterval(timer);
            return;
          }
          robot.poseIndex++;
          await robot.save();
        } catch (error) {
          console.log(`Error during simulation: ${error}`);
          console.log("Shutting simulation down");
          clearInterval(timer);
        }
      }, 1000);
      console.log("returning");

      return response.json({ success: true });
    }
  };
};

export default createApiControllers;
