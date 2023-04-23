const express = require("express");
const multer = require("multer");
const router = express.Router();
var xlsx = require("xlsx");
var fs = require("fs-extra");
// var excelToJson = require("convert-excel-to-json");

// const upload = multer({ dest: 'uploads/' });

router.post("/", (req, res) => {
    if (req.files === null || req.files === undefined) {

        res.status(400).json({ "msg": 'No file uploaded' });
    }
    else {
        const file1 = req.files.file;
        console.log(req.files);
        file1.mv(`./uploads/${file1.name}`, (err) => {
            if (err) {
                res.send(err);
            } else {
                console.log("File 1 uploaded");
            }
        });
        const workbook = xlsx.readFile('./uploads/' + file1.name);
        const sheet = workbook.Sheets['Sheet1'];
        const data = xlsx.utils.sheet_to_json(sheet);
        console.log(data);

    }


});

module.exports = router;
