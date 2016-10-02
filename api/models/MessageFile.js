/**
 * @class MessageFile
 */

module.exports = {

  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    path: {
      type: 'string',
      required: true
    },
    size: {
      type: 'integer',
      required: true
    },
    type: {
      type: 'string',
      required: true
    },
    message: {
      model: 'Message'
    },
    author: {
      model: 'User',
      required: true
    }
  }

};
