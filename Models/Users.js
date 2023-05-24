const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({

    name: {
        type : String,
    },
    email: {
        type : String,
    },
    password: {
        type : String,
    },

},{
    timestamps: true
});

module.exports = Users = mongoose.model('users',UsersSchema);