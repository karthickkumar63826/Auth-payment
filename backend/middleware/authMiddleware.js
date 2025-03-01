const jwt = require("jsonwebtoken");
const CustomError = require("./customError");

const authMiddleware = async (req, res, next) => {
  const Authorization = req.headers.Authorization || req.headers.authorization;

  if (Authorization && Authorization.startsWith("Bearer ")) {
    const token = Authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRETKEY, (err, info) => {
      if (err) {
        return next(new CustomError("Unauthorized, Invalid token", 403));
      }

      req.user = info;
      next();
    });
  }
};

module.exports = authMiddleware;
