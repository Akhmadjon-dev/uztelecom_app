const bcrypt = require("bcrypt");
const Locations = require("../models/locations");
const util = require("../utils");
// const  multer = require('../configs/multer');
// const  mongoose = require('mongoose');
// const  uuidv4 = require('uuid/v4');

const baseUrl = process.env.REACT_APP_baseUrl || "";

exports.fetchAllLocations = (req, res) => {
  Locations.find({ isDeleted: false })
    .then((locations) => res.json(locations))
    .catch((err) => res.send(err));
};

exports.fetchLocationById = (req, res) => {
  const { id } = req.params;

  Locations.findById(id)
    .then((location) => {
      res.json(location);
    })
    .catch((err) => res.send(err));
};

exports.deleteAllLocations = (req, res) => {
  Locations.updateMany();
  const updatedData = {
    isDeleted: true,
  };
  Locations.updateMany({ $set: updatedData })
    .then(() => {
      res.json({ success: true, msg: "Successfully deleted all data" });
    })
    .catch((err) => res.send(err));
};

exports.createLocation = async (req, res) => {
  console.log(req.body, ")))))))))))))))");
  const body = req.body;
  const {
    isFinishedCabel,
    typeCabel: { air, ground, chanel },
  } = JSON.parse(body.opticCabel);
  const { isInstalled } = JSON.parse(body.device);
  const { name, createdAt, isFinished } = body;
  const file = req.file;
  let finishCabel = isFinishedCabel;
  let finishAll = isFinished;
  if (
    (air.isCompleted || air.isCompleted === null) &&
    (chanel.isCompleted || chanel.isCompleted === null) &&
    (ground.isCompleted || ground.isCompleted === null)
  ) {
    finishCabel = true;
  } else {
    finishCabel = false;
  }
  if (isInstalled && finishCabel) {
    finishAll = "true";
  } else if ((isInstalled && !finishCabel) || (!isInstalled && finishCabel)) {
    finishAll = "progress";
  } else if (isInstalled === false && finishCabel === false) {
    finishAll = "false";
  }

  console.log(req.file, "!!!!!!!!!!!!!!!!");
  const img = file && baseUrl + file.path.replace("public", "");
  const Location = new Locations({
    ...req.body,
    file: img,
    device: {
      ...JSON.parse(body.device),
    },
    cordinate: {
      ...JSON.parse(body.cordinate),
    },
    isFinished: finishAll,
    opticCabel: {
      ...JSON.parse(body.opticCabel),
      isFinishedCabel: finishCabel,
    },
  });

  Location.save()
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      const msg =
        err.code === 11000
          ? `Locations with "${name}" name adress exists`
          : err.errmsg;
      res.json({ success: false, msg });
    });
};

exports.updateLocationById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const {
    isFinishedCabel,
    typeCabel: { air, ground, chanel },
  } = JSON.parse(body.opticCabel);
  const { isInstalled } = JSON.parse(body.device);
  const { oldImg, name, createdAt, isFinished } = body;
  const file = req.file;
  let finishCabel = isFinishedCabel;
  let finishAll = isFinished;
  if (
    (air.isCompleted || air.isCompleted === null) &&
    (chanel.isCompleted || chanel.isCompleted === null) &&
    (ground.isCompleted || ground.isCompleted === null)
  ) {
    finishCabel = true;
  } else {
    finishCabel = false;
  }
  console.log(isInstalled, finishCabel, "-------------");
  if (isInstalled && finishCabel) {
    finishAll = "true";
  } else if ((isInstalled && !finishCabel) || (!isInstalled && finishCabel)) {
    finishAll = "progress";
  } else if (isInstalled === false && finishCabel === false) {
    finishAll = "false";
  }

  const img = file ? baseUrl + file.path.replace("public", "") : oldImg;
  console.log(file, img, "!!!!!!!!!!!!!!!!");
  const updatedData = {
    ...req.body,
    file: img,
    device: {
      ...JSON.parse(body.device),
    },
    cordinate: {
      ...JSON.parse(body.cordinate),
    },
    isFinished: finishAll,
    opticCabel: {
      ...JSON.parse(body.opticCabel),
      isFinishedCabel: finishCabel,
    },
  };
  console.log("-----------------------------------", updatedData);

  Locations.findByIdAndUpdate(id, { $set: { ...updatedData } }, { new: true })
    .then((admin) => {
      res.json(admin);
      // util.resizeImg(req.file, "locations");
    })
    .catch((err) => res.send(err));
};

exports.deleteLocationById = (req, res) => {
  const { id } = req.params;
  const updatedData = {
    isDeleted: true,
  };
  Locations.findByIdAndUpdate(id, { $set: updatedData })
    .then(() => {
      res.json({ success: true, msg: "Successfully deleted" });
    })
    .catch((err) => res.send(err));
};
