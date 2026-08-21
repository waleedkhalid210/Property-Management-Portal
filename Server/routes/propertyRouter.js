const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const addPropertyValidation = require("../middlewares/addPropertyValidation");
const { addproperty, getMyProperties, deleteProperty, updateProperty,getAllProperties } = require("../controllers/propertyController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const name = path.basename(file.originalname, extension);

    cb(null, `${name}-${Date.now()}${extension}`);
  }
});

const upload = multer({
  storage: storage
});

router.post("/addproperty", upload.array("images", 2), addPropertyValidation, addproperty);
router.get("/myproperties", getMyProperties);
router.put("/editproperty/:id", upload.array("images", 2), updateProperty);
router.delete("/deleteproperty/:id", deleteProperty);
router.get("/allproperties", getAllProperties);

module.exports = router;