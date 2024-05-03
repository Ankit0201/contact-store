const multer = require("multer");

const multerUpload = multer({
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
});

const singleFileUpload = multerUpload.single("file");

module.exports = singleFileUpload;
