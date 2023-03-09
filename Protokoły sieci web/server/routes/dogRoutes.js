const express = require("express");
const router = express.Router();
const dogController = require("../controllers/dogController")
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT)

router.route('/')
    .get(dogController.getAllDogs)
    .post(dogController.createNewDog)
    .patch(dogController.updateDog)
    .delete(dogController.deleteDog)

module.exports = router