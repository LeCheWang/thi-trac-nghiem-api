const Question = require('../models/question');

module.exports = {
  getQuestions: async (req, res) => {
    const questions = await Question.find();
    return res.status(200).json(questions);
  },
  createQuestion: async (req, res) => {
    const body = req.body;
    const question = await Question.create(body);
    return res.status(201).json(question);
  },
  deleteQuestion: async (req, res) => {
    const id = req.params.id;
    const question = await Question.findByIdAndDelete(id);
    return res.status(200).json(question);
  },
};
