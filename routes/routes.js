const express = require("express");
const cars = require("../controllers/cars");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Ping Successfully" });
});
router.get("/list-cars", cars.getAllCars);
router.get("/detail-car/:id", cars.getCarById);
router.post("/create-car", cars.storeCar);
router.put("/update-car/:id", cars.updatecarById);
router.delete("/delete-car/:id", cars.deleteCarById);

module.exports = router;
