const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
  images: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  imageDescription: {
    type: String,
    required: true,
  },
});

const LocationSchema = new mongoose.Schema({
  //! locationID (unique identifier)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  imagesDetails: imageSchema,

  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    required: true,
  },
  IsDeleted: {
    type: Boolean,
    default: false,
  },
});

const LocationModel = mongoose.model("Location", LocationSchema);

module.exports = LocationModel;
