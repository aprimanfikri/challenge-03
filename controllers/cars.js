const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const { handleError } = require("../utils/error");
const { template } = require("../utils/template");

const carsData = "data/cars.json";

let cars = [];

const loadCarsData = () => {
  return fs
    .readFile(carsData)
    .then((data) => {
      cars = JSON.parse(data);
    })
    .catch(handleError);
};

loadCarsData();

const getAllCars = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Berhasil menampilkan semua data mobil",
      data: cars,
    });
  } catch (error) {
    handleError(res);
  }
};

const getCarById = (req, res) => {
  const car = req.car;
  res.status(200).json({
    status: "success",
    message: `Berhasil menampilkan data mobil dengan id ${car.id}`,
    data: car,
  });
};

const storeCar = (req, res) => {
  try {
    const newCarId = uuidv4();
    const existingCar = cars.find((c) => c.id === newCarId);
    if (existingCar) {
      return res.status(500).json({
        status: "failed",
        message: "Terjadi kesalahan dalam menghasilkan id mobil",
      });
    }
    const newCar = {
      id: newCarId,
      ...template,
      ...req.body,
    };
    cars.push(newCar);
    fs.writeFile(carsData, JSON.stringify(cars, null, 2))
      .then(() => {
        res.status(201).json({
          status: "success",
          message: `Berhasil menambah data mobil dengan id ${newCarId}`,
          data: newCar,
        });
      })
      .catch(handleError);
  } catch (error) {
    handleError(res);
  }
};

const updatecarById = (req, res) => {
  try {
    const car = req.car;
    const updatedCar = { ...car, ...req.body };
    const index = cars.findIndex((c) => c.id === car.id);
    cars[index] = updatedCar;
    fs.writeFile(carsData, JSON.stringify(cars, null, 2))
      .then(() => {
        res.json({
          status: "success",
          message: `Mobil dengan id ${car.id} berhasil di update`,
          data: updatedCar,
        });
      })
      .catch(handleError);
  } catch (error) {
    handleError(res);
  }
};

const deleteCarById = (req, res) => {
  try {
    const car = req.car;
    const index = cars.findIndex((c) => c.id === car.id);
    const deletedCar = cars.splice(index, 1)[0];
    fs.writeFile(carsData, JSON.stringify(cars, null, 2))
      .then(() => {
        res.status(200).json({
          status: "success",
          message: `Mobil dengan id ${car.id} berhasil di hapus`,
          data: deletedCar,
        });
      })
      .catch(handleError);
  } catch (error) {
    handleError(res);
  }
};

module.exports = {
  getAllCars,
  getCarById,
  storeCar,
  updatecarById,
  deleteCarById,
};
