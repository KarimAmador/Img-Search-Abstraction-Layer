const { Schema, model } = require('mongoose');

const querySchema = new Schema({
    searchQuery: {
        type: String,
        required: true
    },
    timeSearched: {
        type: String,
        default: () => new Date().toUTCString(),
        required: true
    }
})

const Query = model('Query', querySchema);

module.exports = Query;
