const StaffDB = require("../../model/auth/staffModel");
const bcrypt = require("bcrypt");
let lodash = require("lodash");

exports.registerStaff = async (req, res) => {
  let staff = new StaffDB({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });
  let round = await bcrypt.genSalt(10);
  staff.password = await bcrypt.hash(staff.password, round);

  StaffDB.findOne({ email: req.body.email })
    .select("-password")
    .then((email) => {
      if (email) {
        res.status(404).send({ message: "Email already exists" });
      } else {
        staff
          .save(staff)
          .then((data) => {
            return res.status(200).send({
              data: data,
              message: "Staff Account created successfully",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occured while creating an account",
            });
          })
          .catch((err) => {
            res
              .status(500)
              .send({ message: err.message || "Something went wrong" });
          });
      }
    });
};

exports.staffSignIn = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
  if (req.body.password < 4) {
    res.status(400).send({ message: "Password too short" });
  }
  let checkEmail = await StaffDB.findOne({ email: req.body.email });

  console.log(checkEmail);
  if (!checkEmail)
    return res.status(401).send({ message: "Invalid email or password" });

  let checkPassword = await bcrypt.compare(
    req.body.password,
    checkEmail.password
  );

  if (!checkPassword)
    return res.status(400).send({ message: "Invalid Email or Password" });

  const token = checkEmail.generateStaffAuthToken();
  res.status(200).send({
    token: token,
    data: lodash.pick(checkEmail, [
      "_id",
      "firstName",
      "lastName",
      "email",
      "phone",
    ]),
    message: "Login successfully",
  });
};
