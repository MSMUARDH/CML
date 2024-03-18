const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  //! userID (unique identifier)
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  IsAdmin: {
    default: false,
    type: Boolean,
  },

  IsDeleted: {
    type: Boolean,
    default: false,
  },

  //! organizationID (reference to Organization)
  //! settingsID (reference to Settings)
  OrganizationID: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  SettingsID: { type: mongoose.Schema.Types.ObjectId, ref: "Setting" },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
