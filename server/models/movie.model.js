const mongoose 			= require('mongoose');
const {TE, to}          = require('../services/util.service');

let MovieSchema = mongoose.Schema({
	title: {type:String},
	description: {type:String}
}, {timestamps: true});

MovieSchema.methods.toWeb = function(){
	let json = this.toJSON();
	json.id = this._id; // this is for the front end
	return json;
};

let movie = module.exports = mongoose.model('Movie', MovieSchema);
