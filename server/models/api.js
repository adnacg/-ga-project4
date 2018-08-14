let createApiModel = db => {
  class Api {
    constructor(id) {
      this.id = id;
    }

    static async read(errorCallback, successCallback) {
      // let queryText = "";
      // let values = [];
      try {
        //   const { rows } = await db.query(queryText, values);
        //   let someId = rows[0].id;
        //   queryText ="";
        //   values = [];
        //   await db.query(queryText, values);
        //   for (var key in object) {
        //     if (object[key]) {
        //       queryText ="";
        //       values = [];
        //       await db.query(queryText, values);
        //     }
        //   }
        successCallback();
      } catch (error) {
        errorCallback(error);
      }
    }
  }
  return Api;
};
export default createApiModel;
