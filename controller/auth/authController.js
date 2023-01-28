const UserDB = require("../../model/auth/userModel");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  if (!req.body) return res.status(400).send({ message: "No Content" });

  let user = new UserDB({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });

  let round = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, round);

  UserDB.findOne({ email: req.body.email })
    .then((email) => {
      if (email) {
        res.status(404).send({ message: "Email already exists" });
      } else {
        user
          .save(user)
          .then((data) => {
            return res
              .status(200)
              .send({ data: data, message: "Account created successfully" });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occured while creating an account",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Something went wrong" });
    });
};

exports.signIn = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
  if (req.body.password.length < 4) {
    res.status(400).send({ message: "Password too short" });
  }
};

exports.getUserProfile = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  UserDB.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Something went wrong" });
    });
};

exports.resetPassword = async (req, res) => {};
