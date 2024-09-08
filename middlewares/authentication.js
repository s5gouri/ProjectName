const { validate_token } = require("../services/service");
const check_for_user = (cookie_name) => {
  return (req, res, next) => {
    const cookie_value = req.cookies[cookie_name];
    if (!cookie_value) {
      console.log("no cookie found");
      return res.json(0);
    }
    try {
      const user_payload = validate_token(cookie_value);
      req.user1 = user_payload;
    } catch (error) {}
    return next();
  };
};
const restrict_to = (roles = []) => {
  return (req, res, next) => {
    if (!req.user1) {
      res.redirect("/");
    }
    if (!roles.includes(req.user.role)) {
      res.end("UNAUTHORISED");
    }
    return next();
  };
};
module.exports = { check_for_user, restrict_to };
