const mongoose = require('mongoose');
const express = require('express');
const Courses = require('../../models/Courses');
const router = express.Router();
const auth = require('../../middleware/auth');

//@route  get api/courses
//@desc   Load all the courses
//@access Private

router.get('/', async (req, res) => {
  try {
    const courses = await Courses.find();
    return res.json(courses);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
