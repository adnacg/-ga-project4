// import sha256 from "js-sha256";

let createApiControllers = db => {
  const { Category, Brand, Product, User, Order } = db;

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
              response.json(brandsList);
            });
          })
          .catch(err => console.log(err));
      } else {
        // Retrieve all brands
        Brand.all().then(brands => {
          const brandsList = brands.map(brand => ({
            name: brand.name,
            img: brand.img
          }));
          response.json(brandsList);
        });
      }
    },

    productRead: async (request, response) => {
      const { category, brand } = request.query;
      if (category && brand) {
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
        response.json(productList);
      }
    },

    addToCart: async (request, response) => {
      const { id } = request.params;
      const { product_id } = request.query;
      if (id && product_id) {
        const user = await User.findById(id);
        const product = await Product.findById(product_id);

        const feedback = await user.addProduct(product);
        if (feedback.length === 0) return response.json({ success: false });
        return response.json({ success: true });
      }
      response.json({ success: false });
    },

    removeFromCart: async (request, response) => {
      const { id, product_id } = request.params;
      if (id && product_id) {
        const user = await User.findById(id);
        const product = await Product.findById(product_id);

        const feedback = await user.removeProduct(product);
        return response.json({});
      }
      response.json({});
    },

    getCart: async (request, response) => {
      const { id } = request.params;
      if (id) {
        const user = await User.findById(id);
        const cartRaw = await user.getProducts();
        const cart = cartRaw.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price
        }));
        response.json(cart);
      }
    },

    getUser: async (request, response) => {
      const { id } = request.params;
      if (id) {
        const userRaw = await User.findById(id);
        const user = {
          id: userRaw.id,
          email: userRaw.email,
          name: userRaw.name,
          address: userRaw.address,
          unit: userRaw.unit,
          postal: userRaw.postal,
          phone: userRaw.phone
        };
        response.json(user);
      }
    },

    createOrder: async (request, response) => {
      const { id } = request.params;
      if (id) {
        const user = await User.findById(id);
        const products = await user.getProducts();
        const newOrder = await Order.create({
          deliveryStatus: "Preparing",
          userId: id
        });
        const feedback = await newOrder.setProducts(products);
        if (feedback[0].length === 0) {
          return response.json({ success: false });
        } else {
          return response.json({ success: true, orderId: newOrder.id });
        }
      }
      response.json({ success: false });
    },

    clearCart: async (request, response) => {
      const { id } = request.params;
      if (id) {
        const user = await User.findById(id);
        const feedback = await user.setProducts([]);
        console.log(feedback);

        // const product = await Product.findById(product_id);
        // const feedback = await user.removeProduct(product);
        return response.json({ success: true });
      }
      response.json({ success: false });
    },

    getActiveOrder: async (request, response) => {
      const { id: userId } = request.params;
      if (userId) {
        console.log("Before DB call");
        const order = await Order.findOne({
          where: {
            userId,
            deliveryStatus: "Preparing"
          }
        });
        console.log(order);
        const products = await order.getProducts();
        const orderProducts = products.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price
        }));
        response.json({ orderStatus: order.deliveryStatus, orderProducts });
      }
      response.json({});
    },

    getOrders: async (request, response) => {
      const { id: userId } = request.params;
      if (userId) {
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
        response.json(history);
      }
      response.json({});
    }
  };
};

export default createApiControllers;
