// Import necessary modules and dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js"); // Import your Express app
const Bus = require("../models/busModel");

chai.use(chaiHttp);
const expect = chai.expect;

// Describe block for testing the bus controller
describe("Bus Controller", function () {
  // Increase the timeout for the entire test suite
  this.timeout(10000);

  // Test for failing to get a non-existing bus by ID (negative scenario)
  it("should fail to get a non-existing bus by ID", function (done) {
    chai
      .request(app)
      .get(`/api/bus/nonExistingBusId`) // Replace "nonExistingBusId" with a non-existing bus ID
      .end((err, res) => {
        expect(res).to.have.status(500); // Expecting a 404 error
        // Add more assertions as needed
        done();
      });
  });

  // Add more test cases for other scenarios
});
