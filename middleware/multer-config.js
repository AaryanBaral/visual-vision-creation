const multer = require("multer");

const upload = multer({
    storage:multer.memoryStorage()
}).single("name");


module.exports = {upload}
