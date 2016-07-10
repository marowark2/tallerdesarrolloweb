var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
	  .when("/",{
	      templateUrl: "templates/main.html",
	  })
	  .when("/index",{
	  		templateUrl: "templates/main.html",
	  })
	  .when("/update",{
	  	 	templateUrl: "templates/update.html",
	      	controller: "updateController"
	  })
	  .when("/delete",{
	  		templateUrl: "templates/delete.html",
	     	controller: "deleteController"
	  })
	  .when("/insert",{
	  		templateUrl: "templates/insert.html",
	     	controller: "insertController"
	  })
	  .when("/search",{
	  		templateUrl: "templates/search.html",
	     	controller: "searchController"
	  })
	  .otherwise({ redirectTo : "/"});
});

app.controller("initController",["$scope",function (m){
	 m.items = [{
	 	 display: "Inicio",
	 	 link:"index"
	  },{
		 display: "Eliminar Persona",
		 link:"delete"
	  },{
		 display: "Agregar Persona",
		 link:"insert"
	  },{
		 display: "Modificar Persona",
		 link:"update"
	  },{
		 display: "Buscar Persona",
		 link:"search"
		}
	  ];
 }]);

app.controller("allPersonasController",["$scope","$http",function(s,h){
	h.get("http://localhost:3000/index")
	.success(function(data){
		s.personas = data;
	})
	.error(function(err){
		console.log("hubo error al pedir los datos");
		console.log(err);
	});
   }
  ]);

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