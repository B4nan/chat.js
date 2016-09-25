/**
 * @class SignController
 */

var passwords = require('machinepack-passwords');

module.exports = {

  in: function (req, res) {
    User.findOne({ email: req.param('email') }, function (err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (! user) {
        return res.notFound();
      }

      passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({
        error: function (err) {
          return res.negotiate(err);
        },
        incorrect: function () {
          return res.notFound();
        },
        success: function () {
          user.lastLogin = new Date();
          user.save();
          req.session.authenticated = user.id;
          return res.ok({ user: user });
        }
      });
    });
  },

  up: function(req, res) {
    passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10
    }).exec({
      error: function(err) {
        return res.negotiate(err);
      },
      success: function(encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function(err) {
            return res.negotiate(err);
          },
          success: function(gravatarUrl) {
            User.create({
              name: req.param('name'),
              title: req.param('title'),
              email: req.param('email'),
              encryptedPassword: encryptedPassword,
              lastLogin: new Date(),
              gravatarUrl: gravatarUrl
            }, function (err, newUser) {
              if (err) {
                if (
                  err.invalidAttributes &&
                  err.invalidAttributes.email &&
                  err.invalidAttributes.email[0] &&
                  err.invalidAttributes.email[0].rule === 'unique'
                ) {
                  return res.emailAddressInUse();
                }

                return res.negotiate(err);
              }

              req.session.authenticated = newUser.id;
              return res.json({id: newUser.id});
            });
          }
        });
      }
    });
  },

  out: function (req, res) {
    if (! req.session.authenticated) {
      return res.json('ok');
    }
    User.findOne(req.session.authenticated, function (err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (! user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.json('ok');
      }

      req.session.authenticated = null;
      return res.json('ok');
    });
  }
};
