let jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  console.log("everything from headers", req.headers);
  var token = req.headers["access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }

    req.user = decoded.id;
    next();
  });
}

module.exports = validateToken;
