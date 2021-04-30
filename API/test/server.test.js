const supertest = require("supertest");
const app = require("../server")

describe("GET /api/testobject - get a test object by id", () => {
  it("should create a new post", async () => {
    await supertest(app)
      .get("/api/testobject")
      // .query({ id: 1 })
      .send({
        content: {
          message: "post!",
        },
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("title");
        // expect(res.body.id).toEqual(1);
        // expect(res.body.content.message).toEqual("post!");
      });
  });
});
