module.exports = function (req, res, next) {
  if (req.session.authenticated) {
    return next();
  }

  res.forbidden('User not authenticated');
};
