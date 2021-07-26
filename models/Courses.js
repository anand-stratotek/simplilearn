const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  thumbnailURL: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = Courses = mongoose.model('courses', CourseSchema);
