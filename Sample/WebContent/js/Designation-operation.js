var listDesignationData = "";
var getUIDesignationData = "";
function displayDesignationList(){
	document.getElementById('results').innerHTML = '';
	openModal();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  createDesignationTable(empData);
			document.getElementById("displayList").innerHTML = tbody;
			closeModal();
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/designation/list", true);
	xhttp.send();

}

function addDesignation() {
	
	var http = new XMLHttpRequest();
	var designation  = getDesignationFromUI(data);
	//if(validateUserType(userType)){
		document.getElementById('results').innerHTML = '';
		openModal();
		var myJSON = JSON.stringify(designation );
		http.open("POST", "http://localhost:8085/HRMS/designation/create", true);
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
	//}
}
function deleteDesignation(id) {
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
			displayDesignationList();
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/designation/delete/"
			+ id, true);
	xhttp.send();

}
function editDesignation(id) {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		//isEdit = true;
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//updatedisplayTable(empData);
			var employeeData = {
					id:empData.id,
					name : empData.name,
					band : empData.band,
					level : empData.level,
			};
			
			sessionStorage.setItem("flag", 1)
			sessionStorage.setItem("id", empData.id)
			sessionStorage.setItem("name", empData.name)
			sessionStorage.setItem("band", empData.band);
			sessionStorage.setItem("level", empData.level);
			
			window.location="CreateDesignation.html";
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/designation/"+id, true);
	xhttp.send();
}
function updateDesignation(){
	var http = new XMLHttpRequest();
	var designation  = getDesignationFromUI(data);
	
	//if(validateUserType(userType)){
		document.getElementById('results').innerHTML = '';
		openModal();
	var myJSON = JSON.stringify(designation );
	console.log(myJSON);
	closeModal();
	getDesignationFromUI();
	getSessionData();
	if(JSON.stringify(listDesignationData) === JSON.stringify(getUIDesignationData) ){
		document.getElementById("response").innerHTML ="Please Do Some Changes" ;
	}else{
	http.open("PUT", "http://localhost:8085/HRMS/designation/update", true);

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
function addOrUpdateDesignation(){
	var flag= sessionStorage.getItem("flag");
	if(flag==null){
		addDesignation();
	}else if(flag==1){
		updateDesignation();
	}else{
		
	}
}
function getDesignationIdFromHtml(){
	document.getElementById("data").value = sessionStorage.getItem("id");
	document.getElementById("designationName").value = sessionStorage.getItem("name");
	document.getElementById("band").value = sessionStorage.getItem("band");
	document.getElementById("level").value = sessionStorage.getItem("level");
	
}
function getDesignationFromUI(){
	//var url = "http://localhost:8085/HRMS/employee/create";
	var id=sessionStorage.getItem("id");
	var designationName = document.getElementsByName("designationName")[0].value;
	var band = document.getElementsByName("band")[0].value;
	var level = document.getElementsByName("level")[0].value;
	 getUIDesignationData = {
			id:id,
			name : designationName,
			band : band,
			level : level,
	}
	 return getUIDesignationData;
}

function createDesignationTable(empData){
	var tbody = "";

	for ( var data in empData) {
		tbody += "<tr>"
		var id = empData[data].id;
		/*tbody += "<td>" + id + "</td>"*/
		var name = empData[data].name;
		tbody += "<td>" + name + "</td>"
		/*var password = empData[data].password;
		tbody += "<td>" + password + "</td>"*/
		var band = empData[data].band;
		tbody += "<td>" + band + "</td>"
		var level = empData[data].level;
		tbody += "<td>" + level + "</td>"
		tbody += "<td>" + "<button  value='Delete' onclick='deleteDesignation(" +id+ ")' >Delete</button>"
				+ "</td>";
		tbody += "<td>" + "<button  value='Edit' onclick='editDesignation(" +id+ ")' >Edit</button>"
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
	document.getElementsByName("designationName")[0].value="";
	document.getElementsByName("band")[0].value="";
	document.getElementsByName("level")[0].value="";
}
function getSessionData(){
	var id=sessionStorage.getItem("id");
	var name = sessionStorage.getItem("name");
	var band = sessionStorage.getItem("band");
	var level = sessionStorage.getItem("level");
	listDesignationData={
			 id:id,
			 name:name,
			 band:band,
			 level:level
	}	
	return listDesignationData;
}

/*function clearUserTypeForm(){
	  sessionStorage.clear();
	  window.location="CreateUserType.html";
}*/
