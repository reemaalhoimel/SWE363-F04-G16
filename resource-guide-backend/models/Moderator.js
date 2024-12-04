// models/Moderator.js
/*const mongoose = require("mongoose");*/
const db = require("../config/db");

const ModeratorSchema = new db.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = db.model("Moderator", ModeratorSchema);
