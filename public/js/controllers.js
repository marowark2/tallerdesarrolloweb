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

app.controller("deleteController",["$attrs","$http",function(a,h){
	
   }
  ]);

function eliminarPersona(){
	var nombre 		= $("#idNombre").value();
	var apellido 	= $("#idApellido").value();
	var edad 		= $("#idEdad").value();
}