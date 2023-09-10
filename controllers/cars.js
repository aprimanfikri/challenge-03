const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const { handleError } = require("../utils/error");
const { template } = require("../utils/template");

const carsData = "data/cars.json";

async function getAllCars(req, res) {
  try {
    const data = await fs.readFile(carsData);
    const cars = JSON.parse(data);
    res.status(200).json({
      message: "Berhasil menampilkan semua data mobil",
      data: cars,
    });
  } catch (error) {
    handleError(res);
  }
}

async function getCarById(req, res) {
  const carId = req.params.id;
  try {
    const data = await fs.readFile(carsData);
    const cars = JSON.parse(data);
    const car = cars.find((car) => car.id === carId);
    if (!car) {
      res.status(404).json({
        message: `Tidak dapat menemukan mobil dengan id ${carId}`,
      });
    } else {
      res.status(200).json({
        message: `Berhasil menampilkan data mobil dengan id ${carId}`,
        data: car,
      });
    }
  } catch (error) {
    handleError(res);
  }
}

async function storeCar(req, res) {
  const car = req.body;
  try {
    const data = await fs.readFile(carsData);
    const cars = JSON.parse(data);
    const newCarId = uuidv4();
    const existingCar = cars.find((c) => c.id === newCarId);
    if (existingCar) {
      return res.status(500).json({
        message: "Terjadi kesalahan dalam menghasilkan id mobil",
      });
    }
    const newCar = {
      id: newCarId,
      ...template,
      ...car,
    };
    cars.push(newCar);
    await fs.writeFile(carsData, JSON.stringify(cars, null, 2));
    res.status(201).json({
      message: `Berhasil menambah data mobil dengan id ${newCarId}`,
      data: newCar,
    });
  } catch (error) {
    handleError(res);
  }
}

async function updatecarById(req, res) {
  const carId = req.params.id;
  const car = req.body;
  try {
    const data = await fs.readFile(carsData);
    const cars = JSON.parse(data);
    const index = cars.findIndex((c) => c.id === carId);
    if (index === -1) {
      res.status(404).json({
        message: `Tidak dapat menemukan mobil dengan id ${carId}`,
      });
    } else {
      const updatedCar = { ...cars[index], ...car };
      cars[index] = updatedCar;
      await fs.writeFile(carsData, JSON.stringify(cars, null, 2));
      res.json({
        message: `Mobil dengan id ${carId} berhasil di update`,
        data: updatedCar,
      });
    }
  } catch (error) {
    handleError(res);
  }
}

async function deleteCarById(req, res) {
  const carId = req.params.id;
  try {
    const data = await fs.readFile(carsData);
    const cars = JSON.parse(data);
    const index = cars.findIndex((c) => c.id === carId);
    if (index === -1) {
      res.status(404).json({
        message: `Tidak dapat menemukan mobil dengan id ${carId}`,
      });
    } else {
      const deletedCar = cars.splice(index, 1)[0];
      await fs.writeFile(carsData, JSON.stringify(cars, null, 2));
      res.status(200).json({
        message: `Mobil dengan id ${carId} berhasil di hapus`,
        data: deletedCar,
      });
    }
  } catch (error) {
    handleError(res);
  }
}

module.exports = {
  getAllCars,
  getCarById,
  storeCar,
  updatecarById,
  deleteCarById,
};
