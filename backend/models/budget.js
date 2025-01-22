const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    maxAmount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

budgetSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Budget', budgetSchema)