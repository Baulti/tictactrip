const mongoose = require('mongoose');

const limitSchema = mongoose.Schema({
    userId: { type: mongoose.ObjectId, required: true },
    date: { type: Date, required: true },
    characters: { type: Number, require: true}
});

module.exports = mongoose.model('Limit', limitSchema);