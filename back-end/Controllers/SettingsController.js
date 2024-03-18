const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Setting = require("../Models/SettingsModel");
const crypto = require("crypto");


// !image testing
const Image = require("../Models/ImageModel");

//!

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// ! for resizing images
const sharp = require("sharp");

dotenv.config();

//load envirement variable
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const USER_EMAIL = process.env.USER_EMAIL;
const SECRET_KEY = process.env.SECRET_KEY;

const bucketName = process.env.AWS_BUCKET;
const bucketRegion = process.env.AWS_DEFAULT_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// !packeges for the image uploading part
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListBucketsCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// !create settings
const addSettings = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({
      height: 1920,
      width: 1080,
      fit: "contain",
    })
    .toBuffer();

  // const randomImageName = () => crypto.randomBytes(32).toString("hex");
  // console.log("randomImageName", randomImageName());

  const params = {
    Bucket: bucketName,
    Key: req.file.originalname,
    Body: buffer,
    ContentType: req.file.mimetype,
  };

  const commandPut = new PutObjectCommand(params);
  await s3.send(commandPut);

  const getObjectParams = {
    Bucket: bucketName,
    Key: req.file.originalname,
  };

  const commandGet = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, commandGet);

  console.log(url);

  // const imageDetails = await Setting.find({});

  // console.log(imageDetails[0].themes.backgroundImage);

  // !save it to the db

  // res.send(imageDetail);

  // console.log("imageDetails", imageDetail);

  // try {
  //   const { theme, preferences, notifications } = req.body;

  //   const settingDetails = {
  //     theme: theme,
  //     preferences: preferences,
  //     notifications: notifications, //? Boolean value
  //   };

  //   await Setting.create(settingDetails)
  //     .then((details) => {
  //       return res
  //         .status(200)
  //         .json({ message: "SettingsS created successfully", details });
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //     });
  // } catch (err) {
  //   return res.status(500).json("err", err.message);
  // }
};

