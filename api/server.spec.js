const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  describe("GET /", () => {
    it("returns 200 OK", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    test("should return JSON", async () => {
      const response = await request(server).get("/");
      expect(response.type).toMatch(/json/i);
    });
  });
});
