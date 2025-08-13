const request = require("supertest");
const app = require("../../app");

function InitTestServer() {
  return {
    GetClient: () => request(app)
  };
}

module.exports = InitTestServer;
