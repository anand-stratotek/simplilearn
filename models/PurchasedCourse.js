const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PurchasedCourseSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  courseId: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = PurchasedCourse = mongoose.model(
  'purchasedCourse',
  PurchasedCourseSchema
);
