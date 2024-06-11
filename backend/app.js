const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controller");

app.use(cors()); // to access cross origin resouce policy
app.use(
  // data comes in different type here we should enocode that
  express.urlencoded({
    extended: true, // if false can get only string and arrys
  })
);
app.use(express.json());

//create REST api
app.get("/users", (req, res) => {
  controller.getUsers((users) => {
    res.send(users);
  });
});

app.get("/user", (req, res) => {
    const id = req.query.id;
    controller.getUserById(id,(users) => {
      res.send(users);
    });
  });
module.exports = app;
