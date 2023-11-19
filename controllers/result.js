const Result = require('../models/result');

module.exports = {
  getResult: async (req, res) => {
    const result = await Result.find().populate('exam').sort('-createdAt');
    return res.status(200).json(result);
  },
};
