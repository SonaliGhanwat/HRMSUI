var listEmployeeTypeData = "";
var getUIEmployeeTypeData = "";
function displayEmployeeTypeList() {
	document.getElementById('results').innerHTML = '';
	openModal();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  createEmployeeTypeTable(empData);
			document.getElementById("displayList").innerHTML = tbody;
			closeModal();
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeetype/list", true);
	xhttp.send();

}

function addEmployeeType() {
	
	var http = new XMLHttpRequest();
	var employeeType = getEmployeeTypeFromUI(data);
	if(validateEmployeeType(employeeType)){
		document.getElementById('results').innerHTML = '';
		openModal();
		var myJSON = JSON.stringify(employeeType);
		http.open("POST", "http://localhost:8085/HRMS/employeetype/create", true);
		http.setRequestHeader("Content-Type", "application/json; charset=utf8");
		http.onreadystatechange = function() {// Call a function when the state
			closeModal();				// changes.
			if (http.readyState == 4 && http.status == 200) {
				var json = eval("(" + this.responseText + ")");
				var data = json.message;
				var code = json.code;
				if(code===1){
					document.getElementById("response").innerHTML = data;
				}else if(code===0){
					document.getElementById("response").innerHTML = data;
					getDataHtmlField();
				}
				
				
				
			}
		}
	
		http.send(myJSON);
	}
}
function deleteEmployeeType(id) {
	document.getElementById('results').innerHTML = '';
	openModal();
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			closeModal();
			displayEmployeeTypeList();
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/employeetype/delete/"
			+ id, true);
	xhttp.send();

}
function editEmployeeType(id) {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		//isEdit = true;
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//updatedisplayTable(empData);
			var employeeData = {
					id:empData.id,
					type : empData.type,
					noOfLeves : empData.noOfLeves,
			};
			
			sessionStorage.setItem("flag", 1)
			sessionStorage.setItem("id", empData.id)
			sessionStorage.setItem("type", empData.type)
			sessionStorage.setItem("noOfLeves", empData.noOfLeves);
			
			window.location="CreateEmployeeType.html";
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/employeetype/"+id, true);
	xhttp.send();
}
function updateEmployeeType(){
	var http = new XMLHttpRequest();
	var employeeType = getEmployeeTypeFromUI(data);
	
	//if(validateUserType(userType)){
		document.getElementById('results').innerHTML = '';
		openModal();
	var myJSON = JSON.stringify(employeeType);
	console.log(myJSON);
	closeModal();
	getEmployeeTypeFromUI();
	getSessionData();
	if(JSON.stringify(listEmployeeTypeData) === JSON.stringify(getUIEmployeeTypeData) ){
		document.getElementById("response").innerHTML ="Please Do Some Changes" ;
	}else{
	http.open("PUT", "http://localhost:8085/HRMS/employeetype/update", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			getDataHtmlField();
			//window.location="CreateUserType.html";
			sessionStorage.clear();
		}
	
	}
	}
	http.send(myJSON);
//}
}
function addOrUpdateEmployeeType(){
	var flag= sessionStorage.getItem("flag");
	if(flag==null){
		addEmployeeType();
	}else if(flag==1){
		updateEmployeeType();
	}else{
		
	}
}
function getEmployeeTypeIdFromHtml(){
	document.getElementById("data").value = sessionStorage.getItem("id");
	document.getElementById("employeetypeName").value = sessionStorage.getItem("type");
	document.getElementById("noofleaves").value = sessionStorage.getItem("noOfLeves");
	
}
function getEmployeeTypeFromUI(){
	//var url = "http://localhost:8085/HRMS/employee/create";
	var id=sessionStorage.getItem("id");
	var type = document.getElementsByName("employeetypeName")[0].value;
	var noofleaves = document.getElementsByName("noofleaves")[0].value;
	 getUIEmployeeTypeData = {
			id:id,
			type : type,
			noOfLeves : noofleaves,
	}
	 return getUIEmployeeTypeData;
}

function createEmployeeTypeTable(empData){
	var tbody = "";

	for ( var data in empData) {
		tbody += "<tr>"
		var id = empData[data].id;
		/*tbody += "<td>" + id + "</td>"*/
		var type = empData[data].type;
		tbody += "<td>" + type + "</td>"
		/*var password = empData[data].password;
		tbody += "<td>" + password + "</td>"*/
		var noOfLeves = empData[data].noOfLeves;
		tbody += "<td>" + noOfLeves + "</td>"
		
		tbody += "<td>" + "<button  value='Delete' onclick='deleteEmployeeType(" +id+ ")' >Delete</button>"
				+ "</td>";
		tbody += "<td>" + "<button  value='Edit' onclick='editEmployeeType(" +id+ ")' >Edit</button>"
		+ "</td>";
		tbody += "<tr>";

	}
	tbody += "</table>";
		return tbody
}
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function closeModal() {
document.getElementById('modal').style.display = 'none';
document.getElementById('fade').style.display = 'none';
}
function getDataHtmlField(){
	document.getElementsByName("employeetypeName")[0].value="";
	document.getElementsByName("noofleaves")[0].value="";
}
function getSessionData(){
	var id=sessionStorage.getItem("id");
	var type = sessionStorage.getItem("type");
	var noOfLeves = sessionStorage.getItem("noOfLeves");
	listEmployeeTypeData={
			 id:id,
			 type:type,
			 noOfLeves:noOfLeves
	}	
	return listEmployeeTypeData;
}

/*function clearUserTypeForm(){
	  sessionStorage.clear();
	  window.location="CreateUserType.html";
}*/
