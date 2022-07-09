// Central hub to pull all routes together

const express = require('express');
const router = express.Router();

router.use(require('./candidateRoutes'));
// Require voter routes
router.use(require('./voterRoutes'));

module.exports = router;