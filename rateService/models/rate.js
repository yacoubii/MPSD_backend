const Joi = require('Joi');
const mongoose = require('mongoose'); 

const rateSchema =  new mongoose.Schema({
	postId:{
		type: String,
		required: true,
		unique: true
	},
	rate:{
		type: Number,
		required: true,
	}	
});
 
rateSchema.methods.increment = function () {
	this.rate=this.rate+1;
};

rateSchema.methods.decrement = function () {
	this.rate=this.rate-1;
};

const Rate=mongoose.model('Rate', rateSchema);

//configuring rate validator
function validateRate(rate){
	const schema={
		postId: Joi.string().required(),
		rate: Joi.number().required()
	};
	return Joi.validate(rate, schema);
}


exports.Rate = Rate;
exports.validate = validateRate;