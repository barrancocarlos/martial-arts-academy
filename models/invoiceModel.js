const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const invoiceSchema = new Schema({
	'month' : { type: String, required: true, min:3, max:30 },
	'year' : { type: String, required: true, min:4, max:4 },
	'fee' : { type: Number, required: true, min:3, max:10 },
	'date' : { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('invoice', invoiceSchema);
