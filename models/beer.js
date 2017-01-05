var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),

beerSchema = new mongoose.Schema({
    name: {type:String, required: true},
    brewery: {type: String, required: true},
    rating: number,
    description: string
});

var Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;