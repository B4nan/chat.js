/**
 * Usage:
 *
 * ```
 * res.emailAddressInUse();
 * ```
 */

module.exports = function () {
  return this.res.send(409, 'Email address is already taken by another user.');
};
