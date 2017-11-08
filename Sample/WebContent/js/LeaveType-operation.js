var listLeaveTypeData = "";
var getUILeaveTypeData = "";
function displayLeaveTypeList() {
	document.getElementById('results').innerHTML = '';
	openModal();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  createLeaveTable(empData);
			document.getElementById("displayList").innerHTML = tbody;
			closeModal();
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/leavetype/list", true);
	xhttp.send();

}

function addLeaveType() {
	
	var http = new XMLHttpRequest();
	var leaveType = getLeaveTypeFromUI(data);
	if(validateLeaveType(leaveType)){
		document.getElementById('results').innerHTML = '';
		openModal();
		var myJSON = JSON.stringify(leaveType);
		console.log(userType);
		http.open("POST", "http://localhost:8085/HRMS/leavetype/create", true);
	
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
function deleteLeaveType(id) {
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
			displayLeaveTypeList();
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/leavetype/delete/"
			+ id, true);
	xhttp.send();

}
function editLeaveType(id) {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		//isEdit = true;
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//updatedisplayTable(empData);
			var employeeData = {
					id:empData.id,
					name : empData.name,
					
			};
			
			sessionStorage.setItem("flag", 1)
			sessionStorage.setItem("id", empData.id)
			sessionStorage.setItem("name", empData.name)
		
			
			window.location="CreateLeaveType.html";
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/leavetype/"+id, true);
	xhttp.send();
}
function updateLeaveType(){
	var http = new XMLHttpRequest();
	var leaveType = getLeaveTypeFromUI(data);
	
	//if(validateUserType(userType)){
		document.getElementById('results').innerHTML = '';
		openModal();
	var myJSON = JSON.stringify(leaveType);
	console.log(myJSON);
	closeModal();
	getLeaveTypeFromUI();
	getSessionData();
	if(JSON.stringify(listLeaveTypeData) === JSON.stringify(getUILeaveTypeData) ){
		document.getElementById("response").innerHTML ="Please Do Some Changes" ;
	}else{
	http.open("PUT", "http://localhost:8085/HRMS/leavetype/update", true);

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
function addOrUpdateLeaveType(){
	var flag= sessionStorage.getItem("flag");
	if(flag==null){
		addLeaveType();
	}else if(flag==1){
		updateLeaveType();
	}else{
		
	}
}
function getLeaveTypeIdFromHtml(){
	document.getElementById("data").value = sessionStorage.getItem("id");
	document.getElementById("leavetypename").value = sessionStorage.getItem("name");
	
	
}
function getLeaveTypeFromUI(){
	//var url = "http://localhost:8085/HRMS/employee/create";
	var id=sessionStorage.getItem("id");
	var laeavetypeName = document.getElementsByName("leavetypename")[0].value;
	 getUILeaveTypeData = {
			id:id,
			name : laeavetypeName,
	}
	 return getUILeaveTypeData;
}

function createLeaveTable(empData){
	var tbody = "";

	for ( var data in empData) {
		tbody += "<tr>"
		var id = empData[data].id;
		/*tbody += "<td>" + id + "</td>"*/
		var name = empData[data].name;
		tbody += "<td>" + name + "</td>"
		/*var password = empData[data].password;
		tbody += "<td>" + password + "</td>"*/
		
		tbody += "<td>" + "<button  value='Delete' onclick='deleteLeaveType (" +id+ ")' >Delete</button>"
				+ "</td>";
		tbody += "<td>" + "<button  value='Edit' onclick='editLeaveType(" +id+ ")' >Edit</button>"
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
	document.getElementsByName("leavetypename")[0].value="";
}
function getSessionData(){
	var id=sessionStorage.getItem("id");
	var leavetypeName = sessionStorage.getItem("name");
	 listLeaveTypeData={
			 id:id,
			 name:leavetypeName,
	}	
	return listLeaveTypeData;
}


