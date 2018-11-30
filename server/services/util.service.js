const {to} = require('await-to-js');
const pe = require('parse-error');

// EX:
let saveUser = async function(){
	let err, user;
	[err, user] = await to(UserModel.findById(1));
		if(err) TE(err.message, true);
	user.name = 'this rocks'
	[err, user] = await to(user.save());
		if(err) TE('error on saving user');
	return user;
}

module.exports.to = async (promise) => {
	let err, res;
	[err, res] = await to(promise);
	if(err) return [pe(err)];

	return [null, res];
};

module.exports.ReE = function(res, err, code){ // Error Web Response
	if(typeof err == 'object' && typeof err.message != 'undefined'){
		err = err.message;
	}

	if(typeof code !== 'undefined') res.statusCode = code;

	return res.json({success:false, error: err});
};

module.exports.ReS = function(res, data, code){ // Success Web Response
	let send_data = {success:true};

	if(typeof data == 'object'){
		send_data = Object.assign(data, send_data);//merge the objects
	}

	if(typeof code !== 'undefined') res.statusCode = code;

	return res.json(send_data)
};

module.exports.TE = TE = function(err_message, log){ // TE stands for Throw Error
	if(log === true){
		console.error(err_message);
	}

	throw new Error(err_message);
};

