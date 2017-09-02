function addEmployee() {
	
	validate();
	var http = new XMLHttpRequest();
	
	var url = "http://localhost:8085/HRMS/employee/create";
	var userid = document.getElementsByName("userid")[0].value;
	var password = document.getElementsByName("password")[0].value;
	var firstName = document.getElementsByName("firstName")[0].value;
	var lastName = document.getElementsByName("lastName")[0].value;
	var phoneNumber = document.getElementsByName("phoneNumber")[0].value;
	var emailid = document.getElementsByName("emailid")[0].value;
	var dateOfJoining = document.getElementsByName("dateOfJoining")[0].value;
	var dateOfBirth = document.getElementsByName("dateOfBirth")[0].value;
	var address = document.getElementsByName("address")[0].value;
	var department = document.getElementsByName("department")[0].value;
	var salary = document.getElementsByName("salary")[0].value;
	//var usertype = document.getElementsByName("usertype")[0].value;
	 
	 var data ={
			userid:userid,
			password:password,
			firstName:firstName,
			lastName:lastName,
			phoneNumber:phoneNumber,
			emailid:emailid,
			dateOfJoining:dateOfJoining,
			dateOfBirth:dateOfBirth,
			address:address,
			department:department,
			salary:salary,
			usertype:2
			}
	 
	var myJSON = JSON.stringify(data);
	console.log(myJSON);
	
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	    	 //document.getElementById("data").innerHTML = this.responseText;
	        alert(http.responseText);
	    }
	}
	
	http.send(myJSON);
	
}