// ex 4.2
// Mongoose blogSchema transferred to its own module
const mongoose = require('mongoose')

// ex 4.11 (default value of likes set to 0) ex 4.12 (required: true to pass the 400 error test)
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
      type: Number,
      default: 0
    },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  } )

   
  module.exports = mongoose.model('Blog', blogSchema)
  
