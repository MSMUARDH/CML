const { createMailTransporter } = require("./createMailTransporter");

const baseUrl = "http://localhost:6000";

const sendVerificationMail = (user) => {
  const transporter = createMailTransporter();

  const url = `http://localhost:6000/api/users/verify-email/${user.emailToken}`;

  const mailOptions = {
    from: '"Black Ph4nthom 👻" <msmuaz98@outlook.com>',
    to: user.Email, // list of receivers
    subject: "Verify Your Email ✔", // Subject line
    html: `<p>Hello ${user.Name},Verify your email by clicking this link...</p>
   <a  href=${url}>${url}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("verification email sent");
    }
  });
};

module.exports = { sendVerificationMail };
