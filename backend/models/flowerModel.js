const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flowerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
    
},{timestamps:true})

module.exports = mongoose.model('Flower', flowerSchema)