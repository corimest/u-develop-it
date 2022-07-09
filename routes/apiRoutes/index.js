// Central hub to pull all routes together

const express = require('express');
const router = express.Router();

router.use(require('./candidateRoutes'));
// Require voter routes
router.use(require('./voterRoutes'));
// Require Votes routes
router.use(require('./voteRoutes'));

module.exports = router;