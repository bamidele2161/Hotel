const error = (err, req, res, next) => {
  res.status(500).send({ message: err.message || "something went wrong" });

  next();
};

module.exports = error;
