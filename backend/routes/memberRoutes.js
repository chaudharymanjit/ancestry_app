const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().populate('rootId');
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new member
router.post('/', async (req, res) => {
  console.log(req.body)
  if (!req.body.rootId || !req.body.Address) {
    console.log(req.body.rootId, req.body.Address)
    return res.status(400).json({ message: "rootId and address are required fields" });
  }
  const member = new Member(req.body);
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
    console.log(newMember, "member added");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error: ", error.message)
  }
});

// GET a specific member by id
router.get('/:id', getMember, (req, res) => {
  res.json(res.member);
});

// PUT update a member by id
router.put('/:id', getMember, async (req, res) => {
  if (req.body.name != null) {
    res.member.name = req.body.name;
  }
  // ... update other fields as needed
  try {
    const updatedMember = await res.member.save();
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a member
router.delete('/:id', getMember, async (req, res) => {
  try {
    await res.member.remove();
    res.json({ message: 'Deleted Member' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get member object by ID
async function getMember(req, res, next) {
  let member;
  try {
    member = await Member.findById(req.params.id).populate('rootId');
    if (member == null) {
      return res.status(404).json({ message: 'Cannot find member' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.member = member;
  next();
}

module.exports = router;
