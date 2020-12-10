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


//function get_tracking_data(){
//    console.log(Date.now());
//    var epoch_ago = Date.now() - 7 * 24 * 60 * 60 * 1000; 
//    var date = new Date(millis);
//    console.log(date);
//}
async function date_to_period(date_list_working){
    let date_list_out=[]
    for (i = 0; i < date_list_working.length; i++) {
        date_cur=date_list_working[i];
        //console.log(date_cur);
        date_cur = date_cur.replace(/,/g, '-');
        date_list_out.push(date_cur);
    }
    //console.log(date_list_out);
    return date_list_out;
}

async function get_tracking_data(){
    admin_key= await localStorage.getItem("admin_key");
    console.log("The retrieved key is:",admin_key);
    fetch('https://vidext-c1d58.firebaseapp.com/api/v1/admintrack',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"admin_key": admin_key})
    })
    .then(function(response) {
        //If the admin key is not provided will get a 401 response
        if(response.status==401){
            console.log("No admin key");
        }
        else{
            //If the admin track data is returned succesfully
            response.json().then(async function(response) {
                //console.log(response);
                
                let date_list_in=await date_to_period(response.data.date_list);
                let bo_track_in= response.data.bo_track_pack;
                let donation_track_in=response.data.donation_track_pack;
                let badges_track_in=response.data.badge_track_pack;
                set_tracking_chart(date_list_in,bo_track_in,donation_track_in,badges_track_in);
            });
        }
        
    // Do stuff with the response
    })
    .catch(function(error) {
        console.log('Looks like there was a problem with your admin key: \n', error);
    });
}

async function set_tracking_chart(date_list,bo_track,donations_track,badges_track){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: date_list.reverse(),
          datasets: [{ 
              data: bo_track.reverse(),
              label: "Box Office",
              borderColor: "#FF5F6D",
              fill: false
            }, { 
              data: donations_track.reverse(),
              label: "Donations",
              borderColor: "#5433FF",
              fill: false
            }, { 
              data: badges_track.reverse(),
              label: "Badges",
              borderColor: "#AB82F1",
              fill: false
            }
          ]
        },
        options: {
            legend: {
                position: 'top',
                labels: {
                  fontColor: 'white'
                },
                onHover: function(event, legendItem) {
                  document.getElementById("canvas").style.cursor = 'pointer';
                },
                onClick: function(e, legendItem) {
                  var index = legendItem.datasetIndex;
                  var ci = this.chart;
                  var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;
        
                  ci.data.datasets.forEach(function(e, i) {
                    var meta = ci.getDatasetMeta(i);
        
                    if (i !== index) {
                      if (!alreadyHidden) {
                        meta.hidden = meta.hidden === null ? !meta.hidden : null;
                      } else if (meta.hidden === null) {
                        meta.hidden = true;
                      }
                    } else if (i === index) {
                      meta.hidden = null;
                    }
                  });
        
                  ci.update();
                },
              }
        }
      });
}

set_tracking_chart();
get_tracking_data();