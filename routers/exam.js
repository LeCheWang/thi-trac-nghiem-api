const express = require('express');

const router = express.Router();

const Async = require('../middlewares/async');

const {
  getExams,
  createExam,
  deleteExam,
  getQuestionForExam,
  submitExam,
} = require('../controllers/exam');

router.route('/').get(Async(getExams)).post(Async(createExam));

router
  .route('/:id')
  .delete(Async(deleteExam))
  .get(Async(getQuestionForExam))
  .post(Async(submitExam));

module.exports = router;
