const supertest = require("supertest");
const app = require("../server");
const db = require("../../Data/databaseAbstraction");
const testHelper = require("./testCases");
jest.mock("../../Data/databaseAbstraction");

describe("1: Valid token is required for GET/PUT/POST operations on private resources", () => {
  it("GET /api/nodes/:id without token in request responds 401", async () => {
    await supertest(app)
      .get("/api/nodes/1")
      .send()
      .then((res) => {
        expect(res.statusCode).toEqual(401);
      });
  });
  it("GET /api/nodes/:id with invalid token in request responds 403", async () => {
    const headerInvalidToken = { token: testHelper.getInvalidToken() };
    await supertest(app)
      .get("/api/nodes/1")
      .set(headerInvalidToken) // sets header
      .send()
      .then((res) => {
        expect(res.statusCode).toEqual(403);
      });
  });
    it("PUT /api/nodes/:id without token in request responds 401", async () => {
      await supertest(app)
        .put("/api/nodes/1")
        .send()
        .then((res) => {
          expect(res.statusCode).toEqual(401);
        });
    });
    it("PUT /api/nodes/:id with invalid token in request responds 403", async () => {
      const headerInvalidToken = { token: testHelper.getInvalidToken() };
      await supertest(app)
        .put("/api/nodes/1")
        .set(headerInvalidToken) // sets header
        .send()
        .then((res) => {
          expect(res.statusCode).toEqual(403);
        });
    });
    it("DELETE /api/nodes/:id without token in request responds 401", async () => {
      await supertest(app)
        .delete("/api/nodes/1")
        .send()
        .then((res) => {
          expect(res.statusCode).toEqual(401);
        });
    });
    it("DELETE /api/nodes/:id with invalid token in request responds 403", async () => {
      const headerInvalidToken = { token: testHelper.getInvalidToken() };
      await supertest(app)
        .delete("/api/nodes/1")
        .set(headerInvalidToken) // sets header
        .send()
        .then((res) => {
          expect(res.statusCode).toEqual(403);
        });
    });
    it("GET /api/nodes without token in request responds 401", async () => {
      await supertest(app)
        .get("/api/nodes")
        .send()
        .then((res) => {
          expect(res.statusCode).toEqual(401);
        });
    });
    it("GET /api/nodes with invalid token in request responds 403", async () => {
      const headerInvalidToken = { token: testHelper.getInvalidToken() };
      await supertest(app)
        .get("/api/nodes")
        .set(headerInvalidToken) // sets header
        .send()
        .then((res) => {
          expect(res.statusCode).toEqual(403);
        });
    });
    it("POST /api/nodes without token in request responds 401", async () => {
      await supertest(app)
        .post("/api/nodes")
        .send()
        .then((res) => {
          expect(res.statusCode).toEqual(401);
        });
    });
    it("POST /api/nodes without token in request responds 403", async () => {
      const headerInvalidToken = { token: testHelper.getInvalidToken() };
      await supertest(app)
        .post("/api/nodes")
        .set(headerInvalidToken) // sets header
        .send()
        .then((res) => {
          expect(res.statusCode).toEqual(403);
        });
    });
});

describe.skip("2: POST /api/auth/signup", () => {
  it("Request with existing email responds 409", () => {}),
    it("Request with new, unique credentials responds 200", () => {});
});

describe.skip("3: POST /api/auth/signin", () => {
  it("Request with invalid credentials responds 401", () => {}),
    it("Request with valid credentials responds 200 + token", () => {});
});

describe.skip("POST /api/nodes", () => {
  it("Request with invalid credentials responds 401", () => {}),
    it("Request with valid credentials responds 200 + token", () => {});
});

// describe("GET /api/testobject - get a test object by id", () => {
//   it.skip("should create a new post", async () => {
//     db.getNode.mockImplementation(() => getDBResultTestCase());

//     supertest(app)
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
