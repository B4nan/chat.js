/**
 * @class User
 */

module.exports = {

  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string'
    },
    roles: {
      type: 'array',
      defaultsTo: ['User']
    },
    lastLogin: {
      type: 'date'
    },
    gravatarUrl: {
      type: 'string'
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  }

};
