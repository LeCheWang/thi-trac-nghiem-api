const mongoose = require('mongoose');

const resultSchema = mongoose.Schema(
  {
    full_name: String,
    number_correct_answer: Number,
    exam: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'exam',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('result', resultSchema);
