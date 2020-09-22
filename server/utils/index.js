const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const baseUrl = process.env.REACT_APP_baseUrl || "";

exports.deleteImg = (img) => {
  let dir = `../public${img}`;
  if (process.env.NODE_ENV !== "development") {
    dir = `/var/www/${img}/`;
  }
  const imgPath = path.join(__dirname, dir);
  if (fs.existsSync(imgPath) && img) {
    fs.unlinkSync(imgPath);
  }
};

exports.resizeImg = (img, imgType) => {
  if (img) {
    const { path: imgPath, destination, filename } = img;
    const customeSize =
      imgType === "banner"
        ? { width: 720, height: 405 }
        : { width: 200, height: 200 };
    const fileExtension = path.extname(filename);
    const imgName = filename.slice(0, filename.lastIndexOf("."));
    const newImgPath = `${destination + imgName}-resized${fileExtension}`;

    sharp(imgPath)
      .resize({
        ...customeSize,
        fit: "contain",
        background: "#ffffff",
      })
      .jpeg({ quality: 50, force: false })
      .png({ quality: 50, force: false })
      .toFile(newImgPath)
      .then(() => {
        this.deleteImg(imgPath);
        fs.renameSync(newImgPath, `${destination + imgName}${fileExtension}`);
      })
      .catch((err) => console.log("ERRRO", err));
  }
};

exports.authHandler = (req, res, next) => {
  const whiteList = ["/auth/sign-in", "/auth/sign-up"];
  console.log(req.session, req.url);

  if (!whiteList.includes(req.url)) {
    const { userId, loggedIn } = req.session;
    if (userId && loggedIn) {
      return next();
    }
    return res.status(401).json({
      type: "auth",
      msg: "You need to login/sign up first",
      success: false,
    });
  }
  return next();
};
