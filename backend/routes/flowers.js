const express = require('express');
const Flower = require('../models/flowerModel')
const {
  createFlower,
  getFlowers,
  getFlower,
  deleteFlower,
  updateFlower,
  upload
} = require('../controllers/flowerController');

const router = express.Router()

router.get('/', getFlowers)

router.get('/:id', getFlower) 

router.post('/', upload.single('Image'), createFlower) 

router.delete('/:id', deleteFlower) 

router.patch('/:id', upload.single('Image'), updateFlower)


module.exports = router;