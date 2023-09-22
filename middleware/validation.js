const validate = (req, res, next) => {
  const { plate, manufacture, model } = req.body;
  const missing = [];
  if (!plate) {
    missing.push("Plate");
  }
  if (!manufacture) {
    missing.push("Manufacture");
  }
  if (!model) {
    missing.push("Model");
  }
  let message = "";
  if (missing.length === 1) {
    message = `${missing[0]} harus diisi`;
  } else if (missing.length === 2) {
    message = `${missing[0]} dan ${missing[1]} harus diisi`;
  } else if (missing.length === 3) {
    message = `${missing[0]}, ${missing[1]}, dan ${missing[2]} harus diisi`;
  }
  if (missing.length > 0) {
    return res.status(400).json({
      status: "failed",
      message,
    });
  }
  next();
};

module.exports = { validate };
