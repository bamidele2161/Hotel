const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, text, payload, template) => {
  //email = receiver's email address
  //subject = subject of the email
  //payload = payload of the email(the template variables)
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

    // const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    // const compiledTemplate = handlebars.compile(source); //compiling the email template

    const mailOptions = () => {
      return {
        from: "akinyemi@sidebrief.com",
        to: email,
        subject: subject,
        // html: compiledTemplate(payload),
        text: text,
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
