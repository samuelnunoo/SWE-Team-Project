const supertest = require("supertest");
const app = require("../server");
// import { createUser } from '../../Data/databaseAbstraction';
const db = require("../../Data/databaseAbstraction");
const testHelper = require("./testCases");
const bcrypt = require("bcryptjs");
jest.mock("../../Data/databaseAbstraction");
jest.mock("bcryptjs");

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
    const numItems = 10;
    await supertest(app)
      .get("/api/nodes")
      .set(headerValidToken)
      .query({ max: numItems })
      .send({})
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(numItems);
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
  it("Params go through and request with valid node responds 200 new node in body", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.createNode.mockImplementationOnce(testHelper.mockCreateNode);
    await supertest(app)
      .post("/api/nodes")
      .set(headerValidToken)
      .send(testHelper.getMockNodeData())
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("_id");
        expect(res.body.owner).toBe(testHelper.getDummyUserID());
      });
  });
});

describe("6: GET /api/nodes/:id", () => {
  it("Request with invalid node id responds 404", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.getNode.mockImplementationOnce(testHelper.mockGetNodeFail);
    await supertest(app)
      .get(`/api/nodes/${testHelper.getTestNodeID()}`)
      .set(headerValidToken)
      .send()
      .expect(404);
  });
  it("Params go through and request with valid node id responds 200", async () => {
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
});

describe("7: PUT /api/nodes/:id", () => {
  it("Request with invalid node body responds 400", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.updateNode.mockImplementationOnce(testHelper.mockUpdateNodeFail);
    await supertest(app)
      .put(`/api/nodes/${testHelper.getTestNodeID()}`)
      .set(headerValidToken)
      .send({})
      .expect(400);
  });
  it("Params go through and request with valid node body responds 200", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.updateNode.mockImplementationOnce(testHelper.mockUpdateNode);
    await supertest(app)
      .put(`/api/nodes/${testHelper.getTestNodeID()}`)
      .set(headerValidToken)
      .send(testHelper.getMockNodeData())
      .expect(200)
      .then((res) => {
        expect(res.body.owner).toBe(testHelper.getDummyUserID());
        expect(res.body.id).toBe(testHelper.getTestNodeID());
      });
  });
});

describe("8: DELETE /api/nodes/:id", () => {
  it("Params go through and request with valid ID responds 200", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.deleteNode.mockImplementationOnce(testHelper.mockDeleteNode);
    await supertest(app)
      .delete(`/api/nodes/${testHelper.getTestNodeID()}`)
      .set(headerValidToken)
      .send()
      .expect(200)
      .then((res) => {
        expect(res.body.owner).toBe(testHelper.getDummyUserID());
        expect(res.body.id).toBe(testHelper.getTestNodeID());
      });
  });
  it("Params go through and request with valid ID responds 200", async () => {
    const headerValidToken = { token: testHelper.getValidToken() };
    db.deleteNode.mockImplementationOnce(testHelper.mockDeleteNodeFail);
    await supertest(app)
      .delete(`/api/nodes/${testHelper.getTestNodeID()}`)
      .set(headerValidToken)
      .send()
      .expect(404);
  });
});

describe("9: GET /api/typeCollections", () => {
  it("Templates do not need access token, params go through, responds 200", async () => {
    db.getTypeCollections.mockImplementationOnce(
      testHelper.mockGetTypeCollections
    );

    const numItems = 10;
    const query = { name: "This is an example name query" };
    await supertest(app)
      .get("/api/typeCollections")
      .query({ max: numItems })
      .send(query)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(numItems);
        expect(res.body[0].query).toStrictEqual(query);
      });
  });
  it("Templates access error in db responds 500", async () => {
    db.getTypeCollections.mockImplementationOnce(
      testHelper.mockGetTypeCollectionsFail
    );

    const numItems = 10;
    const query = { name: "This is an example name query" };
    await supertest(app)
      .get("/api/typeCollections")
      .query({ max: numItems })
      .send(query)
      .expect(500);
  });
});

describe("10: GET /api/typeCollections/:id", () => {
  it("Template with ID can be accessed, responds 200", async () => {
    db.getTypeCollection.mockImplementationOnce(
      testHelper.mockGetTypeCollection
    );
    await supertest(app)
      .get(`/api/typeCollections/${testHelper.getTestNodeID()}`)
      .send({})
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(testHelper.getTestNodeID());
      });
  });
  it("Template with invalid ID responds 404", async () => {
    db.getTypeCollection.mockImplementationOnce(
      testHelper.mockGetTypeCollectionFail
    );
    await supertest(app)
      .get(`/api/typeCollections/${testHelper.getTestNodeID()}`)
      .send({})
      .expect(404)
  });
});
