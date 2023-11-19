const ErrorResponse = require('../helpers/ErrorResponse');
const Exam = require('../models/exam');
const Question = require('../models/question');
const Result = require('../models/result');

module.exports = {
  getExams: async (req, res) => {
    const subject = req.query.subject;
    const bodyQuery = {};
    if (subject) {
      bodyQuery.subject = subject;
    }
    const exams = await Exam.find(bodyQuery);
    return res.status(200).json(exams);
  },
  createExam: async (req, res) => {
    const body = req.body;
    const {
      total_question,
      difficult_question,
      normal_question,
      easy_question,
      subject,
    } = body;
    if (
      total_question !==
      difficult_question + normal_question + easy_question
    ) {
      throw new ErrorResponse(400, 'tổng câu hỏi không đúng');
    }

    const question1 = await Question.countDocuments({
      level: 1,
      subject: subject,
    });
    if (question1 < easy_question) {
      throw new ErrorResponse(
        400,
        'Số câu hỏi DỄ không đủ để thêm bài thi. Hãy tạo thêm câu hỏi',
      );
    }
    const question2 = await Question.countDocuments({
      level: 2,
      subject: subject,
    });
    if (question2 < normal_question) {
      throw new ErrorResponse(
        400,
        'Số câu hỏi TRUNG BÌNH không đủ để thêm bài thi. Hãy tạo thêm câu hỏi',
      );
    }
    const question3 = await Question.countDocuments({
      level: 3,
      subject: subject,
    });
    if (question3 < difficult_question) {
      throw new ErrorResponse(
        400,
        'Số câu hỏi KHÓ không đủ để thêm bài thi. Hãy tạo thêm câu hỏi',
      );
    }

    const exam = await Exam.create(body);
    return res.status(201).json(exam);
  },
  deleteExam: async (req, res) => {
    const id = req.params.id;
    const exam = await Exam.findByIdAndDelete(id);
    if (!exam) {
      throw new ErrorResponse(404, 'không tìm thấy bài thi, id: ' + exam._id);
    }

    return res.status(200).json(exam);
  },
  getQuestionForExam: async (req, res) => {
    const id = req.params.id;
    const exam = await Exam.findById(id);
    if (!exam) {
      throw new ErrorResponse(404, 'không tìm thấy bài thi, id: ' + exam._id);
    }

    const easy_question = await Question.aggregate([
      { $match: { level: 1, subject: exam.subject } }, // Lọc những bản ghi có level bằng 1
      { $sample: { size: exam.easy_question } },
    ]).exec();

    const normal_question = await Question.aggregate([
      { $match: { level: 2, subject: exam.subject } }, // Lọc những bản ghi có level bằng 1
      { $sample: { size: exam.normal_question } },
    ]).exec();

    const difficult_question = await Question.aggregate([
      { $match: { level: 3, subject: exam.subject } }, // Lọc những bản ghi có level bằng 1
      { $sample: { size: exam.difficult_question } },
    ]).exec();

    return res.status(200).json({
      name: exam.name,
      total_question: exam.total_question,
      time_end: exam.time_end,
      questions: easy_question.concat(normal_question, difficult_question),
    });
  },
  submitExam: async (req, res) => {
    const id = req.params.id;
    const { full_name, answers } = req.body;

    const exam = await Exam.findById(id);
    if (!exam) {
      throw new ErrorResponse(404, 'không tìm thấy bài thi, id: ' + exam._id);
    }

    let number_correct_answer = 0;
    for (let bodyAnswer of answers) {
      const question = await Question.findOne({
        _id: bodyAnswer._id,
        correct_answer: bodyAnswer.answer,
      });
      if (question) {
        number_correct_answer++;
      }
    }

    await Result.create({
      full_name,
      number_correct_answer,
      exam: exam._id,
    });

    return res.status(200).json({
      statusCode: 200,
      message: `Chúc mừng bạn đã hoàn thành bài thi, Số câu trả lời đúng: ${number_correct_answer}/${exam.total_question}`,
    });
  },
};
