var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
	index: function(req,res){
		console.log('hit Users.index');
		res.render('index');
	},
	register: function(req,res){
		console.log('hit Users.register');
		console.log(req.body);
		if(req.body.password != req.body.passwordConf){
			res.send("Passwords don't match");
		}else{
			var newUser = new User(req.body);
			newUser.save(function(err){
				if(err){
					console.log("something went wrong");
					res.send(err);
				}else{
					console.log("successfully saved user");
					res.redirect('/');
				}
			})
		}
	}
}