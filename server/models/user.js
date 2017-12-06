var mongoose = require('mongoose');
var bcrypt = require('bcrypt-as-promised');
var UserSchema = mongoose.Schema({
	name: String,
	email: {type: String, unique:true},
	password: {type: String},
	dob: {
		type: Date,
		validate:[{
				validator: function(date){
					var start = new Date('1/1/1990');
					var end = new Date('12/31/1999');
					console.log(start);
					console.log(end);
					return date > start && date<end;
				},
				message: "you were not born in the 90s"
			}
		]
	}
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