var Users = require('./../controllers/users.js');
module.exports = function(app){
	app.get('/', Users.index);
	app.post('/users', Users.register);
}