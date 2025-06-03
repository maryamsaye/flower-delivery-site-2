const express = require('express');
const {
  createFlower,
  getFlowers,
  getFlower,
  deleteFlower,
  updateFlower,
  upload
} = require('../controllers/flowerController');

const router = express.Router();

// Route handlers using controller logic
router.get('/', getFlowers);
router.get('/:id', getFlower);
router.post('/', upload.single('Image'), createFlower);
router.delete('/:id', deleteFlower);
router.patch('/:id', upload.single('Image'), updateFlower);

module.exports = router;
