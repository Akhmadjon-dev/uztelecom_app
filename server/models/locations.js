const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locatonsSchema = new Schema({
  address: {
    required: true,
    type: String,
  },
  createdAt: {
    default: Date.now(),
    type: Number,
  },
  deadline: Number,
  device: {
    deadline: Number,
    isInstalled: Boolean,
    deviceType: String,
  },
  isFinished: String,
  name: {
    required: true,
    type: String,
    unique: true,
  },
  opticCabel: {
    total: Number,
    type: {
      air: {
        actualWork: Number,
        typeCabelDeadline: Number,
        isCompleted: Boolean,
        total: Number,
        numberTola: Number,
      },
      chanel: {
        actualWork: Number,
        typeCabelDeadline: Number,
        isCompleted: Boolean,
        total: Number,
        numberTola: Number,
      },
      ground: {
        actualWork: Number,
        typeCabelDeadline: Number,
        isCompleted: Boolean,
        total: Number,
        numberTola: Number,
      },
    },
    unitType: String,
    isFinishedCabel: Boolean,
  },
  region: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  cordinate: {
    lng: Number,
    lat: Number,
    left: Number,
    top: Number,
    right: Number,
    bottom: Number,
  },
  file: String,
  status: String,
  air: Boolean,
  ground: Boolean,
  chanel: Boolean,
  isDeleted: {
    default: false,
    type: Boolean,
  },
  updatedAt: {
    default: Date.now(),
    type: Number,
  },
});

locatonsSchema.index({ name: 1 });

const Locations = mongoose.model("Location", locatonsSchema);

module.exports = Locations;
