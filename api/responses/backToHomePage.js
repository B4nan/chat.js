/**
 * Usage:
 *
 * ```
 * res.backToHomePage();    // (default to 200 "OK" status code)
 * res.backToHomePage(400);
 * ```
 */

module.exports = function (statusCode) {
  if (this.req.wantsJSON) {
    return this.res.send(statusCode || 200);
  }

  return this.res.redirect('/');
};
