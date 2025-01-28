const bcryptjs = require('bcryptjs');
const usersRouter = require('express').Router();
const middleware = require('../utils/middleware')
const User = require('../models/user');

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
