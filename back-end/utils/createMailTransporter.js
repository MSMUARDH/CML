const nodemailer = require("nodemailer");

const createMailTransporter = () => {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "msmuaz98@outlook.com", // generated ethereal user
      pass: "199820200646Muaz", // generated ethereal password
    },
  });

  return transporter;
};

module.exports = { createMailTransporter };
