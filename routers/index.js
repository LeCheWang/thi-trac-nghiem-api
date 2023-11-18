const ErrorResponse = require('../helpers/ErrorResponse');
const errorHandle = require('../middlewares/error.handle');

const questionRouter = require('./question');
const examRouter = require('./exam');
const resultRouter = require('./result');

module.exports = (app) => {
  app.use('/api/questions', questionRouter);
  app.use('/api/exams', examRouter);
  app.use('/api/results', resultRouter);

  app.use('*', (req, res) => {
    throw new ErrorResponse(404, 'page not found');
  });
  app.use(errorHandle);
};
