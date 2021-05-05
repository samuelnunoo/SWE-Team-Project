const supertest = require("supertest");
const app = require("../server");
// import { createUser } from '../../Data/databaseAbstraction';
const db = require("../../Data/databaseAbstraction");
const testHelper = require("./testCases");
const bcrypt = require("bcryptjs");
jest.mock("../../Data/databaseAbstraction");
jest.mock("bcryptjs");

// beforeEach(() => {methods:
//   db.mockClear();
// });

describe("1: Valid token is required for GET/PUT/POST operations on private resources", () => {
  it("GET /api/nodes/:id without token in request responds 401", async () => {
    await supertest(app).get("/api/nodes/1").send().expect(401);
  });
  it("GET /api/nodes/:id with invalid token in request responds 403", async () => {
    const headerInvalidToken = { token: testHelper.getInvalidToken() };
    await supertest(app)
      .get("/api/nodes/1")
      .set(headerInvalidToken) // sets header
      .send()
      .expect(403);
  });
  it("PUT /api/nodes/:id without token in request responds 401", async () => {
    await supertest(app).put("/api/nodes/1").send().expect(401);
  });
  it("PUT /api/nodes/:id with invalid token in request responds 403", async () => {
    const headerInvalidToken = { token: testHelper.getInvalidToken() };
    await supertest(app)
      .put("/api/nodes/1")
      .set(headerInvalidToken) // sets header
      .send()
      .expect(403);
  });
  it("DELETE /api/nodes/:id without token in request responds 401", async () => {
    await supertest(app).delete("/api/nodes/1").send().expect(401);
  });
  it("DELETE /api/nodes/:id with invalid token in request responds 403", async () => {
    const headerInvalidToken = { token: testHelper.getInvalidToken() };
    await supertest(app)
      .delete("/api/nodes/1")
      .set(headerInvalidToken) // sets header
      .send()
      .expect(403);
  });
  it("GET /api/nodes without token in request responds 401", async () => {
    await supertest(app).get("/api/nodes").send().expect(401);
  });
  it("GET /api/nodes with invalid token in request responds 403", async () => {
    const headerInvalidToken = { token: testHelper.getInvalidToken() };
    await supertest(app)
      .get("/api/nodes")
      .set(headerInvalidToken) // sets header
      .send()
      .expect(403);
  });
  it("POST /api/nodes without token in request responds 401", async () => {
    await supertest(app).post("/api/nodes").send().expect(401);
  });
  it("POST /api/nodes without token in request responds 403", async () => {
    const headerInvalidToken = { token: testHelper.getInvalidToken() };
    await supertest(app)
      .post("/api/nodes")
      .set(headerInvalidToken) // sets header
      .send()
      .expect(403);
  });
});

describe("2: POST /api/auth/signup", () => {
  it("Attempt to sign up with duplicate email responds 409", async () => {
    db.createUser.mockImplementationOnce(testHelper.mockPromiseReject);

    await supertest(app)
      .post("/api/auth/signup")
      .send(testHelper.getDummySignupData())
      .expect(409);
  });
  it("Attempt to sign up with new email responds 201, user data in body", async () => {
    db.createUser.mockImplementationOnce(testHelper.mockPromiseResolve);

    await supertest(app)
      .post("/api/auth/signup")
      .send(testHelper.getDummySignupData())
      .expect(201)
      .then((res) => {
        expect(res.body).toStrictEqual(testHelper.getDummySignupData());
      });
  });
});

describe("3: POST /api/auth/signin", () => {
  it("Request with non-registered email responds 401", async () => {
    db.getUserByEmail.mockImplementationOnce(testHelper.mockPromiseReject);
    await supertest(app)
      .post("/api/auth/signin")
      .send(testHelper.getDummySignupData())
      .expect(401);
  });
  it("Request with incorrect password responds 401", async () => {
    db.getUserByEmail.mockImplementation(testHelper.findUserMockPromiseResolve);
    bcrypt.compareSync.mockImplementationOnce(() => false);
    await supertest(app)
      .post("/api/auth/signin")
      .send(testHelper.getDummyLoginData())
      .expect(401);
  });
  it("Request with valid credentials responds 200, token in body", async () => {
    db.getUserByEmail.mockImplementationOnce(
      testHelper.findUserMockPromiseResolve
    );
    bcrypt.compareSync.mockImplementationOnce(() => true);
    await supertest(app)
      .post("/api/auth/signin")
      .send(testHelper.getDummySignupData())
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("token");
      });
  });
});

describe("4: GET /api/nodes", () => {
  it("Request with no query max var responds 200, 50 nodes in body", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.getNodes.mockImplementationOnce(testHelper.mockGetNumNodes);
    await supertest(app)
      .get("/api/nodes")
      .set(headerValidToken)
      .send({})
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(50);
      });
  });
  it("Request with query max = 10 responds 200, 10 nodes in body", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.getNodes.mockImplementationOnce(testHelper.mockGetNumNodes);
    await supertest(app)
      .get("/api/nodes")
      .set(headerValidToken)
      .query({ max: 10 })
      .send({})
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(10);
      });
  });
});

describe("5: POST /api/nodes", () => {
  it("Request with invalid node in body responds 400", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.createNode.mockImplementationOnce(testHelper.mockCreateNodeFail);
    await supertest(app)
      .post("/api/nodes")
      .set(headerValidToken)
      .send(testHelper.getMockNodeData())
      .expect(400);
  });
  it("Request with valid node responds 200 new node in body", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.createNode.mockImplementationOnce(testHelper.mockCreateNode);
    await supertest(app)
      .post("/api/nodes")
      .set(headerValidToken)
      .send(testHelper.getMockNodeData())
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("owner");
      });
  });
});

describe("6: GET /api/nodes/:id", () => {
  it("Request with valid node id responds 200", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.getNode.mockImplementationOnce(testHelper.mockGetNode);
    await supertest(app)
      .get(`/api/nodes/${testHelper.getTestNodeID()}`)
      .set(headerValidToken)
      .send()
      .expect(200)
      .then((res) => {
        expect(res.body._id).toEqual(testHelper.getTestNodeID());
        expect(res.body).toHaveProperty("title");
      });
  });
  it("Request with invalid node id responds 404", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.getNode.mockImplementationOnce(testHelper.mockGetNodeFail);
    await supertest(app)
      .get(`/api/nodes/${testHelper.getTestNodeID()}`)
      .set(headerValidToken)
      .send()
      .expect(404);
  });
});

describe.skip("7: PUT /api/nodes/:id", () => {
  
});

describe.skip("8: DELETE /api/nodes/:id", () => {
  
});

describe.skip("9: GET /api/typeCollections", () => {
  
});

describe.skip("10: GET /api/typeCollections/:id", () => {
  
});


// describe("GET /api/testobject - get a test object by id", () => {
//   it.skip("should create a new post", async () => {
//     db.getNode.mockImplementationOnce(() => getDBResultTestCase());

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
