const express = require("express");
const helmet = require("helmet");
let config = require("./src/config/main");
let cors = require("cors");
let log4js = require("log4js");

log4js.configure({
  appenders: { user: { type: "file", filename: "./src/logs/system.log" } },
  categories: { default: { appenders: ["user"], level: "debug" } }
});
global.logger = log4js.getLogger("user");
const app = express();
app.use(helmet());
app.use(cors());

let UserRoutes = require("./src/routes/user");
let userRoutes = new UserRoutes(express.Router());
app.use("/api", userRoutes.build());

const port = config.port;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
