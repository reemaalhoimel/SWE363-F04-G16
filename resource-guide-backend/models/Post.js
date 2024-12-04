// models/Post.js
/*const mongoose = require("mongoose");*/
const db = require("../config/db");

const PostSchema = new db.Schema({
  courseCode: { type: String, required: true, ref: "Course" },
  username: { type: String, required: true, ref: "User" },
  id: { type: Number, default: 0 },
  content: { type: String, required: true },
  /*header: { type: String, required: true },
  totalVotes: { type: Number, default: 0 },*/
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

module.exports = db.model("Post", PostSchema);
