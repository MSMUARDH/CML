const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  caption: String,
  imageName: String,
  imageUrl: String,
});

const ImageModel = mongoose.model("Image", ImageSchema);

module.exports = ImageModel;
