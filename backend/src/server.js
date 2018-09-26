require("./config/config");
require("./db/mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const app = express();
const server = http.createServer(app);

// body parsing middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({hello: "world"});
});

const port = process.env.PORT;
server.listen(port, () => console.log(`Listening on port ${port}`));

