const mongoose = require('mongoose');

const ContinentModel = mongoose.model('Continent', {
    name: {
        type: String,
        //cannot be empty
        required: true,
        //should be unique
        unique: true
    },
    contries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    }]
});

module.exports = ContinentModel;