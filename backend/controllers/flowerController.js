const Flower = require('../models/flowerModel');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to store uploads temporarily in 'uploads' folder before uploading to Cloudinary
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // temporary storage before upload to Cloudinary
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get all flowers
const getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find({}).sort({ createdAt: -1 });
    res.status(200).json(flowers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single flower by ID
const getFlower = async (req, res) => {
  const { id } = req.params;
  try {
    const flower = await Flower.findById(id);
    if (!flower) {
      return res.status(404).json({ error: 'No such flower' });
    }
    res.status(200).json(flower);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new flower with Cloudinary image upload
const createFlower = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  try {
    let imageUrl = null;

    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'flowers',
      });

      imageUrl = result.secure_url;

      // Remove the file from local uploads folder after uploading
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting temp file:', err);
        else console.log('Temporary file deleted');
      });
    }

    const { title, description, price, category } = req.body;

    const flower = await Flower.create({
      title,
      description,
      price,
      category,
      Image: imageUrl,
    });

    res.status(201).json(flower);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Delete flower and its Cloudinary image (optional)
const deleteFlower = async (req, res) => {
  const { id } = req.params;

  try {
    const flower = await Flower.findById(id);
    if (!flower) {
      return res.status(404).json({ error: 'Flower not found' });
    }

    // If you want to delete image from Cloudinary as well, you need the public_id stored.
    // Assuming you save public_id in DB, you can delete image here:
    // await cloudinary.uploader.destroy(flower.cloudinaryPublicId);

    // Delete flower from DB
    await Flower.findByIdAndDelete(id);

    res.status(200).json({ message: 'Flower deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update flower with optional new image upload to Cloudinary
const updateFlower = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category } = req.body;

  try {
    const flower = await Flower.findById(id);
    if (!flower) {
      return res.status(404).json({ error: 'Flower not found' });
    }

    let newImageUrl = flower.Image;

    if (req.file) {
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'flowers',
      });

      newImageUrl = result.secure_url;

      // Delete temp file locally
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting temp file:', err);
      });

      // Optionally: delete old image from Cloudinary if you saved public_id
      // await cloudinary.uploader.destroy(flower.cloudinaryPublicId);
    }

    const updatedFlower = await Flower.findByIdAndUpdate(
      id,
      {
        title: title || flower.title,
        description: description || flower.description,
        price: price || flower.price,
        category: category || flower.category,
        Image: newImageUrl,
      },
      { new: true }
    );

    res.status(200).json(updatedFlower);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getFlowers,
  getFlower,
  createFlower,
  deleteFlower,
  updateFlower,
  upload,
};
