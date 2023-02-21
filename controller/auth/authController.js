const UserDB = require("../../model/auth/userModel");
const bcrypt = require("bcrypt");
let lodash = require("lodash");
const sendEmail = require("../../utils/sendEmail");
const otpGenerator = require("otp-generator");
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
    .select("-password")
    .then((email) => {
      if (email) {
        res.status(404).send({ message: "Email already exists" });
      } else {
        user
          .save(user)
          .then((data) => {
            sendEmail(
              { name: user.firstName },
              user.email,
              "Welcome to Bammy Apartment",
              "../view/registration.ejs"
            );

            return res.status(200).send({
              data: lodash.pick(data, [
                "_id",
                "firstName",
                "lastName",
                "email",
                "phone",
              ]),
              message: "Account created successfully",
            });
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
  if (req.body.password < 4) {
    res.status(400).send({ message: "Password too short" });
  }
  let checkEmail = await UserDB.findOne({ email: req.body.email });

  console.log(checkEmail);
  if (!checkEmail)
    return res.status(401).send({ message: "Invalid email or password" });

  let checkPassword = await bcrypt.compare(
    req.body.password,
    checkEmail.password
  );

  if (!checkPassword)
    return res.status(400).send({ message: "Invalid Email or Password" });

  const token = checkEmail.generateAuthToken();
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

//update user
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      UserDB.updateOne({ _id: id }, req.body, (err, data) => {
        if (err)
          res.status(404).send({ message: err.message || "Error occured" });
        return res
          .status(200)
          .send({ message: "User record updated successfully" });
      });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (err) {
    return res.status(401).send({ error: err.message || "error occured" });
  }
};

//password reset with email
exports.generateOtp = async (req, res) => {
  try {
    const email = req.body.email; //get the email from request body
    if (!email)
      return res.status(401).send({ error: "Content cannot be empty" }); //return error if the body is empty

    let checkEmail = await UserDB.findOne({ email: email }); // check the data with the email, if the email exists
    console.log("user", checkEmail);

    if (!checkEmail) return res.status(401).send({ error: "User not found" }); //return error if it doesn't exist
    if (checkEmail) {
      // generate OTP if email exists
      req.app.locals.OTP = await otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      sendEmail(
        //send email to client
        { name: checkEmail.firstName, otp: req.app.locals.OTP },
        email,
        "OTP Code",
        "../view/otp.ejs"
      );

      res.status(200).send({ message: "OTP code sent successfully." });
    }
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

//validate reset token
exports.verifyOTP = async (req, res) => {
  try {
    // get the otp code from the rerquest body
    let code = req.body.code;

    // check if the code is the same as the local code
    if (parseInt(code) === parseInt(req.app.locals.OTP)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(200).send({ message: "verify successfull." });
    }
    return res.status(400).send({ error: "Invalid OTP code." });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

// update the password
exports.resetPassword = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send({ errors: "content cannot be empty" });

    const { email } = req.body;
    let checkEmail = await UserDB.findOne({ email: email });

    if (!checkEmail)
      return res.status(400).send({ errorss: "User not found." });

    console.log(checkEmail);

    if (checkEmail) {
      let password = req.body.password;

      let round = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, round);

      console.log("zama", hashPassword);

      if (req.app.locals.resetSession === true) {
        await UserDB.updateOne(
          { email: email },
          { password: hashPassword },
          (err, data) => {
            if (err) {
              return res
                .status(400)
                .send({ errorsss: "Error updating password." });
            } else {
              req.app.locals.resetSession = false;
              return res
                .status(200)
                .send({ message: "Password changed successfully!." });
            }
          }
        );
      } else {
        return res
          .status(401)
          .send({ errorsssss: "Kindly generate OTP code." });
      }
    }
  } catch (err) {
    return res.status(500).send({ errorsssssssss: err });
  }
};
