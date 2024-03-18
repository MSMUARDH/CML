const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  //!  organizationID (unique identifier)
  organizationName: {
    type: String,
    required: true,
  },
  organizationDescription: {
    type: String,
    required: true,
  },

  notifications: {
    type: Boolean,
    required: true,
  },
  IsDeleted: {
    type: Boolean,
    default: false,
  },
  //! users (this could be a derived or explicit array of references to User, but often better to store the reference to the organization
  //! in the User collection and derive this array when needed)
});

const OrganizationModel = mongoose.model("Organization", OrganizationSchema);

module.exports = OrganizationModel;

// organizationID (unique identifier)
// orgName
// orgDescription
// users (this could be a derived or explicit array of references to User, but often better to store the reference to the organization in the User collection and derive this array when needed)
// ... (other organization attributes)
