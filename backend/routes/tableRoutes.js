const express = require('express');
const router = express.Router();
const { getAvailableTables, addTable, getAllTables } = require('../controllers/tableController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/available', getAvailableTables);
router.get('/', getAllTables);
router.post('/', protect, adminOnly, addTable);

module.exports = router;