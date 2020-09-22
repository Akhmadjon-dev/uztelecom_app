const Storages = require("../models/storage");

exports.fetchAllStorages = (req, res) => {
  Storages.find()
    .then((Storages) => res.json(Storages))
    .catch((err) => res.send(err));
};

exports.createStorage = async (req, res) => {
  // const { cabel, device, person, needCabel, needDevice } = req.body;

  const Storage = new Storages({
    ...req.body,
  });
  if ((await Storages.find()).length > 1) {
    res.json({ msg: "Already exits" });
  } else {
    Storage.save()
      .then((item) => {
        res.json(item);
      })
      .catch((err) => {
        const msg = res.json({ success: false, msg });
        console.log(msg);
      });
  }
};

// exports.deleteAllStorages = (req, res) => {
//   Storages.deleteMany()
//     .then(() => res.json("Deleted"))
//     .catch((err) => res.send(err));
// };

exports.updateStorage = async (req, res) => {
  const { id } = req.params;
  const updatedData = {
    ...req.body,
  };

  Storages.findByIdAndUpdate(id, { $set: updatedData }, { new: true })
    .then((admin) => {
      res.json(admin);
    })
    .catch((err) => res.send(err));
};

// exports.deleteStorageById = (req, res) => {
//   const { id } = req.params;
//   Storages.findByIdAndRemove(id)
//     .then(() => {
//       res.json({ success: true, msg: "Successfully deleted" });
//     })
//     .catch((err) => res.send(err));
// };
