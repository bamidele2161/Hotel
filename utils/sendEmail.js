const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const sendEmail = async (payload, email, subject, template) => {
  //email = receiver's email address
  //subject = subject of the email
  //payload = payload of the email(the template variables)
  //name = name of the receiver
  //template = the html template of the email

  try {
    //creaing transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.SENDER_EMAIL}`,
        pass: `${process.env.SENDER_PASSWORD}`,
      },
    });

    const requiredPath = path.join(__dirname, template);

    const data = await ejs.renderFile(requiredPath, payload);

    const mailOptions = () => {
      return {
        from: `${process.env.SENDER_EMAIL}`,
        to: email,
        subject: subject,
        html: data,
      };
    };

    //send email
    transporter.sendMail(mailOptions(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
          message: info.message || info.response,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
