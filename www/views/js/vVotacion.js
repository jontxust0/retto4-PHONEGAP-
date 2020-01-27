
$(document).ready(function(){
 $.ajax({
            type:"GET",
        	url: "http://192.168.56.1/reto4ClubDeportivo/controller/cVotar.php", 
        	dataType:"json",
     	success: function(result){
        		console.log(result)
			htmlzatia="";
			if (result.length!=0){
			for (let categoria = 0; categoria < result.length; categoria++) {
			
				htmlzatia+=`
				<div class=deshacer></div>
				<div class="categoria">
			
				<h3><b>`+result[categoria].nombre+`</b></h3>
				`;
			for (let equipo = 0; equipo < result[categoria].listEquipos.length; equipo++) {
				if(result[categoria].listEquipos[equipo].femenino_masculino=="F"){
				htmlzatia+="<h4>"+result[categoria].listEquipos[equipo].nombre+" Femenino</h4>";
				}
				else{
					htmlzatia+="<h4>"+result[categoria].listEquipos[equipo].nombre+" Masculino</h4>";	
				}
				htmlzatia+="<div class='equipos'>";
				for (let jugador = 0; jugador < result[categoria].listEquipos[equipo].listJugadores.length; jugador++) {
					htmlzatia+=`
					<div class="card w-100">
					<img src="../uploads/`+result[categoria].listEquipos[equipo].listJugadores[jugador].objUser.pic+`">
				  <div class="card-body">
				    <h5 class="card-title">`+result[categoria].listEquipos[equipo].listJugadores[jugador].objUser.name+` `+result[categoria].listEquipos[equipo].listJugadores[jugador].objUser.surname +`</h5>
				    <p class="card-text">`+result[categoria].listEquipos[equipo].listJugadores[jugador].posicion+`</p>
				    <input type="button" class="btn btn-success buttonVote" value="Votar" data-jugadores=`+result[categoria].listEquipos[equipo].listJugadores[jugador].id+` data-categoria=`+result[categoria].id+`>
				  </div>
				</div>
					
					`;
					
				}
				htmlzatia+="</div>";
			}
			
			
			htmlzatia+="</div>";
			
				
			}
			htmlzatia+='<button type="button" class="btn btn-info" id="enviar">enviar votos</button>';
		}
		else{
			htmlzatia+="<div class='vacio'><h1>Oh oh... Parece que algo va mal!</h1> <p><h3>Parece que ya ha votado todas las categorias posibles :( le agradecemos su colaboración!</h3></p></div>";
		}
			
			$(".container").html(htmlzatia);
		 
			
			$(".buttonVote").on("click", function () {
				idJugadores=$(this).data("jugadores");
				idCategoria=$(this).data("categoria");
				// arrCategorias.push($(this).data("categoria")); 
				// console.log(arrJugadores);
				// console.log(arrCategorias);
				$(this).parent().parent().parent().parent().slideUp();

				//guardar en cada deshacer las id (en el alert) y luego recorrerlos al votar 

				deshacer=`
				<div class="alert alert-danger deshacerAlert" role="alert" data-jugadores=`+idJugadores+` data-categoria=`+idCategoria+`>
 				 Haz click <span class="volver">aquí</span> para deshacer el voto 
				</div>
				`;
				console.log($(this).parent().parent().parent().parent().prev());
				$(this).parent().parent().parent().parent().prev().html(deshacer);
				$(".volver").on("click", function () {
					$(this).parent().parent().next().slideDown();
					//console.log($(this).parent().parent().next());
					//la razón por la que esto borra directamente el div es porque si lo ocultas los datos del div siguen existiendo y se enviaran despues
					$(this).parent().remove();
					
					
				});
			});
			$("#enviar").on("click", function(){
				arrCategorias=[];
				arrJugadores=[];
				//rellena los arrays dependiendo de los datos de los alerts (esto es una especie de for)
				$(".deshacerAlert").each(function(index){
					arrCategorias.push($(this).data("categoria"));
					arrJugadores.push($(this).data("jugadores"));
				});

				console.log(arrCategorias);
				console.log(arrJugadores);

				//aquí enviaría la info
				$.ajax({
					type:"GET",
					data:{'arrCategorias':JSON.stringify(arrCategorias),'arrJugadores':JSON.stringify(arrJugadores)},
					   url: "http://192.168.56.1/reto4ClubDeportivo/controller/cInsertVotos.php", 
					   dataType:"text",
					success: function(result){ 
						console.log(result);
						if (result=="si"){
							window.location.href="../index.html";
						}
						else{
							alert("vota al menos a un jugador!");
						}
					},
					   error : function(xhr) {
						
					   }
				});
	
		});
				//---------------

		

			
			
	 	},
        	error : function(xhr) {
   	 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
   	 	}
	 });
})
/* <div class="card w-100">
				<img src="">
				  <div class="card-body">
				    <h5 class="card-title">Card title</h5>
				    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
				    <input type="button" class="btn btn-success" value="Votar">
				  </div>
				</div> */