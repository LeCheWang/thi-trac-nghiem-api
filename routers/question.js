const express = require('express');
const router = express.Router();

const Async = require('../middlewares/async');

const {
  getQuestions,
  createQuestion,
  deleteQuestion,
} = require('../controllers/question');

router.route('/').get(Async(getQuestions)).post(Async(createQuestion));
router.route('/:id').delete(Async(deleteQuestion));

module.exports = router;
