const LocationModel = require("../Models/LocationModel");
const CommentModel = require("../Models/commentModel");
const User = require("../Models/UserModel");

const addingComment = async (req, res) => {
  try {
    const { postid } = req.params;
    const userId = req.headers.userId;
    const { comment } = req.body;

    const userExist = await User.find({ _id: userId }).select("IsAdmin");
    // console.log("userExist", userExist[0].IsAdmin);

    const isPostExist = await LocationModel.findOne({
      _id: postid,
    });
    // console.log(isPostExist);
    if (!isPostExist) {
      return res.status(400).json({
        message: "No location detail found",
      });
    }
    const isAlreadyExistcomment = await CommentModel.findOne({
      locationPostId: postid,
      // user: userId,
    });

    // console.log(isAlreadyExistcomment);

    if (!isAlreadyExistcomment) {
      try {
        const createdComment = await CommentModel.create({
          locationPostId: postid,
          user: userId,
          comments: [
            {
              UserId: userId,
              comment: comment,
              isAdmin: userExist[0].IsAdmin,
            },
          ],
        });
        return res.status(200).json({
          message: "Initial comment added success",
          createdComment: createdComment,
        });
      } catch (error) {
        console.log(error);
      }
    }
    // console.log("isAlreadyExistcomment", isAlreadyExistcomment);

    // ???????????????????????????????????????
    const newCommentData = {
      UserId: userId,
      comment: comment,
      isAdmin: userExist[0].IsAdmin,
    };

    // Use Mongoose findOneAndUpdate to add the new comment to the comments array
    await CommentModel.findOneAndUpdate(
      { locationPostId: postid },
      { $push: { comments: newCommentData } },
      { new: true, useFindAndModify: false }
    )
      .then((result) => {
        return res.status(200).json({
          message: "new comment added",
          createdComment: result.comments[result.comments.length - 1],
        });
      })
      .catch((error) => {
        return res.status(404).json({
          message: error.message,
        });
      });
    //????????????????????????????????????????
  } catch (error) {
    console.log(error);
  }
};

const getAllCommentsByLocationDetails = async (req, res) => {
  try {
    const { postid } = req.params;
    const userId = req.headers.userId;
    const isPostExist = await LocationModel.findOne({
      _id: postid,
    });
    // console.log(isPostExist);
    if (!isPostExist) {
      return res.status(400).json({
        message: "No location detail found",
      });
    }

    const comments = await CommentModel.find({ locationPostId: postid });

    if (comments == "") {
      return res.status(400).json({
        message: "No any comments for this post",
      });
    } else {
      return res.status(200).json({
        comments: comments,
      });
    }

    // console.log("comments", comments);
  } catch (error) {
    console.log(error.message);
  }
};


const getAllCommentsByLocationDetailsforAdmin = async (req, res) => {
  try {
    const { postid } = req.params;
    // const userId = req.headers.userId;
    const isPostExist = await LocationModel.findOne({
      _id: postid,
    });
    // console.log(isPostExist);
    if (!isPostExist) {
      return res.status(400).json({
        message: "No location detail found",
      });
    }

    const comments = await CommentModel.find({ locationPostId: postid });

    if (comments == "") {
      return res.status(400).json({
        message: "No any comments for this post",
      });
    } else {
      return res.status(200).json({
        comments: comments,
      });
    }

    // console.log("comments", comments);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addingComment,
  getAllCommentsByLocationDetails,
  getAllCommentsByLocationDetailsforAdmin,
};