// !update settings
const updateSettings = async (req, res) => {
  const { themes, preferences, notifications } = req.body;

  // console.log(themes, preferences, notifications);

  try {
    // console.log(themes, preferences, notifications);

    const userid = req.headers.userId;

    const setting = await Setting.findOne({ user: userid, IsDeleted: false });

    //check setting exists or not
    if (!setting) {
      return res.status(404).json({ message: "no setting with this user " });
    }

    const updateSetting = await Setting.updateOne(
      { user: setting.user },
      {
        // themes: {
        //   textColor: themes.textColor,
        //   buttonColor: themes.buttonColor,
        //   bottomNavBgColor: themes.bottomNavBgColor,
        //   // backgroundImage: themes.backgroundImage,
        // },
        preferences: {
          numberOfItemsView: preferences.numberOfItemsView,
          commentEnabling: preferences.commentEnabling,
          numberOfPhotos: preferences.numberOfPhotos,
        },
        notifications: {
          email: notifications.email,
          notification: notifications.notification,
          sms: notifications.sms,
        },
      }
    );

    if (updateSetting.acknowledged) {
      const updatedSettings = await Setting.findOne({
        user: userid,
        IsDeleted: false,
      });

      return res
        .status(200)
        .json({ message: "SettingsS updated successfully", updatedSettings });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// !update themes

const updateThemes = async (req, res) => {
  const { themes, preferences, notifications } = req.body;

  // console.log(themes, preferences, notifications);

  try {
    // console.log(themes, preferences, notifications);

    const userid = req.headers.userId;

    const setting = await Setting.findOne({ user: userid, IsDeleted: false });

    //check setting exists or not
    if (!setting) {
      return res.status(404).json({ message: "no setting with this user " });
    }

    const updateSetting = await Setting.updateOne(
      { user: setting.user },
      {
        themes: {
          textColor: themes.textColor,
          buttonColor: themes.buttonColor,
          bottomNavBgColor: themes.bottomNavBgColor,
          // backgroundImage: themes.backgroundImage,
        },
      }
    );

    if (updateSetting.acknowledged) {
      const updatedSettings = await Setting.findOne({
        user: userid,
        IsDeleted: false,
      });

      return res
        .status(200)
        .json({ message: "SettingsS updated successfully", updatedSettings });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// !Update Background Image
const updateBackgrounImage = async (req, res) => {
  const userid = req.headers.userId;

  // console.log("i got it");
  try {
    const isSettingExist = await Setting.findOne({
      user: userid,
      IsDeleted: false,
    });

    //check user exists or not
    if (!isSettingExist) {
      return res.status(404).json({ message: "no setting with this user " });
    }

    const buffer = await sharp(req.files[0].buffer)
      .resize({
        height: 1920,
        width: 1080,
        fit: "contain",
      })
      .toBuffer();

    // const randomImageName = () => crypto.randomBytes(32).toString("hex");
    // console.log("randomImageName", randomImageName());

    const params = {
      Bucket: bucketName,
      Key: req.files[0].originalname,
      Body: buffer,
      ContentType: req.files[0].mimetype,
    };

    const commandPut = new PutObjectCommand(params);
    await s3.send(commandPut);

    const getObjectParams = {
      Bucket: bucketName,
      Key: req.files[0].originalname,
    };

    const commandGet = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, commandGet);

    console.log(url);

    // Update the backgroundImage for a specific user
    Setting.findOneAndUpdate(
      { user: isSettingExist.user }, // Search for the user by their ID
      { $set: { "themes.backgroundImage": url } }, // Update the backgroundImage field
      { new: true } // To return the updated document
    )
      .then((updatedSetting) => {
        if (updatedSetting) {
          return res.status(200).json({ updatedSetting: updatedSetting });
          // console.log("updatedSetting", updatedSetting);
        } else {
          console.log("User not found or update failed.");
        }
      })
      .catch((error) => {
        console.error("Error updating background image:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

// //!delete
const deleteSettings = async (req, res) => {
  const id = req.params.id;

  const organization = await Setting.findOne({ _id: id });

  //check user exists or not
  if (!organization) {
    return res.status(404).json({ message: "no any settings with this id" });
  }

  await Setting.updateOne({ _id: id }, { IsDeleted: true })
    .then((result) => {
      if (result) {
        res.status(200).send("setting deleted successfully");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// !get sigle user settings
const getSingleUserSettings = async (req, res) => {
  const userid = req.headers.userId;
  try {
    const settings = await Setting.findOne({ user: userid });

    //check user setings or not
    if (!settings) {
      return res.status(404).json({ message: "no setting with this id" });
    }

    return res
      .status(200)
      .json({ message: "Settings provided success successfully", settings });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// !get sigle user theme
const getSingleUserThemes = async (req, res) => {
  const userid = req.headers.userId;
  try {
    const settings = await Setting.findOne({ user: userid });

    //check user setings or not
    if (!settings) {
      return res.status(404).json({ message: "no setting with this id" });
    }

    return res
      .status(200)
      .json({ message: "Settings provided success successfully", settings });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addSettings,
  updateSettings,
  deleteSettings,
  getSingleUserSettings,
  updateBackgrounImage,
  updateThemes,
};

// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // ! you need to set the image name as image to get it here(it's a middlware it should be in the route)
// upload.single("image");

//! AWS
// const AWS = require("aws-sdk");
// const fs = require("fs");

// const credentials = {
//   accessKey: "ACCESS_KEY",
//   secret: "SECRET_KEY",
//   bucketName: "S3_BUCKET_NAME",
// };

// const s3 = new AWS.S3({
//   accessKeyId: credentials.accessKey,
//   secretAccessKey: credentials.secret,
// });

// const uploadFile = (fileName) => {
//   const fileContent = fs.readFileSync(fileName);

//   const params = {
//     Bucket: credentials.bucketName,
//     key: fileName,
//     body: fileContent,
//   };

//   s3.upload(params, (err, data) => {
//     if (err) {
//       throw err;
//     }

//     console.log(`File Upload successfully. ${data.Location}`);
//   });
// };
