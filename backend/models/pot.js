const mongoose = require('mongoose')

const potSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    totalSaved: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

potSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Pot', potSchema)