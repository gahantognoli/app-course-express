const mongoose = require('mongoose');

module.exports = function(){
    const schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String,
            required: true
        }
    });

    return mongoose.model('Usuario', schema, 'usuarios');
}