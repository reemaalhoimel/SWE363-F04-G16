
const db = require("../config/db");

const AdminSchema = new db.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = db.model("Admin", AdminSchema);
