const mongoose = require("mongoose");

const usercommentSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  comment: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  },
});

const CommentSchema = new mongoose.Schema({
  locationPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [usercommentSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
