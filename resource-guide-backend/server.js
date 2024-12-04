const express = require("express");
/*const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");*/

/*dotenv.config();
connectDB();*/

const app = express();

app.use(express.json()); // For parsing JSON requests
/*app.use(bodyParser.urlencoded({ extended: false }));*/
app.use(express.static("../front-end"));

app.use("/api/bans", require("./api/bans"));
app.use("/api/comments", require("./api/comments"));
app.use("/api/courses", require("./api/courses"));
app.use("/api/posts", require("./api/posts"));
app.use("/api/users", require("./api/users"));

app.listen(3000);
