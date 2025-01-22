const bcryptjs = require('bcryptjs');
const usersRouter = require('express').Router();
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

usersRouter.patch('/', async (request, response) => {
  const { email } = request.body;
  if (!email) {
    return response.status(400).json({ error: 'There is no email' })
  }
  const updatedUser = await User.findOneAndUpdate({ email }, request.body, { new: true })
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
