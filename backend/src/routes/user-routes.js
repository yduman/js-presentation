const router = require("express").Router();
const _ = require("lodash");
const { ObjectID } = require("mongodb");
const { User } = require("../models/user");
const { auth } = require("../middleware/auth");

// GET /api/user/me
router.get("/me", auth, (req, res) => res.send(req.user));

// GET /api/user/:username
router.get("/:username", auth, async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findByUsername(username);

    if (!user) res.status(404).send();

    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
})

// POST /api/user/
router.post("/", async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password", "username"]);
    const user = new User(body);

    await user.save();
    const token = await user.createAuthToken();

    res.header("x-auth", token).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

// POST /api/user/login
router.post("/login", async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.createAuthToken();

    res.header("x-auth", token).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

// DELETE /api/user/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) return res.status(400).send();

    const user = await User.findByIdAndRemove(id);
    if (!user) return res.status(404).send();

    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

// DELETE /api/user/logout
router.delete("/logout", auth, async (req, res) => {
  try {
    await req.user.removeAuthToken(req.token);
    res.status(200).send();
  } catch (error) {
    console.log("ERROR :: ", error);
    res.status(400).send();
  }
});

module.exports = router;
