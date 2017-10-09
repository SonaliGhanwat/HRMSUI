
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
	var userType = getUserTypeFromUI(data);
	if(validateUserType(userType)){
		var myJSON = JSON.stringify(userType);
		console.log(userType);
		http.open("POST", "http://localhost:8085/HRMS/usertype/create", true);
	
		http.setRequestHeader("Content-Type", "application/json; charset=utf8");
		http.onreadystatechange = function() {// Call a function when the state
												// changes.
			if (http.readyState == 4 && http.status == 200) {
				alert(this.responseText);
				
			}
		}
	
		http.send(myJSON);
	}
}
function deleteUserType(id) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			alert("User Type Deleted Successfully");
			displayUserTypeList();
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/usertype/delete/"
			+ id, true);
	xhttp.send();

}
function editUserType(id) {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		//isEdit = true;
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//updatedisplayTable(empData);
			var employeeData = {
					id:empData.id,
					usertypeName : empData.usertypeName,
					description : empData.description,
			};
			
			sessionStorage.setItem("flag", 1)
			sessionStorage.setItem("id", empData.id)
			sessionStorage.setItem("usertypeName", empData.usertypeName)
			sessionStorage.setItem("description", empData.description);
			
			window.location="CreateUserType.html";
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/usertype/"+id, true);
	xhttp.send();
}
function updateUserType(){
	var http = new XMLHttpRequest();
	var userType = getUserTypeFromUI(data);
	
	if(validateUserType(userType)){
		
	var myJSON = JSON.stringify(userType);
	console.log(myJSON);
	
	http.open("PUT", "http://localhost:8085/HRMS/usertype/update", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			alert(this.responseText);
			window.location="CreateUserType.html";
			sessionStorage.clear();
		}
	
	}
	http.send(myJSON);
}
}
function addOrUpdateUserType(){
	var flag= sessionStorage.getItem("flag");
	if(flag==null){
		addUserType();
	}else if(flag==1){
		updateUserType();
	}else{
		
	}
}
function getUserTypeIdFromHtml(){
	document.getElementById("data").value = sessionStorage.getItem("id");
	document.getElementById("usertypeName").value = sessionStorage.getItem("usertypeName");
	document.getElementById("description").value = sessionStorage.getItem("description");
	
}
function getUserTypeFromUI(data){
	//var url = "http://localhost:8085/HRMS/employee/create";
	var id=sessionStorage.getItem("id");
	var usertypeName = document.getElementsByName("usertypeName")[0].value;
	var description = document.getElementsByName("description")[0].value;
	

	var data = {
			id:id,
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
		tbody += "<td>" + "<button  value='Edit' onclick='editUserType(" +id+ ")' >Edit</button>"
		+ "</td>";
		tbody += "<tr>";

	}
	tbody += "</table>";
		return tbody
}
