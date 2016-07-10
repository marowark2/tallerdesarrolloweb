var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dbURI = 'mongodb://taller:taller@localhost:27017/personas';

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

var Schema = mongoose.Schema;

var personaSchema = new Schema({
	nombre : String,
	apellido : String,
	edad : String
});

var model = mongoose.model('personas', personaSchema);

//GetByQuery
module.exports.getPersonasByFilter = function(req, res) {
	if ((req === null) || (req === ''))
	{
		model.find(function(e,docs){
			res.send(docs);
		});
	}
	else
	{
		model.find(req.query,function(e,docs){ //{nombre : req.params.nombre}
			  res.send(docs);
		})	
	}
};
//INSERT
module.exports.insertPersona= function(req, res) {
	console.log(req.body);
	var persona1 = new model({nombre:req.body.nombre,apellido:req.body.apellido,edad:req.body.edad});
	persona1.save(function(error){
		if (error)
			return handleError(error);
		else res.send('se inserto correctamente');
	});
};

//REMOVE
module.exports.deletePersona= function(req, res) {
	//si el req es vacio, se borra toda la base de datos
	if ((req !== null) || (req  !== {}) || (req !== ""))
	{
		model.remove(req.query,function(err, count){
    	if(err)
        	res.send({success: false, message:'error en la query'});
        if(!err)
     	   res.send({success: true, message:'se borraron '+count.result.n+' registros'});
    	});
	}
};

//UPDATE
module.exports.updatePersona= function(req, res) {
	var conditions = { nombre: 'Pedro' } , update = { edad:'10'},options = {upsert:true};
	model.update(conditions,update,options,function(e,docs){ 
			  res.send('se modifico correctamente');
})
};

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});