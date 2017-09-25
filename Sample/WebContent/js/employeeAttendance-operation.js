

var employeeData = "";
console.log("empData",employeeData);
function displayEmployeeAttendanceList() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
	         createEmployeeTable(empData);
			}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/list", true);
	xhttp.send();
}

function addEmployeeAttendance() {
	var http = new XMLHttpRequest();
	var employeeAttendence = getEmployeeAttendanceDataFromUI(data);
	
	if(validateEmployeeAttendance(employeeAttendence)){
		
	var myJSON = JSON.stringify(employeeAttendence);
	console.log(myJSON);
	
	http.open("POST", "http://localhost:8085/HRMS/employeeattendance/create", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			alert(this.responseText);
		}
	}

	http.send(myJSON);
	}
}

function deleteEmployeeAttendance(id) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			alert("Employee Attendance Deleted Successfully");
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/employeeattendance/delete/"
			+ id, true);
	xhttp.send();

}

function editEmployeeAttendance(id) {
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		window.location="EditEmployeeattendance.html";
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//updatedisplayTable(empData);
			var employeeData = {
					 employee:empData.id,
					intime:empData.intime,
					outtime:empData.outtime,
					date:empData.date
			};
			//return employeeData;
			document.getElementById("intime").value(empData.intime);
			document.getElementById("outtime").value(empData.outtime);
			document.getElementById("date").value(empData.date);
			document.getElementById("list").value(empData.id);
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/"+id, true);
	xhttp.send();
}


function displayEmployeeAttendanceByDate(index){
	var xhttp = new XMLHttpRequest();
	var dateVal = document.getElementById("Date").value;
	console.log("dateVal:",dateVal);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createAttendanceTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  displayTable(empData);
			document.getElementById("displayAttendanceList").innerHTML = tbody;
		}
		
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/getAttendanceByDate/"+dateVal, true);
	xhttp.send();
}

function displayEmployeeAttendanceByIdandDate(index){
	var xhttp = new XMLHttpRequest();
	var dateVal = document.getElementById("date").value;
	console.log("dateVal:",dateVal);
	var id=document.getElementById("id").value;
	console.log("id:",id)
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createAttendanceTableByIdandDate").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  displayTable(empData);
			document.getElementById("displayAttendanceListByIdandDate").innerHTML = tbody;
		}
		
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/getAttendance/" +id +"/" +dateVal, true);
	xhttp.send();
}


function dropDownList(employeeData){
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("data").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var selectMenu="";
			//var selectMenu ='<select name="dropDown" >';
			for(var i = 0; i < empData.length; i++) {
				selectMenu+='<option value='+empData[i].id +'>'+empData[i].userid +'</option>'+"<br>";
				//document.getElementById("list").innerHTML.selectedIndex = selectMenu;
			}
			//selectMenu+='</select>';
			document.getElementById("list").innerHTML = selectMenu;
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();
}
function getEmployeeAttendanceDataFromUI(){
	var url = "http://localhost:8085/HRMS/employeeattendance/create";
	var employee = document.getElementById("list").value;
	var id = parseInt(employee);
	var intime = document.getElementsByName("intime")[0].value;
	var outtime = document.getElementsByName("outtime")[0].value;
	var date = document.getElementsByName("date")[0].value;
	var data = {
			employee:id,
			intime:intime,
			outtime:outtime,
			date:date
	};
	 return data;
}

function createEmployeeTable(empData){
	var tbody = "";

	for ( var data in empData) {
		tbody += "<tr>"
	
		var id = empData[data].id;
		//tbody += "<td>" + id + "</td>"
		var employeeid = empData[data].employee.userid;
		tbody += "<td>" + employeeid + "</td>"
		/*var password = empData[data].password;
		tbody += "<td>" + password + "</td>"*/
		var inTime = empData[data].intime;
		tbody += "<td>" + inTime + "</td>"
		var outTime = empData[data].outtime;
		tbody += "<td>" + outTime + "</td>"
		var totalTime = empData[data].totaltime;
		tbody += "<td>" + totalTime + "</td>"
		var date = empData[data].date;
		tbody += "<td>" + date + "</td>"
		var status = empData[data].status;
		tbody += "<td>" + status + "</td>"
		tbody += "<td>" + "<button  value='Delete' onclick='deleteEmployeeAttendance ("+id+")' >Delete</button>"
				+ "</td>";
		tbody += "<td>" + "<button id= 'myBtn' value='edit' onclick='editEmployeeAttendance("+id+")' >Edit</button>"
		+ "</td>";
		tbody += "<tr>"
		
	}
	tbody += "</table>"
	document.getElementById("displayList").innerHTML = tbody;
	return empData
}

function displayTable(empData){
	var tbody = "";
	for ( var list in empData) {
		tbody += "<tr>"
		/*var id = empData[list].id;
		tbody += "<td>" + id + "</td>"*/
		var employeeid = empData[list].employee.userid;
		tbody += "<td>" + employeeid + "</td>"
		var inTime = empData[list].intime;
		tbody += "<td>" + inTime + "</td>"
		var outTime = empData[list].outtime;
		tbody += "<td>" + outTime + "</td>"
		var totalTime = empData[list].totaltime;
		tbody += "<td>" + totalTime + "</td>"
		var date = empData[list].date;
		tbody += "<td>" + date + "</td>"
		var status = empData[list].status;
		tbody += "<td>" + status + "</td>"
		tbody += "<tr>"
	}
	tbody += "</table>"
		return tbody
}

/*function updatedisplayTable(empData){
	var tbody = "";
	
		tbody += "<tr>"
		var id = empData.id;
		//tbody += "<td>" + id + "</td>"
		var employeeid = empData[list].employee.userid;
		tbody += "<td>" + employeeid + "</td>"
		var inTime = empData.intime;
		tbody += "<td>" + inTime + "</td>"
		var outTime = empData.outtime;
		tbody += "<td>" + outTime + "</td>"
		var date = empData.date;
		tbody += "<td>" + date + "</td>"
		tbody += "<tr>"
	
	tbody += "</table>"
		document.getElementById("updateList").innerHTML = tbody;
		return tbody
}*/