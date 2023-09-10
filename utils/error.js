function handleError(res) {
  res.status(500).json({ error: "Terjadi kesalahan saat membaca data mobil" });
}

module.exports = { handleError };
