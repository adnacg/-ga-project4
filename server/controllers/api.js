// import sha256 from "js-sha256";
import createApiModel from "../models/api";

let createApiControllers = db => {
  const Api = createApiModel(db);

  return {
    categoryRead: (request, response) => {
      let errorCallback = error => {
        console.log("Error:", error);
        response.status(401);
      };
      let successCallback = rows => {
        response.json(rows);
        console.log(rows);
      };
      Api.read(errorCallback, successCallback);
    },

    brandRead: (request, response) => {
      let errorCallback = error => {
        console.log("Error:", error);
        response.status(401);
      };
      let successCallback = rows => {
        response.json(rows);
      };
      Api.readbrand(errorCallback, successCallback);
    }
  };
};

export default createApiControllers;
