const bcryptjs = require('bcryptjs');
const usersRouter = require('express').Router();
const middleware = require('../utils/middleware')
const User = require('../models/user');

usersRouter.post('/balance', middleware.userExtractor, async (request, response) => {
  const { email, balance } = request.body;

  if (!email) {
    return response.status(400).json({ error: 'Email is missing' });
  }
  const user = await User.find({ email });
  if (!user) {
    response.status(404).end()
  }

  if (balance) {
    const updatedUser = await User.findOneAndUpdate({ email }, { balance }, { new: true })
    if (updatedUser) {
      response.status(200).json({ balance: updatedUser.balance })
    } else {
      response.status(404).end()
    }
  } else {
    response.status(200).json({ balance: user[0].balance });
  }
});

usersRouter.post('/', async (request, response) => {
  const { email, name, password } = request.body;

  if (password.length < 3) {
    return response.status(400).json({ error: 'Password must have at least 3 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcryptjs.hash(password, saltRounds);

  const user = new User({
    email,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.patch('/', middleware.userExtractor, async (request, response) => {
  const { _id } = request.user

  const updatedUser = await User.findByIdAndUpdate(_id, request.body, { new: true })
  if (updatedUser) {
    response.status(200).json(updatedUser)
  } else {
    response.status(404).end()
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
