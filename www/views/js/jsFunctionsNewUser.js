
$(document).ready(function(){
	
	
	
	$('#saveUser').on('click',function(){
		
		var username=$('#username').val();
		var password=$('#password').val();
		var admin=$('#admin').val();
		
		
		$.ajax({
			type:"POST",
			data:{'username':username, 'password':password,'admin':admin},
	       	url: "http://192.168.56.1/reto4ClubDeportivo/controller/cInsertNewUser.php", 
	       	dataType:"json",
	       	
	    	success: function(result){  
	
	    		console.log(result);
	    		alert("USER :"+username+"PASS :"+password+"ADMIN :"+admin);
	    		alert("number of inserted :"+result);
	    		//window.location.href="../index.html";
			},
	       	error : function(xhr) {
	   			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	   		}
		});
	});
});
	
	
	
	
