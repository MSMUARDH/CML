const mongoose = require("mongoose");

// !theme
const themeSchema = new mongoose.Schema({
  textColor: {
    type: String,
    default: "green",
  },
  buttonColor: {
    type: String,
    default:"green"
  },
  bottomNavBgColor: {
    type: String,
    default:"green"
  },
  // !check for the image upload S3
  backgroundImage: {
    type: String,
    default:"image1"
  },
});

// !Preference
const preferenceSchema = new mongoose.Schema({
  numberOfItemsView: {
    type: Number,
    default: 10,
  },
  commentEnabling: {
    type: Boolean,
    default:true,
  },
  numberOfPhotos: {
    type: Number,
    default: 1,
    max: 8,
  },
});

// !Notifications
const notificationSchema = new mongoose.Schema({
  email: {
    type: Boolean,
    default: true,
  },
  notification: {
    type: Boolean,
    default: true,
  },
  sms: {
    type: Boolean,
    default: false,
  },
});

const SettingSchema = new mongoose.Schema({
  //! settingsID (unique identifier)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  themes: {
    type: themeSchema,
    default: () => ({}),
  },

  preferences: {
    type: preferenceSchema,
    default: () => ({}),
  },

  notifications: {
    type: notificationSchema,
    default: () => ({}),
  },
  IsDeleted: {
    type: Boolean,
    default: false,
  },

  //! (other settings attributes)
});

const SettingModel = mongoose.model("Setting", SettingSchema);

module.exports = SettingModel;
