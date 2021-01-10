///////////////////////////
// Environmental Variables
///////////////////////////
require("./envfunc")();
const {
  PORT = 3000,
  SECRET = "secret",
  NODE_ENV = "development",
} = process.env;
console.log(PORT);

//MONGO CONNECTION
const mongoose = require("./DB/conn");

//CORS
const cors = require("cors");
const corsOptions = require("./configs/cors.js");

//AUTH
const jwt = require("jsonwebtoken");
const { auth } = require("./configs/auth.js");

//Bringing in Express
const express = require("express");
const app = express();

//OTHER IMPORTS
const morgan = require("morgan");

//Models/Routers
const {User, authRouter} = require("./models/users")
const {Beep, beepRouter} = require("./models/beep")

////////////
//MIDDLEWARE
////////////
NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());

//Make models available to all controllers
app.use((req, res, next) => {
  req.models = {
    User,
    Beep
  }
  next()
})

app.use(express.static("public"));
app.use(express.json());
app.use(morgan("tiny")); //logging

///////////////
//Routes and Routers
//////////////
app.get("/", (req, res) => {
  console.log(req.models)
  res.json({hello: "world"});
});

app.use("/users", authRouter)
app.use("/beeps", beepRouter)

//These routes are to generate a test JWT and test out your auth function from auth.js
app.get("/testauth", auth(SECRET), (req, res) => {
  res.json(req.payload);
});

app.get("/testjwt", (req, res) => {
  const token = jwt.sign({ hello: "world" }, SECRET);
  res.json({ token });
});

//LISTENER
app.listen(PORT, () => {
  console.log(`Your are listening on port ${PORT}`);
});
