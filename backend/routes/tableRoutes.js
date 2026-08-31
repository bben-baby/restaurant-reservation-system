const express = require('express');
const router = express.Router();
const { getAvailableTables, addTable, getAllTables } = require('../controllers/tableController');
const { protect } = require('../middleware/authMiddleware');

router.get('/available', getAvailableTables);
router.get('/', getAllTables);
router.post('/', protect, addTable);

module.exports = router;