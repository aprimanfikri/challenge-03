const express = require("express");
const cars = require("../controllers/cars");

const router = express.Router();

router.route("/").get(cars.getAllCars).post(cars.storeCar);
router
  .route("/:id")
  .get(cars.getCarById)
  .put(cars.updatecarById)
  .delete(cars.deleteCarById);

module.exports = router;
