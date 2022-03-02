const healthHandler = (req, res) => {
  res.json({ message: "OK", time: new Date().toString() });
};
module.exports = { healthHandler };
