var listEmpData = "";
var isEdit=true;
function displayEmployeeAttendanceList() {
	document.getElementById('results').innerHTML = '';
	openModal();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  createEmployeeAttendanceTable(empData)
			
			closeModal();
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/list", true);
	xhttp.send();
}
function addEmployeeAttendance() {
	
	var http = new XMLHttpRequest();
	var employeeAttendance = getEmployeeAttendanceDataFromUI(data)
	if(validateEmployeeAttendance(employeeAttendance)){
		document.getElementById('results').innerHTML = '';
		openModal();
	var myJSON = JSON.stringify(employeeAttendance);
	console.log(myJSON);

	http.open("POST", "http://localhost:8085/HRMS/employeeattendance/create", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
											// changes.
		if (http.readyState == 4 && http.status == 200) {
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			var code = json.code;
			if(code===1){
					document.getElementById("response").innerHTML = data;
			}else if(code===0){
				document.getElementById("response").innerHTML = data;
				getDataHtmlFieldId();
				/*document.getElementById("list").value="";
				document.getElementsByName("intime")[0].value="";
				document.getElementsByName("outtime")[0].value="";
				document.getElementsByName("date")[0].value="";*/
			}
			closeModal();
		}
	}

	http.send(myJSON);
	}
}

function deleteEmployeeAttendance(id) {
	document.getElementById('results').innerHTML = '';
	openModal();
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			displayEmployeeAttendanceList();
			closeModal();
			
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/employeeattendance/delete/"
			+ id, true);
	xhttp.send();
}
function editEmployeeAttendance(id) {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		//isEdit = true;
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//updatedisplayTable(empData);
			var employeeData = {
					id:empData.id,
					employee:empData.employee.id,
					intime : empData.intime,
					outtime : empData.outtime,
					date : empData.date
			};
			
			sessionStorage.setItem("flag", 1)
			sessionStorage.setItem("id", empData.id)
			sessionStorage.setItem("userid", empData.employee.id)
			sessionStorage.setItem("intime", empData.intime);
			sessionStorage.setItem("outtime", empData.outtime);
			sessionStorage.setItem("date", empData.date);
			window.location="CreateEmployeeAttendance.html";
			
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/"+id, true);
	xhttp.send();
}
function updateEmployeeAttendance(){
	
	var http = new XMLHttpRequest();
	var employeeAttendance = getEmployeeAttendanceDataFromUI(data);
	
	if(validateEmployeeAttendance(employeeAttendance)){
		document.getElementById('results').innerHTML = '';
		openModal();
	var myJSON = JSON.stringify(employeeAttendance);
	console.log(myJSON);
	closeModal();
	var intime=employeeAttendance.intime;
	var outtime= employeeAttendance.outtime
	var getUIEmpData={
			intime:intime,
			outtime:outtime
	}
	getSessionData();
	if(JSON.stringify(listEmpData) === JSON.stringify(getUIEmpData) ){
		document.getElementById("response").innerHTML ="Please Do Some Changes" ;
	}else{
	http.open("PUT", "http://localhost:8085/HRMS/employeeattendance/update", true);
	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			var code = json.code;
			if(code===1){
				document.getElementById("response").innerHTML = data;
				getDataHtmlFieldId();
				sessionStorage.clear();
			}
		
		}
	}
	}
	http.send(myJSON);
	}
}
function addOrUpdateEmployeeAttendance(){
	var flag= sessionStorage.getItem("flag");
	if(flag==null){
		addEmployeeAttendance();
	}else if(flag==1){
		updateEmployeeAttendance();
	}else{
		
	}
}

function displayEmployeeAttendanceByDate(){
	var xhttp = new XMLHttpRequest();
	var dateVal = document.getElementById("Date").value;
	console.log("dateVal:",dateVal);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			createEmployeeAttendanceTable(empData);
			if(empData==0){
				var message = document.getElementById("response").innerHTML = "We are sorry. This Employee does not Exist";
				document.getElementById("response").innerHTML = message;
			}
		}
		
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/getAttendanceByDate/"+dateVal, true);
	xhttp.send();
}
function dropDownList(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("data").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var selectMenu="";
			selectMenu+='<option value="">Select EmployeeId</option>'+"<br>";
			for(var i = 0; i < empData.length; i++) {
				selectMenu+='<option value='+empData[i].id +'>'+empData[i].userid +'</option>'+"<br>";
			}
			selectMenu+='</select>';
			document.getElementById("list").innerHTML = selectMenu;
			if(isEdit==true){
				document.getElementById("data").value = sessionStorage.getItem("id");
				document.getElementById("list").value = sessionStorage.getItem("userid");
				document.getElementById("intime").value = sessionStorage.getItem("intime");
				document.getElementById("outtime").value = sessionStorage.getItem("outtime");
				document.getElementById("date").value = sessionStorage.getItem("date");
				var flag= sessionStorage.getItem("flag");
				if(flag==null){
				}else if(flag==1){
					document.getElementById("list").disabled = true;
					document.getElementById("date").disabled = true;
				}else{
				}
				
				}
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();
}
function getEmployeeAttendanceDataFromUI(data){
	//var url = "http://localhost:8085/HRMS/employeeleave/create";
	var id=sessionStorage.getItem("id");
	var employee = document.getElementById("list").value;
	var empid = parseInt(employee);
	var intime = document.getElementsByName("intime")[0].value;
	var outtime = document.getElementsByName("outtime")[0].value;
	var date = document.getElementsByName("date")[0].value;
	var data = {
			id:id,
			employee:empid,
			intime : intime,
			outtime : outtime,
			date : date
			
	}

	return data
	
}

function createEmployeeAttendanceTable(empData){
	var tbody = "";
	for ( var data in empData) {
		tbody += "<tr>"
			var id = empData[data].id;
		var employeeid = empData[data].employee.userid;
		tbody += "<td>" + employeeid + "</td>"
		var intime = empData[data].intime;
		tbody += "<td>" + intime + "</td>"
		var outtime = empData[data].outtime;
		tbody += "<td>" + outtime + "</td>"
		var totaltime = empData[data].totaltime;
		tbody += "<td>" + totaltime + "</td>"
		var date = empData[data].date;
		tbody += "<td>" + date + "</td>"
		var status = empData[data].status;
		tbody += "<td>" + status + "</td>"
		tbody += "<td>" + "<button  value='Delete' onclick='deleteEmployeeAttendance ("+id+")' >Delete</button>"
		+ "</td>";
        tbody += "<td>" + "<button  value='Edit' onclick='editEmployeeAttendance("+id+")' >Edit</button>"
        + "</td>";
		tbody += "<tr>"

	}
	document.getElementById("displayList").innerHTML = tbody;
	tbody += "</table>"
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
function getSessionData(){
	var inTime=sessionStorage.getItem("intime");
	var outtime=sessionStorage.getItem("outtime");
	 listEmpData={
		intime:inTime,
		outtime:outtime
	}	
	return listEmpData;
}
function getDataHtmlFieldId(){
	document.getElementById("list").value="";
	document.getElementsByName("intime")[0].value="";
	document.getElementsByName("outtime")[0].value="";
	document.getElementsByName("date")[0].value="";
}
function clearAttendanceForm(){
	  sessionStorage.clear();
	window.location="CreateEmployeeAttendance.html";
}