const express = require("express");
const cars = require("../controllers/cars");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Ping Successfully" });
});
router.route("/cars").get(cars.getAllCars).post(cars.storeCar);
router
  .route("/cars/:id")
  .get(cars.getCarById)
  .put(cars.updatecarById)
  .delete(cars.deleteCarById);

module.exports = router;
