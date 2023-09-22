const express = require("express");
const cars = require("../controllers/cars");
const check = require("../middleware/id");
const { validate } = require("../middleware/validation");

const router = express.Router();

router.param("id", check);

router.route("/").get(cars.getAllCars).post(validate, cars.storeCar);
router
  .route("/:id")
  .get(cars.getCarById)
  .put(cars.updatecarById)
  .delete(cars.deleteCarById);

module.exports = router;
