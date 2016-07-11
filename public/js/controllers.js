var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
	  .when("/",{
	      templateUrl: "templates/main.html",
	  })
	  .when("/index",{
	  		templateUrl: "templates/main.html",
	  })
	 .when("/insert",{
	  		templateUrl: "templates/insert.html",
	     	controller: "insertController"
	  })
	  .otherwise({ redirectTo : "/"});
});

app.controller("initController",["$scope",function (m){
	m.items = [{
 		display: "Inicio",
 		link:"index"},
	{
		display: "Agregar Persona",
		link:"insert"}
	];
 }]);

app.controller("allPersonasController",["$scope","$http","$route",function(s,h,r){
	var arrValores = [];

	h.get("http://localhost:3000/index")
	.success(function(data){
		s.personas = data;
	})
	.error(function(err){
		console.log("hubo error al pedir los datos");
		console.log(err);
	});

	s.eliminarPersona = function(item){
		var query = "_id="+item._id;
		var url = "http://localhost:3000/delete?"+query;

		h.post(url)
		.success(function(data,status,headers,config){
			alert("se borro correctamente!");
			r.reload();
		})
		.error(function(err){
			console.log(err);
		});
	}

	s.estadoViejo = function(id){
		arrValores = []; // reseteo el arreglo
		$("#"+id).each(function( i ) {
  	   	 	$("td", this).each(function( j ) {
      	  		arrValores.push($(this).text().trim());
  		 	});
		});
	}

	s.modificarPersona = function(id)
	{
		var arrNuevosValores = [];
		var arrQuery = [];
		
		$("#"+id).each(function( i ) {
  	   	 	$("td", this).each(function( j ) {
      	  		arrNuevosValores.push($(this).text().trim());
  		 	});
		});
		// me fijo que valor cambio de los 3 que me importan
		// se puede mejorar dado que NUNCA hay mas de 1 cambio por edicion
		// con solo detectar 1 cambio, ya el resto no vale la pena seguir 
		// controlando, pero bueno , anda
		if (arrValores[0] !== arrNuevosValores[0])
			arrQuery.push("nombre="+arrNuevosValores[0]);

		if (arrValores[1] !== arrNuevosValores[1])
			arrQuery.push("apellido="+arrNuevosValores[1]);

		if (arrValores[2] !== arrNuevosValores[2])
			arrQuery.push("edad="+arrNuevosValores[2]);

		var queryAux ="";
		
		arrQuery.forEach(function(entry) {
    			queryAux += entry.trim()+"&";
		});

		if (queryAux !== "")
		{		
				var queryResult = queryAux.substr(0,queryAux.length-1);
				var url = "http://localhost:3000/update?_id="+id+"&"+queryResult;
				h.post(url)
				.success(function(msj){
					console.log("modificado correctamente");
				})
				.error(function(msj){
					console.log("hubo error al modificar");
				});
		}
	}
  }]);

app.controller("insertController", ["$scope","$http","$window","$location",function(s,h,w,l){
	s.insertarPersona = function(){
		var nombre = $("#idNombre").val();
		var apellido = $("#idApellido").val();
		var edad = $("#idEdad").val();
		var query = "";
		if (nombre === ""){
			alert("insertar nombre");
			return false;
		}
		if (apellido === ""){
			alert("insertar Apellido");
			return false;
		}
		if (edad === ""){
			alert("insertar Edad");
			return false;
		}

		query += "nombre="+nombre;
		query += "&apellido="+apellido;
		query += "&edad="+edad;

		var url = "http://localhost:3000/insert?"+query;
		h.post(url).success(function(data,status,headers,config){
			//l.path('/index');  //si se quiere se vuelve a la pagina principal , o no
			alert("Se inserto correctamente");
		})
		.error(function(err){
			alert(err);
		});
	}

}]);
/*
app.controller("deleteController",["$scope","$http","$window","$location",function(s,h,w,l){
 s.eliminarPersona = function(){
	var nombre 		= $("#idNombre").val();
	var apellido 	= $("#idApellido").val();
	var edad 		= $("#idEdad").val();
	var query = "";

	if ((nombre !== "") && (nombre !== null))
		query = query + "nombre="+nombre;

	if ((apellido !== "") && (apellido !== null))
		query = query + "&apellido="+apellido;

	if ((edad !== "") && (edad !== null) && (!isNaN (edad)))
		query = query + "&edad="+edad;

	if ((query === null) || (query === ""))
		alert("tiene que elegir algun campo!")
	else 
	{	var url = "http://localhost:3000/delete?"+query;
		h.post(url)
		.success(function(data,status,headers,config){
			//l.path('/index');  si se quiere se vuelve a la pagina principal , o no
			alert("se borro correctamente!");
		})
		.error(function(err){
			console.log(err);
		});
	}
	}
   }
  ]);
  */