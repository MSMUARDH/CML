const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const Setting = require("../Models/SettingsModel");
const crypto = require("crypto");

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");


dotenv.config();

//load envirement variable
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const USER_EMAIL = process.env.USER_EMAIL;
const SECRET_KEY = process.env.SECRET_KEY;
// const FRONTEND_URL = process.env.FRONTEND_URL;

// nodemailer congfigure
const transpoter = nodemailer.createTransport({
  service: "hotmail",
  //host: 'smtp.your-email-provider.com', // SMTP server hostname
  port: 587, // SMTP server port (usually 587 for TLS)
  secure: false, // Set to true for TLS, false for non-secure
  auth: {
    user: "msmuaz98@outlook.com",
    pass: "199820200646Muaz",
  },
});

//email sending function
async function emailHandle(subject, body, userEmail) {
  const mailoption = {
    from: "msmuaz98@outlook.com", //company email
    to: userEmail,
    subject: subject,
    html: body,
  };

  transpoter.sendMail(mailoption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({ message: "email sending success" });
    }
  });
}

// * Register user
const registerUser = async (req, res) => {
  // console.log(req.body);
  try {
    const { name, email, password, isadmin } = req.body;
    console.log(name, email, password, isadmin);

    const hashedPassword = await bcrypt.hash(password, 10);

    const userDetails = {
      Name: name,
      Email: email,
      Password: hashedPassword,
      // IsAdmin: isadmin,
    };

    const userExist = await User.findOne({ Email: email });
    if (userExist) return res.status(402).send("User already exists..");

    // !New Added

    const FRONTEND_URL = "http://localhost:5000/api/users";

    User.create(userDetails)
      .then(async (user) => {
        //res.status(201).json({ message: "User created successfully", user });

        //verify link generate
        const secret = JWT_SECRET;
        const payload = {
          email: user.Email,
          id: user._id,
        };

        const token = jwt.sign(payload, secret, { expiresIn: "15m" });
        const encodedToken = token.replace(/\./g, "%252E");

        const link = `${FRONTEND_URL}/account-verify/${user._id}/${encodedToken}`;

        //email details
        const subject = "Clean my land email verfication";
        const body = `You can <a href="${link}">Click here to verify your account.</a>
      <span style="color: red;">Please don't click it if you did not create an account with Clean my land.</span>`;

        emailHandle(subject, body, user.Email); // send a link to email

        const createdSettings = await Setting.create({ user: user._id });

        return res.status(200).json({
          message: "Email verfication link has been sent to your email",
          link: `${link}`,
          Settings: createdSettings,
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });

    ////////// !
  } catch (err) {
    return res.status(500).json(err.message);
  }
};



// ! verifyEmail old code
// const verifyEmail = async (req, res) => {
//   const token = req.params.token;

//   console.log(token);
//   try {
//     if (!token) return res.status(401).json("EmailToken not found...");

//     const user = await User.findOne({ emailToken: token });

//     if (user) {
//       user.emailToken = null;
//       user.isVerified = true;

//       await user.save();

//       return res.status(200).json("verification success...");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error.message);
//   }
// };

//! account verify API
const accountVerify = async (req, res) => {
  const { id, token } = req.params;

  // !console
  console.log("token id", id, token);

  const decodedToken = decodeURIComponent(token);

  // !console
  console.log("decodedToken", decodedToken);

  const user = await User.findOne({ _id: id });

  // !console
  console.log("user", user);

  //check user exists or not
  if (!user) {
    return res.status(404).json({ message: "invalid user ID" });
  }

  try {
    //check JWT valid or not
    const secret = JWT_SECRET;
    const payload = jwt.verify(decodedToken, secret);

    // !console
    console.log("payload", payload);

    if (payload) {
      //verify the user
      await User.updateOne({ _id: payload.id }, { isVerified: true })
        .then((result) => {
          if (result) {
            res.status(200).send({
              message: "user verified successfully",
              username: user.Name,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    res.status(404).json({ message: "invalid Link" });
  }
};

//!--------------------//!user login/////////////////////
const login = async (req, res) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();

  const user = await User.findOne({ Email: email });

  //check user exists or not
  if (!user) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  //check user verified or not
  if (!user.isVerified) {
    return res.status(404).json({ message: "User not verified" });
  }

  //compare the password
  const isPasswordValid = await bcrypt.compare(password, user.Password);

  if (!isPasswordValid) {
    return res.status(404).json({ message: "Password is incorrect" });
  }

  // !check for the deleted user(soft delete)
  if (user.IsDeleted) {
    return res.status(404).json({ message: "user has been deleted already" });
  }

  //crate a json web token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  //!token store to the cookies
  // res.cookie("access_token", token, {
  //   httpOnly: false,
  //   secure: true,
  //   sameSite: "none",
  //   maxAge: 180 * 60 * 1000,
  // });

  return res.status(200).json({
    message: "Login success",
    token: token,
    id: user._id,
    email: user.Email,
    isAdmin: user.IsAdmin,
  });
};

//!password reset API
const passwordReset = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  const id = req.headers.userId;
  // console.log("id", id);

  // console.log(newPassword,confirmPassword);

  const user = await User.findOne({ _id: id });

  // //! //check user exists or not
  if (!user) {
    return res.status(404).json({ message: "invalid user ID" });
  }

  try {

    if (newPassword == confirmPassword) {
      //encrypt new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      console.log(hashedPassword);

      // //!update with new password
      await User.updateOne({ _id: id }, { $set: { Password: hashedPassword } })
        .then((result) => {
          if (result) {
            //email details
            const subject = "Clean My Land App Password Notification";
            const body = `<span style="color: red;">Your Password has been changed</span>`;

            emailHandle(subject, body, user.Email); // send a link to email
            res.status(200).json({
              message: "Password has been updated successfully",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.status(404).json({ message: "password missmatch" });
    }
  } catch (error) {
    res.status(404).json({ message: "invalid Link" });
  }
};

//!update users data
const updateUser = async (req, res) => {
  const { id } = req.params;
  // const { }

  console.log("updateUser", id);

  const user = await User.findOne({ _id: id });

  //check user exists or not
  if (!user) {
    return res.status(404).json({ message: "no user with this id" });
  }

  const userdata = req.body;
  console.log("userdata", req.body.Password);

  //compare the password
  const isPasswordValid = await bcrypt.compare(
    req.body.Password,
    user.Password
  );

  if (!isPasswordValid) {
    console.log("password incorrect");
    return res.status(404).json({ message: "Password is incorrect" });
  }

  await User.updateOne({ _id: id }, { Name: req.body.Name })
    .then((result) => {
      if (result) {
        res.status(200).send("user update successfully");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//!delete the exists user
const deleteUser = async (req, res) => {
  const id = req.headers.userId;

  const user = await User.findOne({ _id: id });

  //check user exists or not
  if (!user) {
    return res.status(404).json({ message: "no user with this id" });
  }

  await User.updateOne({ _id: id }, { IsDeleted: true })
    .then((result) => {
      if (result) {
        //email details
        const subject = "Clean My Land App Deleted Acoount Notification";
        const body = `<span style="color: red;">Your Account has been deleted</span>`;

        emailHandle(subject, body, user.Email); // send a link to email
        res.status(200).send("user delete successfully");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


const getUserById = async(req,res) => {
  const {userId } = req.headers;

  // console.log("getUserById",userId);

  const userDetails = await User.findById(userId);

  if (!userDetails) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({message:"user found success",userData:userDetails})

  
}

module.exports = {
  registerUser,
  accountVerify,
  login,
  passwordReset,
  updateUser,
  deleteUser,
  getUserById
};
