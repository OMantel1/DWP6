const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    id: {type: String, required: true},
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacter: {type: String, required: true},
    description: {type: String, required: true},
    mainingredient: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: false},
    dislikes: {type: Number, required: false},
    usersliked: {type: String, required: false},
    usersdisliked: {type: String, required: false},

});

module.exports = mongoose.model('Sauce', sauceSchema);