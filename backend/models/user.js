/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Name must be at least 3 characters long.'],
    required: true,
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  passwordHash: String,
  balance: {
    type: Number,
    default: 0,
  },
  pots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pot',
    },
  ],
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
  budgets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget',
    },
  ],
  bills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bill',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
