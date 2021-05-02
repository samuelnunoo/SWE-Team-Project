const supertest = require("supertest");
const app = require("../server");
const db = require("../../Data/databaseAbstraction");
const { getDBResultSuccess1, getDBResultTestCase } = require("./testCases");
jest.mock("../../Data/databaseAbstraction");

describe("GET /api/testobject - get a test object by id", () => {
  it("should create a new post", async () => {
    db.getNode.mockImplementation(() => getDBResultTestCase());

    await supertest(app)
      .get("/api/testobject/1")
      // .query({ id: 1 })
      .send({
        content: {
          message: "post!",
        },
      })
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("title");
        expect(parseInt(res.body.id)).toEqual(1);
        expect(res.body.message).toEqual("post!");
        expect(res.body.dbResult).toHaveProperty("node");
      });
  });
});

// describe("GET /api/Node - get a test object by id", () => {
//   test.skip("should create a new post", async () => {
//     db.getNode().mockImplementation(() => getDBResultSuccess1());

//     await supertest(app)
//       .get("/api/testobject/1")
//       // .query({ id: 1 })
//       .send({
//         content: {
//           message: "post!",
//         },
//       })
//       .then((res) => {
//         console.log(res.body);
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty("title");
//         expect(parseInt(res.body.id)).toEqual(1);
//         expect(res.body.message).toEqual("post!");
//         expect(res.body.dbResult).toHaveProperty("node");
//       });
//   });
// });
