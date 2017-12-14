var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-as-promised');

module.exports = {
	register: function(req,res){
		console.log('hit Users.register');
		console.log(req.body);
		if(req.body.password != req.body.passwordConfirm){
			res.send("Passwords don't match");
		}else{
			var newUser = new User(req.body);
			newUser.save(function(err){
				if(err){
					console.log("something went wrong");
					console.log(err);
					var errorsArray = [];
					if(err.errmsg != undefined){
						errorsArray = [{message: "Email is already taken"}]
					}else{
						for(var key in err.errors){
							errorsArray.push(err.errors[key]);
						}
					}
					
					res.json(errorsArray);
				}else{
					console.log("successfully saved user");
					req.session.userId = newUser._id;
					res.json(newUser);
				}
			})
		}
	},
	login: function(req,res){
		// Find the user with the email
		console.log("hit Users.login");
		User.findOne({email:req.body.email}, function(err, foundUser){
			if(foundUser != null){
				console.log("found user in DB");
				// Verify the passwords using bcrypt
				bcrypt.compare(req.body.password, foundUser.password)
				.then(function(data){
					console.log("passwords match");
					req.session.userId = foundUser._id;
					res.json(foundUser);
					// Once logged in, add the user to session and redirect

				})
				.catch(function(error){
					console.log("passwords don't match");
					console.log(error);
					res.json(error);
				})
			}
		})
	},
	success: function(req,res){
		// Search for the user in session
		if(req.session.userId != undefined){
			User.findOne({_id: req.session.userId}, function(err, foundUser){
				if(err){
					console.log('something went wrong');
					res.send(err);
				}else{
					console.log('found user in session');
					res.render('success', {currentUser: foundUser});
				}
			})
		}else{
			res.redirect('/')
		}
	},
	getCurrent: function(req,res){
		User.findOne({_id: req.session.userId}).exec(function(err, foundUser){
			console.log('foundUser', foundUser);
			res.json(foundUser);
		})
	},
	logout: function(req,res){
		req.session.destroy(function(){
			res.redirect('/');
		});
	}
}