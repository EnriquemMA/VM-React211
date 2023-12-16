// model to use
const mongoose = require('mongoose');
const MyFavouritesSchema = new mongoose.Schema({
    id: {
        type: 'Number',
        required: true
    },
    name: {
        type: 'String',
        required: true
    },
    url: {
        type: 'String',
        required: true
    }
});

// first attr in the .model()
const my_favourite_items = mongoose.model("my_favourite_items", MyFavouritesSchema);
module.exports = my_favourite_items;