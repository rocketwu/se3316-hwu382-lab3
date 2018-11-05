var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/carts');
var CartSchema   = new Schema({
    name: String,
    price: Number,
    tax: Number,
    quantity: Number
});

module.exports = mongoose.model('Cart', CartSchema);