const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const studentSchema = new Schema({
	'name' : { type: String, required: true, min:3, max:30 },
	'idNumber' : { type: Number, required: false, min:3, max:30 },
	'dateOfBirth' : { type: Date, required: false, min:3, max:30 },
	'group' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'group'
	},	
	'invoices' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'invoices'
	}
});

module.exports = mongoose.model('student', studentSchema);
