var admin_key="";
async function get_data_db(){
        admin_key= await localStorage.getItem("admin_key");
        console.log("The retrieved key is:",admin_key);
		fetch('https://vidext-c1d58.firebaseapp.com/api/v1/admingetdata',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"admin_key": admin_key})
		})
		.then(function(response) {
			//If the username is taken we will get a 401 response
			if(response.status==401){
				console.log("No admin key");
			}
			else{
				//If the account creation is succesfull then save the user info and set the page to the authed
				response.json().then(function(response) {
                    console.log(response);
                    document.getElementById("don_count").innerHTML=("donation_total: $"+response.don_total.toLocaleString())
                    document.getElementById("meal_count").innerHTML=("meal_count:  "+response.meal_count.toLocaleString())
                });
			}
			
	    // Do stuff with the response
		})
		.catch(function(error) {
			console.log('Looks like there was a problem with your admin key: \n', error);
		});
}
async function submit_don_total(){
    console.log("The retrieved key is:",admin_key);
    fetch('https://vidext-c1d58.firebaseapp.com/api/v1/submitdontotal',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"admin_key": admin_key, "comp_total":parseInt(document.getElementById('don_in').value)})
    })
    .then(function(response) {
        //If the username is taken we will get a 401 response
        if(response.status==401){
            console.log("No admin key");
        }
        else{
            //If the account creation is succesfull then save the user info and set the page to the authed
            response.json().then(function(response) {
                console.log(response);
                document.getElementById("don_count").innerHTML=("donation_total: $"+response.don_total.toLocaleString());
            });
        }
        
    // Do stuff with the response
    })
    .catch(function(error) {
        console.log('Looks like there was a problem with your admin key: \n', error);
    });
}

async function submit_meal_count(){
    console.log("The retrieved key is:",admin_key);
    fetch('https://vidext-c1d58.firebaseapp.com/api/v1/submitmealcount',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"admin_key": admin_key, "meal_count":parseInt(document.getElementById('meal_in').value)})
    })
    .then(function(response) {
        //If the username is taken we will get a 401 response
        if(response.status==401){
            console.log("No admin key");
        }
        else{
            //If the account creation is succesfull then save the user info and set the page to the authed
            response.json().then(function(response) {
                console.log(response);
                document.getElementById("meal_count").innerHTML=("meal_count:  "+response.meal_count.toLocaleString())
            });
        }
        
    // Do stuff with the response
    })
    .catch(function(error) {
        console.log('Looks like there was a problem with your admin key: \n', error);
    });
}

async function submit_user_name(){
    console.log("The retrieved key is:",admin_key);
    fetch('https://vidext-c1d58.firebaseapp.com/api/v1/adminusername',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"admin_key": admin_key, "user_name":document.getElementById('user_in').value})
    })
    .then(function(response) {
        console.log(response);
        //If the username is taken we will get a 401 response
        if(response.status==402){
            console.log("No user found with that id");
        }
        else{
            //If the account creation is succesfull then save the user info and set the page to the authed
            response.json().then(function(response) {
                for (var key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        var node = document.createElement("LI");
                        var textnode = document.createTextNode(key + ": " + response.data[key]);
                        node.appendChild(textnode);
                        document.getElementById("myList").appendChild(node);
                    }
                }
                //console.log(response.data[0]);
            });
        }
        
    // Do stuff with the response
    })
    .catch(function(error) {
        console.log('Looks like there was a problem with your admin key: \n', error);
    });
}

document.getElementById("submit_don_total").addEventListener("click",submit_don_total);
document.getElementById("submit_meal_count").addEventListener("click",submit_meal_count);
document.getElementById("submit_user_name").addEventListener("click",submit_user_name);

get_data_db();

