const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  console.log('Received data:', req.body); 
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
    console.log(newUser, "user added");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error: ",error.message);
  }
});

// GET a specific user by id
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// PUT update a user by id
router.put('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  // ... update other fields as needed
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted User' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get user object by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
