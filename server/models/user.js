var mongoose = require('mongoose');
var bcrypt = require('bcrypt-as-promised');
var UserSchema = mongoose.Schema({
	name: {type:String, minlength:4},
	email: {type: String, unique:true, required:true},
	password: {type: String, minlength:8},
}, {timestamps: true});

UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, 10)
	.then(function(hashed_pw){
		user.password = hashed_pw;
		next();
	})
	.catch(function(error){
		console.log(error);
	})
})


mongoose.model('User', UserSchema);