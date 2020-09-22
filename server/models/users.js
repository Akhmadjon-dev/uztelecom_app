const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  address: String,
  company: String,
  createdAt: {
    default: Date.now(),
    type: Number,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  img: String,
  type: {
    default: "user",
    type: String,
  },
  locationType: String,
  name: String,
  lastName: String,
  password: {
    required: true,
    type: String,
  },
  phone: String,
  updatedAt: {
    default: Date.now(),
    type: Number,
  },
});

userSchema.index({ email: 1 });
const User = mongoose.model("User", userSchema);

module.exports = User;
