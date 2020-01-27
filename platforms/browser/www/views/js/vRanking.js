$(document).ready(function(){
    
    $.ajax({
        type:"GET",
        url: "http://tres.fpz1920.com/controller/cMostrarSoloCategorias.php", 
        dataType:"json",
        success: function(result){ 
            htmlzatia="";
            for (let index = 0; index < result.length; index++) {
                htmlzatia+="<option value='"+result[index].id+"'>"+result[index].nombre+"</option>"
                
            }
            $("#categoriaSelect").html(htmlzatia);
            console.log(result);
        },
           error : function(xhr) {
               alert("An error occured: " + xhr.status + " " + xhr.statusText);
           }
    });

    $("#categoriaSelect").change(function(){
        console.log($(this).val());
        idCat= $(this).val();
        $.ajax({
            type:"GET",
            url: "http://tres.fpz1920.com/controller/cMostrarRanking.php",
            data:{'idCat':idCat}, 
            dataType:"json",
            success: function(result){ 
            console.log(result);
            htmlzatia='<table class="rankingTable">';

            htmlzatia+=`
            <thead>
                <th>Votos</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Altura</th>
                <th>Dorsal</th>
                <th>Posicion</th>

            </thead>
            `;


            for (let index = 0; index < result.length; index++) {
                htmlzatia+="<tr>";
                htmlzatia+="<td>"+result[index].votos+"</td>";
                htmlzatia+="<td>"+result[index].objUser.name+"</td>";
                htmlzatia+="<td>"+result[index].objUser.surname+"</td>";
                htmlzatia+="<td>"+result[index].altura+"</td>";
                htmlzatia+="<td>"+result[index].dorsal+"</td>";
                htmlzatia+="<td>"+result[index].posicion+"</td>";
                htmlzatia+="</tr>";
            }
            htmlzatia+="</table>";
            
            $("#ranking").hide();
            $("#ranking").html(htmlzatia);
            $("#ranking").slideToggle();
            
            
            },
               error : function(xhr) {
                   alert("An error occured: " + xhr.status + " " + xhr.statusText);
               }
        });
    });
    $.ajax({
			
        url: "http://tres.fpz1920.com/controller/cSessionVerVars.php", 
        dataType:"json",
        
     success: function(result){  

         console.log(result);
         
         if (result !=0){
             
             newRow="";
             newRow+="<p>Has iniciado sesion: " + result.name 
             + " y eres admin(SI/NO) : " + result.admin+"</p>";
             
             newRow+="<p><button id='itxi'>Session close</button></p>";
             $("body").append(newRow);
         
         } else {
             $("body").append("No has iniciado session");
             
         }
     },
        error : function(xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        }
 });
 
    $("#iniciar").click(function(){
        var name=$("#name").val();
	    var password=$("#password").val();
			
			$.ajax({
				type:"GET",
				data:{'name':name,'password':password},
		       	url: "http://tres.fpz1920.com/controller/cSessionVars.php", 
		       	dataType:"text",
		    	success: function(result){ 
		    		
		    		console.log(result);
		    		
		       		if (result !=0)
		       		{
		       			alert("Sesion iniciada")
		       			
		       			newRow="";
		       			
		    			newRow+="<button id='btnPerfil' class='btn btn-login btn-outline-light my-2 my-sm-0 '>"+result+"</button>";
		    			$("#btnUsuario").html(newRow);
		    			
		    			votarRow="";
		       			
		    			votarRow+="<button id='btnVotarMVP' class='btn btn-login btn-outline-light my-2 my-sm-0'>Votar</button>";
		    			$("#btnVotar").append(votarRow);
		       						
                        $.ajax({
                            type:"GET",
                            url: "http://tres.fpz1920.com/controller/cVotar.php", 
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
                            
                            $("#votar").html(htmlzatia);
                         
                            
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
                                       url: "http://tres.fpz1920.com/controller/cInsertVotos.php", 
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
                                alert("ERRORRRRR: " + xhr.status + " " + xhr.statusText);
                            }
                     });   
                           
                           
		       			
		       		} else {
		       			alert("Usuario o contraseña incorrectas");
                        
		       		}	
				},
		       	error : function(xhr) {
		   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
		   		}
            });
        });
            
    
    
    

});