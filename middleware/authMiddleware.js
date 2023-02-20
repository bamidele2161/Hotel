let jwt = require("jsonwebtoken");

const validateToken = (type) => {
  return (req, res, next) => {
    let token = req.headers["access-token"];

    if (!token) {
      return res
        .status(403)
        .send(`A ${type} token is required for authentication`);
    }

    if (type === "user") {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
      } catch (err) {
        return res.status(401).send(err.message || "Invalid token");
      }
    }
    if (type === "staff") {
      try {
        const decoded = jwt.verify(token, process.env.STAFF_JWT_SECRET);
        req.staff = decoded.id;
      } catch (err) {
        return res.status(401).send(err.message || "Invalid token");
      }
    }

    return next();
  };
};

module.exports = validateToken;
