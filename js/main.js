function login(){
	var user_name=document.getElementById('uname').value;
	var pass_word=document.getElementById('psw').value;
	if ((user_name != "") & (pass_word !="")){
		//If we are ready to send data to the DB then start the loading gif

		//Send data of new user to the DB
		fetch('https://vidext-c1d58.firebaseapp.com/api/v1/adminlogin',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"user_name": user_name, "password": pass_word})
		})
		.then(function(response) {
			//If the username is taken we will get a 401 response
			if(response.status==500){
				console.log("Wrong username or password");
			}
			else{
				//If the account creation is succesfull then save the user info and set the page to the authed
				response.json().then(function(response) {
                    console.log(response);
                    console.log("The admin key is",response.data.admin_key);
                    // Store
                    localStorage.setItem("admin_key", response.data.admin_key);
					window.location.href="adminauthed.html";
				});
			}
			
	    // Do stuff with the response
		})
		.catch(function(error) {
			console.log('Looks like there was a problem loging in: \n', error);
		});

	}
	else{
		console.log("Emtpy user name and password");
		
	}
}
document.getElementById("submit_login").addEventListener("click",login);