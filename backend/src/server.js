require("./config/config");
require("./db/mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const app = express();
const server = http.createServer(app);

const userRoutes = require("./routes/user-routes");

app.use(bodyParser.json());
app.use("/api/user", userRoutes);

const port = process.env.PORT;
server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = { app };

