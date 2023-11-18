const mongoose = require('mongoose');

const examSchema = mongoose.Schema(
  {
    name: String,
    time_start: String,
    time_end: Number,
    total_question: Number,
    difficult_question: Number,
    normal_question: Number,
    easy_question: Number,
    subject: String,
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

module.exports = mongoose.model('exam', examSchema);
