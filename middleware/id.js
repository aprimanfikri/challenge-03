const fs = require("fs").promises;
const { handleError } = require("../utils/error");

const checkCarId = (req, res, next, val) => {
  fs.readFile("data/cars.json")
    .then((data) => {
      const cars = JSON.parse(data);
      const car = cars.find((car) => car.id === val);

      if (!car) {
        return res.status(404).json({
          status: "failed",
          message: `Tidak dapat menemukan mobil dengan id ${val}`,
        });
      }
      req.car = car;
      next();
    })
    .catch(handleError);
};

module.exports = checkCarId;
