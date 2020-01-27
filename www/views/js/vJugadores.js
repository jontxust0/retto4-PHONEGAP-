
$(document).ready(function(){

	// $.ajax({
    //    	url: "../controller/cMostrarJugadores.php", 
    //    	dataType:"text",
    // 	success: function(respuesta){
    //    		jugadores = JSON.parse(respuesta);
    //    		for (var i = 0; i < jugadores.length; i++) {
	// 			$('#infoJugadores').append('<div class="card" style="width:13rem;">'
	// 			+'<div class="card-body">'
	// 			+'<h1 style="text-align:center;">' + jugadores[i].dorsal + '</h1>' 
	// 			+ '<p class="card-text">' + jugadores[i].posicion + '</p>' 
	// 			+ '<p class="card-text">' + jugadores[i].altura + '</p>'
	// 			+ '</div>'
	// 			+ '</div>');
	// 		}
       		
	// 	},
    //    	error : function(xhr) {
   	// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
   	// 	}
	// });
	
	// $.ajax({
    //    	url: "../controller/cMostrarEntrenadores.php", 
    //    	dataType:"text",
    // 	success: function(respuesta){
    //    		entrenadores = JSON.parse(respuesta);
    //    		for (var i = 0; i < entrenadores.length; i++) {
	// 			$('#infoEntrenadores').append('<div class="card" style="width:13rem;">'
	// 			+'<div class="card-body">'
	// 			+ '<p class="card-text">' + entrenadores[i].tlf + '</p>' 
	// 			+ '<p class="card-text">' + entrenadores[i].fechaContratacion + '</p>'
	// 			+ '</div>'
	// 			+ '</div>');
	// 		}
       		
	// 	},
    //    	error : function(xhr) {
   	// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
   	// 	}
	// });


	$.ajax({
        type: "GET",
        url: "http://192.168.56.1/reto4ClubDeportivo/controller/cMostrarEquipos.php",
        dataType: "json",  //type of the result
    	success: function(result){
			   console.log(result);
			   htmlzatia="";

			   for (let equipo = 0; equipo < result.length; equipo++) {
				   
			
			   htmlzatia+=`
			
			   <div class="infoEquipos">
			   <h1 class="teamName">`+result[equipo].nombre+`</h1>
				<div class="row">
					<div class="infoJugadores col-lg-8">
					<h3 class="nameCat">Jugadores</h3>
					<div class="row card-container">
					`;
					//imprimir cards de jugadores
					for (let jugador = 0; jugador < result[equipo].listJugadores.length; jugador++) {
						htmlzatia+=`<div class="card col-sm-4" style="width: 18rem;" data-toggle="modal" data-target="#exampleModal" data-tipo=1 data-id=`+result[equipo].listJugadores[jugador].id+`>
						<img src="../uploads/`+result[equipo].listJugadores[jugador].objUser.pic+`" class="card-img-top imgJugador" alt="...">
						<div class="card-body">
						  <h5 class="card-title">`+result[equipo].listJugadores[jugador].objUser.name+`, `+result[equipo].listJugadores[jugador].objUser.surname+`</h5>
							<ul>
								<li><b>Posición: </b> `+result[equipo].listJugadores[jugador].posicion+`</li>
								<li><b>Dorsal: </b>`+result[equipo].listJugadores[jugador].dorsal+`</li>
								<li><b>Telefono: </b>`+result[equipo].listJugadores[jugador].tlf+`</li>
								<li><b></b></li>
							</ul>
						</div>
					  </div>`;
						
					}
					
					//---------------------------------------//
					
					htmlzatia+=`  
					</div>
					</div> 
		   		
			
					<div class="cuerpoTecnico col">
					<h3 class="nameCat">Cuerpo tecnico</h3>
						<div class="infoEntrenadores">
						<h4>Entrenadores</h4>

						<div class="row card-container">
					`;
					//Imprimir cards de todos los entrenadores
					for (let entrenador = 0; entrenador < result[equipo].listEntrenadores.length; entrenador++) {
						htmlzatia+=`<div class="card col-md-16" style="width: 18rem;" data-toggle="modal" data-target="#exampleModal" data-tipo=2 data-id=`+result[equipo].listEntrenadores[entrenador].id+`>
						<img src="../uploads/`+result[equipo].listEntrenadores[entrenador].objUser.pic+`" class="card-img-top imgTecnico" alt="..." >
						<div class="card-body">
						  <h5 class="card-title">`+result[equipo].listEntrenadores[entrenador].objUser.name+`, `+result[equipo].listEntrenadores[entrenador].objUser.surname+`</h5>
							<ul>
								<li><b>Sueldo: </b> `+result[equipo].listEntrenadores[entrenador].sueldo+`</li>
								<li><b>Fecha contratacion: </b>`+result[equipo].listEntrenadores[entrenador].fechaContratacion+`</li>
								<li><b>Telefono: </b>`+result[equipo].listEntrenadores[entrenador].tlf+`</li>
								<li><b></b></li>
							</ul>
						</div>
					  </div>`;
						
					}
					//--------------------------------------
					htmlzatia+=`
					</div>
		   				</div>
						<div class="InfoCuerpo ">
						<h4>Cuerpo medico</h4>   

						<div class="row card-container">
					`;
					//imprimir cards de todos los del cuerpo medico
					for (let cuerpo = 0; cuerpo < result[equipo].listCuerpo.length; cuerpo++) {
						htmlzatia+=`<div class="card col-md-16" style="width: 18rem;"data-toggle="modal" data-target="#exampleModal" data-tipo=3 data-id=`+result[equipo].listCuerpo[cuerpo].id+`>
						<img src="../uploads/`+result[equipo].listCuerpo[cuerpo].objUser.pic+`" class="card-img-top imgTecnico" alt="..." >
						<div class="card-body">
						  <h5 class="card-title">`+result[equipo].listCuerpo[cuerpo].objUser.name+`, `+result[equipo].listCuerpo[cuerpo].objUser.surname+`</h5>
							<ul>
								<li><b>Funcion: </b> `+result[equipo].listCuerpo[cuerpo].funcion+`</li>
								<li><b>Telefono: </b>`+result[equipo].listCuerpo[cuerpo].tlf+`</li>
								<li><b></b></li>
							</ul>
						</div>
					  </div>`;
						
					}
					//----------------------------------------
					htmlzatia+=`
					</div>
					</div>
		   </div>
		 </div>`;
		}
		$("#infoContainer").html(htmlzatia);


//enseñar el modal-----------------------------------------
		$(".card").on("click", function(){
			var tipo=$(this).data("tipo");
			var id=$(this).data("id");
			//si el tipo es 1 entonces es jugador
			//si el tipo es 2 entonces es entrenador
			//si el tipo es 3 entonces es el cuerpo medico
			$.ajax({
				type: "GET",
				url: "http://192.168.56.1/reto4ClubDeportivo/controller/cMostrarDatos.php",
				dataType: "json",  //type of the result
				data: { "id": id, "tipo":tipo},
				success: function(result){
					console.log(result);
				var modalhtml="";
				$("#exampleModal").find(".modal-title").html(result.objUser.name+", "+result.objUser.surname);
				modalhtml+="<img src="+result.objUser.pic+">";
				if (tipo==1){
				
				modalhtml+=`
				
					<ul>
						<li>Dorsal: `+result.dorsal+`</li>
						<li>Altura: `+result.altura+`</li>
						<li>Posicion: `+result.altura+`</li>
						<li>Telefono: `+result.tlf+`</li>
						<li>Email: `+result.objUser.email+`</li>
						<li>Dirección: `+result.direccion+`</li>
					</ul>

				`;
				}
				else if (tipo==2){
					modalhtml+=`
				
					<ul>
						<li>Fecha de contratacion: `+result.fechaContratacion+`</li>
						<li>Telefono: `+result.tlf+`</li>
						<li>Email: `+result.objUser.email+`</li>
						<li>Dirección: `+result.direccion+`</li>
					</ul>

				`;

				}
				else if (tipo==3){
					modalhtml+=`
				
					<ul>
						<li>Fecha de contratacion: `+result.funcion+`</li>
						<li>Telefono: `+result.tlf+`</li>
						<li>Email: `+result.objUser.email+`</li>
						<li>Dirección: `+result.direccion+`</li>
					</ul>

				`;
				}
				$("#exampleModal").find(".modal-body").html(modalhtml);

				
			},
			error : function(xhr) {
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			}
			});
		});
		
	},
       	error : function(xhr) {
   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
   		}
	});

	//-------------------------------------------


	
});