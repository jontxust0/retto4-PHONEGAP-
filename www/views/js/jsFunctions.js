
$(document).ready(function(){
	$.ajax({
		type:"GET",
       	url: "http://tres.fpz1920.com/controller/cValidarSesion.php", 
       	dataType:"text",
    	success: function(result){ 
    		
    		console.log(result);
    		
       		if (result !=0)
       		{
       			
       			
       			newRow="";
       			
    			newRow+="<button id='btnPerfil' class='btn btn-login btn-outline-light my-2 my-sm-0'>"+result+"</button>";
    			$("#btnUsuario").append(newRow);
    			
    			votarRow="";
       			
    			votarRow+="<button id='btnVotarMVP' class='btn btn-login btn-outline-light my-2 my-sm-0'>Votar</button>";
    			$("#btnVotar").append(votarRow);
    			
    			$("#btnLogin").css("display", "none");
       			$("#btnLogout").css("display", "block");
       			
       			
       		} else {
       			
       		
       		}	
		},
       	error : function(xhr) {
   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
   		}
	});


	$("#login").click(function(){	
		
		
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
		       						
		       			window.location.reload();
		       			
		       		} else {
		       			alert("Usuario o contraseña incorrectas");
		       		
		       		}	
				},
		       	error : function(xhr) {
		   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
		   		}
			});

	});
	$("#btnLogout").click(function(){	
		
		
		$.ajax({
	       	url: "http://tres.fpz1920.com/controller/controller/cSessionLogout.php", 
	       	dataType:"text",
	    	success: function(result){  
	       		
	    		console.log(result);
	    		alert("Sesion cerrada")
	    		window.location.reload();
			},
	       	error : function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   		}
		});

	});
	
	$('#register').on('click',function(){
		
		var username=$('#username').val();
		var password=$('#newPassword').val();
		var name=$('#newName').val();
		var surname=$('#surname').val();
		var email=$('#email').val();
		var admin=$('#admin').val();
		
		
		$.ajax({
			type:"POST",
			data:{'username':username, 'password':password,'name':name,'surname':surname,'email':email,'admin':admin},
	       	url: "http://tres.fpz1920.com/controller/cInsertNewUser.php", 
	       	dataType:"json",
	       	
	    	success: function(result){  
	
	    		console.log(result);
	    		alert("USER :"+username+"PASS :"+password+"ADMIN :"+admin+"name :"+name+"surname :"+surname+"email :"+email);
	    		alert("number of inserted :"+result);
	    		//window.location.href="../index.html";
			},
	       	error : function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   		}
		});
	});
	
	
	$('#btnUsuario').on('click', '#btnPerfil', function(){	
		
		window.location.href="views/vPerfil.html";
		

	});
	
	$('#btnVotar').on('click', '#btnVotarMVP', function(){	
		
		window.location.href="views/vVotacion.html";
		

	});
	
	

});