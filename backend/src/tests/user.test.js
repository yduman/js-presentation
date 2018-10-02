const request = require("supertest");
const { expect } = require("chai");
const { ObjectID } = require("mongodb");

const app = require("../server");
const { User } = require("../models/user");
const { user1, user2, populateUsers } = require("./seed");

beforeEach(populateUsers);

describe("User Tests", () => {
  describe("GET /api/user/me", () => {
    it("should return user if authenticated", done => {
      request(app)
        .get("/api/user/me")
        .set("x-auth", user1.tokens[0].token)
        .expect(200)
        .expect(res => {
          const body = res.body;

          expect(body._id).to.equal(user1._id.toHexString());
          expect(body.email).to.equal(user1.email);
          expect(body.username).to.equal(user1.username);
        })
        .end(done);
    });

    it("should return 401 if not authenticated", done => {
      request(app)
        .get("api/user/me")
        .expect(401)
        .expect(res => {
          expect(res.body).to.be.empty;
        })
        .end(done);
    });
  });

  describe("GET /api/user/:username", () => {
    it("should return user by given username", done => {
      request(app)
        .get(`/api/user/${user1.username}`)
        .set("x-auth", user2.tokens[0].token)
        .expect(200)
        .expect(res => {
          const body = res.body;

          expect(body._id).to.equal(user1._id.toHexString());
          expect(body.email).to.equal(user1.email);
          expect(body.username).to.equal(user1.username);
        })
        .end(done);
    });

    it("should return 400 if user was not found", done => {
      request(app)
        .get("/api/user/someusername")
        .set("x-auth", user2.tokens[0].token)
        .expect(400)
        .end(done);
    });
  });

  describe("POST /api/user/", () => {
    it("should create user", done => {
      const email = "max@mustermann.com";
      const password = "maxmustermann123";
      const username = "MaxMustermann";

      request(app)
        .post("/api/user")
        .send({ email, password, username })
        .expect(200)
        .expect(res => {
          expect(res.headers["x-auth"]).to.exist;
          expect(res.body._id).to.exist;
          expect(res.body.email).to.be.email;
        })
        .end(error => {
          if (error) return done(error);

          User.findOne({ email })
            .then(user => {
              expect(user).to.exist;
              expect(user.password).to.not.be.password;
              expect(user.username).to.be.username;
              expect(user.email).to.be.email;
              done();
            })
            .catch(error => done(error));
        });
    });
  });

  describe("DELETE /api/user/logout", () => {
    it("should remove token on logout", done => {
      request(app)
        .delete("/api/user/logout")
        .set("x-auth", user1.tokens[0].token)
        .expect(200)
        .end(error => {
          if (error) return done(error);

          User.findById(user1._id)
            .then(user => {
              expect(user.tokens.length).to.equal(0);
              done();
            })
            .catch(error => done(error));
        });
    });
  });
});
