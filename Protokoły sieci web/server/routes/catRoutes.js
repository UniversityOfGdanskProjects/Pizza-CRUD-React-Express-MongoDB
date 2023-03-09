const express = require("express");
const router = express.Router();
const catController = require("../controllers/catController")
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT)

router.route('/')
    .get(catController.getAllCats)
    .post(catController.createNewCat)
    .patch(catController.updateCat)
    .delete(catController.deleteCat)

module.exports = router