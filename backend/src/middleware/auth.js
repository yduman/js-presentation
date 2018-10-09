const { User } = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth");
    const user = await User.findByToken(token);

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send();
  }
};

module.exports = { auth };
