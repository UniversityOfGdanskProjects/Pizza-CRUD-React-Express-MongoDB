const express = require("express");
const router = express.Router();
const pizzasController = require("../controllers/pizzasController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT)

router
  .route("/")
  .get(pizzasController.getAllPizzas)
  .post(pizzasController.createNewPizza)
  .patch(pizzasController.updatePizza)
  .delete(pizzasController.deletePizza);

router.route("/:id/addComment").post(pizzasController.addComment);

module.exports = router;
