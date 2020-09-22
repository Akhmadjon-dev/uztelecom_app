const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorageSchema = new Schema({
  cabel: Number,
  createdAt: {
    default: Date.now(),
    type: Number,
  },
  device: Number,
  person: {
    name: String,
    phone: Number,
  },
  needCabel: Number,
  needDevice: Number,
  updatedAt: {
    default: Date.now(),
    type: Number,
  },
});

// StorageSchema.index({ cabel: 1 });

const Storages = mongoose.model("Storages", StorageSchema);

module.exports = Storages;
