var Users = require('./../controllers/users.js');
module.exports = function(app){
	app.post('/users', Users.register);
	app.post('/login', Users.login);
	app.get('/success', Users.success);
	app.get('/logout', Users.logout);
	app.get('/users/current', Users.getCurrent);
}