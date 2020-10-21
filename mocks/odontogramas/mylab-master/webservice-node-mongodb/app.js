
var app = require('./app_config.js');

var userController = require('./controller/user_controller.js');


var validator = require('validator');

/* Rotas */
app.get('/', function(req, res){
	res.end('Bem vindo ao webservice de usuários, manda vê aí nos metodos: GET, POST, PUT e DELETE.');
})

app.get('/users', function(req, res){

	userController.list(function (resp) {
		res.json(resp);
	});	
});

app.get('/users/:id', function(req, res){

	var id = validator.trim(validator.escape(req.param('id')));

	userController.user(id, function(resp){
		res.json(resp);
	});	
	
});

app.post('/users', function(req, res){

	var fullname = validator.trim(validator.escape(req.param('fullname')));
	var email = validator.trim(validator.escape(req.param('email')));
	var password = validator.trim(validator.escape(req.param('password')));

	userController.save(fullname, email, password, function(resp){
		res.json(resp);
	});

});

app.put('/users', function(req, res){

	var id = validator.trim(validator.escape(req.param('id')));
	var fullname = validator.trim(validator.escape(req.param('fullname')));
	var email = validator.trim(validator.escape(req.param('email')));
	var password = validator.trim(validator.escape(req.param('password')));

	userController.update(id, fullname, email, password, function(resp){
		res.json(resp);
	});
});

app.delete('/users/:id', function(req, res){
	
	var id = validator.trim(validator.escape(req.param('id')));

	userController.delete(id, function(resp){
		res.json(resp);
	});	

});
