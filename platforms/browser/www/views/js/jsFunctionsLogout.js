
$(document).ready(function(){
	
	newRow="";
	newRow+="<p>No has iniciado sesion O User or Password incorrect</p>";
	newRow+="<p><button id='indexera'>Back</button></p>";
	
	$("body").append(newRow);
	
		

	$('body').on('click', '#indexera', function(){
		
		window.location.href="../index.html";	
	});
  });
	
	
	
	
