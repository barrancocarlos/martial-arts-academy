const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const groupSchema = new Schema({
	'title' : String,
	'schedule' : {
		month: { type: String },
		year: { type: String }
	  }
});

module.exports = mongoose.model('group', groupSchema);
