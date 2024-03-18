const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Organization = require("../Models/OrganizationModel");
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

// !create organization
const addOrganization = async (req, res) => {
  try {
    const { orgName, orgDescription, notification } = req.body;

    const organizationDetails = {
      organizationName: orgName,
      organizationDescription: orgDescription,
      notifications: notification, //? Boolean value
    };

    // !New Added

    Organization.create(organizationDetails)
      .then((details) => {
        return res
          .status(201)
          .json({ message: "Organization created successfully", details });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  } catch (err) {
    return res.status(500).json("err", err.message);
  }
};

// !update organization
const updateOrganization = async (req, res) => {
  const { orgName, orgDescription, notification } = req.body;

  const id = req.params.id;

  const organization = await Organization.findOne({ _id: id });

  //check user exists or not
  if (!organization) {
    return res.status(404).json({ message: "no organization with this id" });
  }

  const organizationData = {
    organizationName: orgName,
    organizationDescription: orgDescription,
    notifications: notification, //? Boolean value
  };

  await Organization.findByIdAndUpdate({ _id: id }, organizationData)
    .then((result) => {
      if (result) {
        return res
          .status(200)
          .send({ message: "organization updated successfully", data: result });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


//!delete the exists user
const deleteOrganization = async (req, res) => {
  const id = req.params.id;

  const organization = await Organization.findOne({ _id: id });

  //check user exists or not
  if (!organization) {
    return res.status(404).json({ message: "no organization with this id" });
  }

  await Organization.updateOne({ _id: id }, { IsDeleted: true })
    .then((result) => {

      if (result) {

        res.status(200).send("organization deleted successfully");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


//!delete the exists user
const getAllOrganization = async (req, res) => {


  const organization = await Organization.find({});

  //check user exists or not
  if (!organization) {
    return res.status(404).json({ message: "no organization found" });
  }

  await Organization.find({ })
    .then((result) => {

      if (result) {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};



module.exports = {
  addOrganization,
  updateOrganization,
  deleteOrganization,
  getAllOrganization
};
