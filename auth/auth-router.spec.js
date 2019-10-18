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

  //login end point
  describe("POST /api/auth/login", () => {
    it("returns status 500", () => {
      return request(server)
        .post("/api/auth/login")
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
    it("returns JSON", () => {
      const user = { username: "testUser", password: "passwordTest" };
      return request(server)
        .post("/api/auth/login")
        .send(user)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
  //get end point
  describe("server.js", () => {
    describe("GET /", () => {
      it("returns 200 OK", () => {
        return request(server)
          .get("/api/auth/users")
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it("should return JSON", async () => {
        const response = await request(server).get("/api/auth/users");
        expect(response.type).toMatch(/json/i);
      });
    });
  });
});
