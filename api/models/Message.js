/**
 * @class Message
 */

module.exports = {

  schema: true,

  attributes: {
    text: {
      type: 'string',
      required: true
    },
    from: {
      model: 'User',
      required: true
    },
    room: {
      model: 'Room',
      required: true
    }
  }

};
