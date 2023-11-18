const express = require('express');
const router = express.Router();

const Async = require('../middlewares/async');

const { getResult } = require('../controllers/result');

router.route('/').get(Async(getResult));

module.exports = router;
