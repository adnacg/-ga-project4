let createApiModel = db => {
  class Api {
    constructor(id) {
      this.id = id;
    }

    static async read(errorCallback, successCallback) {
      let queryText =
        "SELECT DISTINCT brands.name FROM categories INNER JOIN category_product ON categories.id = category_product.category_id INNER JOIN products ON category_product.product_id = products.id INNER JOIN brands ON products.brand_id = brands.id WHERE categories.id = $1;";
      let values = [1];
      try {
        const { rows } = await db.query(queryText, values);
        // let someId = rows[0].id;
        // queryText = "";
        // values = [];
        // await db.query(queryText, values);
        // for (var key in object) {
        //   if (object[key]) {
        //     queryText = "";
        //     values = [];
        //     await db.query(queryText, values);
        //   }
        // }
        successCallback(rows);
      } catch (error) {
        errorCallback(error);
      }
    }

    static async readbrand(errorCallback, successCallback) {
      let queryText = "SELECT * FROM products WHERE brand_id = $1;";
      let values = [1];
      try {
        const { rows } = await db.query(queryText, values);
        successCallback(rows);
      } catch (error) {
        errorCallback(error);
      }
    }
  }
  return Api;
};
export default createApiModel;
