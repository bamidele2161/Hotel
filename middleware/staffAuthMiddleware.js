let jwt = require("jsonwebtoken");

const validateWithStaffToken = (req, res, next) => {
  const token = req.headers["access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.STAFF_JWT_SECRET);
    req.staff = decoded.id;
  } catch (err) {
    return res.status(401).send(err.message || "Invalid token");
  }

  return next();
};

module.exports = validateWithStaffToken;
