import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models";

const app = express();
const sequelize = db.sequelize;
const Category = db.Category;
const Brand = db.Brand;
// import createApiRouter from "./routes/api";
// const api = createApiRouter(db);

// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
// app.use("/api", api);

app.get("/", (req, res) =>
  res.send("This is my Express server, nothing to show at root.")
);

// start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  // sequelize.sync({ force: true }).then(() => {
  console.log("Test test test");
  Category.findOne({
    where: {
      name: "chocolate"
    }
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
        .filter((brandId, index, self) => self.indexOf(brandId) === index);
      const brandQueries = brandIds.map(brandId => Brand.findById(brandId));
      Promise.all(brandQueries).then(brands =>
        console.log(brands.map(brand => brand.name))
      );
    })
    .catch(err => console.log(err));

  app.listen(PORT, () =>
    console.log(`~~~Express server listening on port ${PORT}~~~`)
  );
});
