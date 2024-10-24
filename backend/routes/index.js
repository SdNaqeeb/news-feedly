const express = require('express');
const userRouter = require('./user');
const newsRouter = require('./news');

const router = express.Router();

router.use('/users', userRouter);
router.use('/news', newsRouter);

module.exports = router;