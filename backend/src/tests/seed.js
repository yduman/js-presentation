const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const userId1 = new ObjectID();
const userId2 = new ObjectID();

const user1 = {
  _id: userId1,
  email: "foo@bar.com",
  password: "somepassword",
  username: "FooMaster",
  tokens: [
    {
      access: "auth",
      token: jwt.sign({ _id: userId1, access: "auth" }, "SomeSalt").toString()
    }
  ]
};

const user2 = {
  _id: userId2,
  email: "foo2@bar2.com",
  password: "somepassword2",
  username: "FooMaster2",
  tokens: [
    {
      access: "auth",
      token: jwt.sign({ _id: userId2, access: "auth" }, "SomeSalt").toString()
    }
  ]
};

const populateUsers = done => {
  User.remove({})
    .then(() => {
      const u1 = new User(user1).save();
      const u2 = new User(user2).save();

      return Promise.all([u1, u2]);
    })
    .then(() => done());
};

module.exports = { user1, user2, populateUsers };
