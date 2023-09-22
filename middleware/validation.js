const validate = (req, res, next) => {
  const { plate, manufacture, model } = req.body;

  if (!plate || !manufacture || !model) {
    return res.status(400).json({
      status: "failed",
      message: "Plate, manufacture, dan model harus diisi",
    });
  }

  next();
};

module.exports = { validate };
