var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

var animalsSchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    breed: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    height: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 4
    },
    weight: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 4
    },
    food: {
        type: String
    },
    speed: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 4
    },
    color: {
        type: String
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
});


animalsSchema.plugin(timestamps, {
    createdAt: 'dateCreated',
    updatedAt: 'dateUpdated'
});

module.exports = mongoose.model('animals', animalsSchema, 'animals');




