const bcrypt = require("bcrypt");
const Users = require("../models/users");

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (user) {
      const { password: hash, _id, name, isAdmin } = user;
      const isPasswordCorreect = await bcrypt.compare(password, hash);

      if (isPasswordCorreect) {
        req.session.userId = _id;
        req.session.isAdmin = isAdmin;
        req.session.userName = name;
        req.session.userEmail = email;
        req.session.loggedIn = true;
        res.json({ payload: user, success: true });
      } else {
        res.json({ msg: "Username or password is wrong", success: false });
      }
    } else {
      res.json({
        msg: `No user exist with user name ${email}`,
        success: false,
      });
    }
  } catch (err) {
    res.json({ msg: err.message, success: false });
  }
};

exports.signUp = async (req, res) => {
  const { password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  // const isTrueAdmin = Users.find({ isAdmin: "true" });
  console.log("working", hashedPassword);
  // console.log(isTrueAdmin, "--------------------");

  try {
    const numberOfAdmin = (await Users.count()) + 1;
    if (numberOfAdmin <= 1) {
      const user = await Users.create({
        ...req.body,
        password: hashedPassword,
        isAdmin: true,
      });
      req.session.userId = user._id;
      req.session.isAdmin = true;
      req.session.userName = user.name;
      req.session.userEmail = user.email;
      req.session.loggedIn = true;
      res.json({ payload: user, success: true });
    } else {
      const user = await Users.create({
        ...req.body,
        password: hashedPassword,
      });
      req.session.userId = user._id;
      req.session.isAdmin = user.isAdmin;
      req.session.userName = user.name;
      req.session.userEmail = user.email;
      req.session.loggedIn = true;
      res.json({ payload: user, success: true });
    }
  } catch (err) {
    const msg =
      err.code === 11000
        ? `Users with "${email}" email adress is exist`
        : err.message;
    res.json({ success: false, msg });
  }
};

exports.signOut = (req, res) => {
  req.session.userId = null;
  req.session.isAdmin = null;
  req.session.userName = null;
  req.session.email = null;
  req.session.loggedIn = false;
  req.session.destroy();

  res.json({ msg: "Sign out has been successfull" });
};
