const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    recurring: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

transactionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.date = returnedObject.date.toISOString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)