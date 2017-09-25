
function displayUserTypeList() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  createUserTable(empData);
			document.getElementById("displayList").innerHTML = tbody;
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/usertype/list", true);
	xhttp.send();

}

function addUserType() {
	
	var http = new XMLHttpRequest();
	var employee = getUserTypeFromUI(data);
	
	//validate
	
	//if(validateEmployee(employee)){
		var myJSON = JSON.stringify(employee);
		console.log(employee);
		http.open("POST", "http://localhost:8085/HRMS/usertype/create", true);
	
		http.setRequestHeader("Content-Type", "application/json; charset=utf8");
		http.onreadystatechange = function() {// Call a function when the state
												// changes.
			if (http.readyState == 4 && http.status == 200) {
				alert(this.responseText);
				
			}
		}
	
		http.send(myJSON);
	//}
}
function deleteUserType(id) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			alert("User Type Deleted Successfully");
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/usertype/delete/"
			+ id, true);
	xhttp.send();

}
function getUserTypeFromUI(){
	var url = "http://localhost:8085/HRMS/employee/create";
	var usertypeName = document.getElementsByName("usertypeName")[0].value;
	var description = document.getElementsByName("description")[0].value;
	

	var data = {
			usertypeName : usertypeName,
			description : description,
		
	}
	 return data
}

function createUserTable(empData){
	var tbody = "";

	for ( var data in empData) {
		tbody += "<tr>"
		var id = empData[data].id;
		/*tbody += "<td>" + id + "</td>"*/
		var usertypeName = empData[data].usertypeName;
		tbody += "<td>" + usertypeName + "</td>"
		/*var password = empData[data].password;
		tbody += "<td>" + password + "</td>"*/
		var description = empData[data].description;
		tbody += "<td>" + description + "</td>"
		
		tbody += "<td>" + "<button  value='Delete' onclick='deleteUserType (" +id+ ")' >Delete</button>"
				+ "</td>";
		tbody += "<td>" + "<button  value='Edit' onclick='editEmployee("+ empData[data]+")' >Edit</button>"
		+ "</td>";
		tbody += "<tr>";

	}
	tbody += "</table>";
		return tbody
}
