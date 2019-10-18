const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("auth-router.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  //register end point
  describe("POST /api/auth/register", () => {
    it("returns status 500", () => {
      return request(server)
        .post("/api/auth/register")
        .then(res => expect(res.status).toBe(500));
    });
    it("returns status 201", () => {
      const user = { username: "testUser", password: "passwordTest" };
      return request(server)
        .post("/api/auth/register")
        .send(user)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });
});
