const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    museum: {
        type : String,
    },
    datepicker: {
        type : String,
    },
    cperson: {
        type : String,
    },
    cmobile: {
        type : String,
    },
    email: {
        type : String,
    },
    nationality: {
        type : String,
    },
    adult: {
        type : String,
    },
    children: {
        type : String,
    },
    still: {
        type : String,
    },
    video: {
        type : String,
    },
    tamt: {
        type : String,
    },

},{
    timestamps: true
});
module.exports = Booking = mongoose.model('bookings',BookingSchema);