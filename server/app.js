const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie middleware
app.use(cookieParser());

//import all routes here
const user = require("../server/routers/userRoutes");
//routes
app.use("/api/v1", user);


module.exports = app;
