const User = require('./model');
// below codes are localy
// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//   },
//   {
//     id: 2,
//     name: "Jane ",
//   },
// ];

// const getUsers = (cb) => {

//   cb(users);
// };

// const getUserById = (id, cb) => {
//   const user = users.find((user) => user.id == id);
//   cb(user);
// };
// exports.getUsers = getUsers;
// exports.getUserById = getUserById;

//with mongodb
const getUser = (req, res, next) => {
  User.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const addUser = (req, res, next) => {
  const user = new User({
    id: req.body.id,
    name: req.body.name
  });
  user
    .save()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const updateUser = (req, res, next) => {
  const { id, name } = req.body;
  // that same for this(object distructuring)
  // const id = req.body.id;
  // const name =req.body.name;
  User.updateOne({ id: id }, { $set: { name: name } })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const deleteUser = (req, res, next) => {
  const id = req.body.id; 
  User.deleteOne({ id: id })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

exports.getUser = getUser;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;