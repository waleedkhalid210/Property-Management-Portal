const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    propertyTitle: {
        type: String,
        required: true
    },

    propertyType: {
        type: String,
        enum: ["Apartment", "House", "Villa", "Commercial"],
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Active", "Sold", "Rented"],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    fullAddress: {
        type: String,
        required: true
    },

    bedRooms: {
        type: Number,
        required: true
    },

    bathRooms: {
        type: Number,
        required: true
    },

    area: {
        type: Number,
        required: true
    },

    images: {
        type: [String],
        required: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;