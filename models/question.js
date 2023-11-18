const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    content: String,
    subject: String,
    level: {
      type: Number,
      enum: [1, 2, 3], //dễ, trung bình, khó
      default: 1,
    },
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    correct_answer: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

module.exports = mongoose.model('question', questionSchema);
