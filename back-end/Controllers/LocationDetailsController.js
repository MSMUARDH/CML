const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const LocationModel = require("../Models/LocationModel");


const crypto = require("crypto");

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

// !create posts
const createPosts = async (req, res) => {
  // Assuming req.files is an array of file buffers

  try {
    const userId = req.headers.userId;

    // Assuming req.files is an array of file buffers
    const files = req.files;

    // Array to store URLs
    const uploadedUrls = [];

    // // Specify the common resize options
    const resizeOptions = {
      height: 1920,
      width: 1080,
      fit: "contain",
    };

    // Process each file asynchronously
    await Promise.all(
      files.map(async (file, index) => {
        try {
          const buffer = await sharp(file.buffer)
            .resize(resizeOptions)
            .toBuffer();

          // Your previous code for uploading to S3
          const params = {
            Bucket: bucketName,
            Key: file.originalname,
            Body: buffer,
            ContentType: file.mimetype,
          };

          const commandPut = new PutObjectCommand(params);
          await s3.send(commandPut);

          // Get the URL for the uploaded file
          const getObjectParams = {
            Bucket: bucketName,
            Key: file.originalname,
          };

          const commandGet = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, commandGet);

          // Save the URL to the array
          uploadedUrls.push({ url: url });

          return url; // Or return any other result you need
        } catch (error) {
          console.error(`Error processing file ${index}:`, error);
          throw error;
        }
      })
    );

    console.log(uploadedUrls);

    // // Create a location with an image
    const location = new LocationModel({
      user: userId,
      imagesDetails: {
        // imageId:"",
        images: uploadedUrls,
        imageDescription: req.body.imageDescription,
      },
      name: req.body.name,
      description: req.body.description,
    });

    // Save the location to the database
    location
      .save()
      .then((savedLocation) => {
        return res.status(200).json({
          message: "Location saved successfully",
          LocationDetails: savedLocation,
        });
      })
      .catch((error) => {
        console.error("Error saving location:", error.message);
      });
  } catch (error) {
    console.log(error);
  }
};

// //!delete
const deleteLocationPost = async (req, res) => {
  try {
    const postid = req.params.postid;

    const locationPost = await LocationModel.findOne({
      _id: postid,
      IsDeleted: false,
    });

    if (!locationPost) {
      return res.status(404).json({ message: "no any post to delete" });
    }

    await LocationModel.updateOne({ _id: postid }, { IsDeleted: true })
      .then((result) => {
        if (result) {
          res.status(200).send({ message: "post deleted successfully" });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  } catch (err) {
    console.log(err.message);
  }
};


const getLocationDetailsByUserId = async (req, res) => {
  const userid = req.headers.userId;

  try {
    const locationDetails = await LocationModel.find({ user: userid }).sort({
      createdAt: "desc",
    });

    //check user setings or not
    if (!locationDetails) {
      return res.status(404).json({ message: "no location details" });
    }

    return res.status(200).json({
      message: "Location details provided success successfully",
      locationDetails,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


const getAllLocationDetails = async (req, res) => {
  // const userid = req.headers.userId;

  try {
    const locationDetails = await LocationModel.find({}).sort({
      createdAt: "desc",
    });

    //check user setings or not
    if (!locationDetails) {
      return res.status(404).json({ message: "no location details" });
    }

    return res.status(200).json({
      message: "Location details provided success successfully",
      locationDetails,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// // !update settings
// const updateSettings = async (req, res) => {
//   const { themes, preferences, notifications } = req.body;

//   try {
//     // console.log(themes, preferences, notifications);

//     const userid = req.params.userid;

//     const setting = await Setting.findOne({ user: userid, IsDeleted: false });

//     //check setting exists or not
//     if (!setting) {
//       return res.status(404).json({ message: "no setting with this user " });
//     }

//     const updateSetting = await Setting.updateOne(
//       { user: setting.user },
//       {
//         themes: {
//           textColor: themes.textColor,
//           buttonColor: themes.buttonColor,
//           bottomNavBgColor: themes.bottomNavBgColor,
//           backgroundImage: themes.backgroundImage,
//         },
//         preferences: {
//           numberOfItemsView: preferences.numberOfItemsView,
//           commentEnabling: preferences.commentEnabling,
//           numberOfPhotos: preferences.numberOfPhotos,
//         },
//         notifications: {
//           email: notifications.email,
//           notification: notifications.notification,
//           sms: notifications.sms,
//         },
//       }
//     );

//     if (updateSetting.acknowledged) {
//       const updatedSettings = await Setting.findOne({
//         user: userid,
//         IsDeleted: false,
//       });

//       return res
//         .status(200)
//         .json({ message: "SettingsS updated successfully", updatedSettings });
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// // !get sigle user settings
// const getSingleUserSettings = async (req, res) => {
//   const userid = req.params.userid;
//   try {
//     const setting = await Setting.findOne({ _id: id });

//     //check user exists or not
//     if (!setting) {
//       return res.status(404).json({ message: "no setting with this id" });
//     }

//     Setting.create(settingDetails)
//       .then((details) => {
//         return res
//           .status(200)
//           .json({ message: "SettingsS created successfully", details });
//       })
//       .catch((err) => {
//         if (err) {
//           console.log(err);
//         }
//       });
//   } catch (err) {
//     return res.status(500).json("err", err.message);
//   }
// };

module.exports = {
  createPosts,
  deleteLocationPost,
  getLocationDetailsByUserId,
  getAllLocationDetails,
};
