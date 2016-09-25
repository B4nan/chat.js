/**
 * @class Room
 */

module.exports = {

  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    author: {
      model: 'User',
      required: true
    }
  }

};
