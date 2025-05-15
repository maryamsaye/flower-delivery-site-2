const Flower = require('../models/flowerModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

//Get all flowers
const getFlowers = async (req, res) => {
    try {
        const flowers = await Flower.find({}).sort({ createdAt: -1 });
        res.status(200).json(flowers);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

//Get a single flower by ID
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

//Create a new flower with image upload
const createFlower = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { title, description, price, category } = req.body;
    const Image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const flower = await Flower.create({ title, description, price, Image, category });
        res.status(201).json(flower);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteFlower = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the flower in the database
        const flower = await Flower.findById(id);
        if (!flower) {
            return res.status(404).json({ error: 'Flower not found' });
        }

        //Check if the flower has an image
        if (flower.Image) {
            const imagePath = path.join(__dirname, '../', flower.Image);

            //Delete the image file
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                } else {
                    console.log('Image deleted:', imagePath);
                }
            });
        }

        //Delete the flower from the database
        await Flower.findByIdAndDelete(id);
        res.status(200).json({ message: 'Flower deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


const updateFlower = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, category } = req.body;
    let newImagePath = null;

    try {
        // Find the existing flower
        const flower = await Flower.findById(id);
        if (!flower) {
            return res.status(404).json({ error: 'Flower not found' });
        }

        //If a new image is uploaded, replace the old one
        if (req.file) {
            newImagePath = `/uploads/${req.file.filename}`;

            //Delete old image if it exists
            if (flower.Image) {
                const oldImagePath = path.join(__dirname, '../', flower.Image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting old image:', err);
                    } else {
                        console.log('Old image deleted:', oldImagePath);
                    }
                });
            }
        }

        //Update flower details
        const updatedFlower = await Flower.findByIdAndUpdate(
            id,
            {
                title: title || flower.titletle,
                descriptionescription: description || flower.description,
                price: price || flower.price,
                category: category || flower.category,
                Image: newImagePath || flower.Image
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
    upload
};
