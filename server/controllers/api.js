// import sha256 from "js-sha256";
import createApiModel from "../models/api";

let createApiControllers = db => {
  const Api = createApiModel(db);

  return {
    testRead: (request, response) => {
      let errorCallback = error => {
        console.log("Error:", error);
        response.status(401);
      };
      let successCallback = () => {
        response.json([
          { title: "Hello World3", thumbnailUrl: "example.com" },
          { title: "Hello World2", thumbnailUrl: "example.com" }
        ]);
      };
      Api.read(errorCallback, successCallback);
    }
  };
};

export default createApiControllers;
