
var isEdit=true;
function displayEmployeeLeaveList() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  createEmployeeLeaveTable(empData)
			document.getElementById("displayList").innerHTML = tbody;
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeleave/list", true);
	xhttp.send();
}
function addEmployeeLeave() {
	
	var http = new XMLHttpRequest();
	var employeeLeave = getEmployeeLeaveDataFromUI(data)
	if(validateEmployeeLeave(employeeLeave)){
	var myJSON = JSON.stringify(employeeLeave);
	console.log(myJSON);

	http.open("POST", "http://localhost:8085/HRMS/employeeleave/create", true);

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

function deleteEmployeeLeave(id) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			alert("Employee Leave Deleted Successfully");
			displayEmployeeLeaveList();
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/employeeleave/delete/"
			+ id, true);
	xhttp.send();
}
function editEmployeeLeave(id) {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		//isEdit = true;
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//updatedisplayTable(empData);
			var employeeData = {
					id:empData.id,
					employee:empData.employee.id,
					subject : empData.subject,
					leavedate : empData.leavedate,
					afterleavejoiningdate : empData.afterleavejoiningdate
			};
			
			sessionStorage.setItem("flag", 1)
			sessionStorage.setItem("id", empData.id)
			sessionStorage.setItem("userid", empData.employee.id)
			sessionStorage.setItem("subject", empData.subject);
			sessionStorage.setItem("leavedate", empData.leavedate);
			sessionStorage.setItem("afterleavejoiningdate", empData.afterleavejoiningdate);
			window.location="CreateEmployeeLeave.html";
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/employeeleave/"+id, true);
	xhttp.send();
}
function updateEmployeeLeave(){
	var http = new XMLHttpRequest();
	var employeeLeave = getEmployeeLeaveDataFromUI(data);
	
	if(validateEmployeeLeave(employeeLeave)){
		
	var myJSON = JSON.stringify(employeeLeave);
	console.log(myJSON);
	
	http.open("PUT", "http://localhost:8085/HRMS/employeeleave/update", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			alert(this.responseText);
			window.location="CreateEmployeeLeave.html";
			sessionStorage.clear();
		}
	}

	http.send(myJSON);
	}
}
function addOrUpdateEmployeeLeave(){
	var flag= sessionStorage.getItem("flag");
	if(flag==null){
		addEmployeeLeave();
	}else if(flag==1){
		updateEmployeeLeave();
	}else{
		
	}
}

function displayEmployeeLeaveByDate(){
	var xhttp = new XMLHttpRequest();
	var dateVal = document.getElementById("Date").value;
	console.log("dateVal:",dateVal);
	xhttp.onreadystatechange = function() {
		

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createLeaveTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody = "";
			for ( var list in empData) {
				tbody += "<tr>"
				var employeeid = empData[list].employee.userid;
				tbody += "<td>" + employeeid + "</td>"
				var subject = empData[list].subject;
				tbody += "<td>" + subject + "</td>"
				var leavedate = empData[list].leavedate;
				tbody += "<td>" + leavedate + "</td>"
				var afterleavejoiningdate = empData[list].afterleavejoiningdate;
				tbody += "<td>" + afterleavejoiningdate + "</td>"
				tbody += "<tr>"
			}
			tbody += "</table>"
				document.getElementById("displayLeaveList").innerHTML = tbody;
			
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeleave/getEmployeeLeave/"+dateVal, true);
	xhttp.send();

}
function dropDownListEmployee(index){
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
				document.getElementById("subject").value = sessionStorage.getItem("subject");
				document.getElementById("leavedate").value = sessionStorage.getItem("leavedate");
				document.getElementById("afterleavejoiningdate").value = sessionStorage.getItem("afterleavejoiningdate");
				
				}
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();
}
function getEmployeeLeaveDataFromUI(data){
	//var url = "http://localhost:8085/HRMS/employeeleave/create";
	var id=sessionStorage.getItem("id");
	var employee = document.getElementById("list").value;
	var empid = parseInt(employee);
	var subject = document.getElementsByName("subject")[0].value;
	var leavedate = document.getElementsByName("leavedate")[0].value;
	var afterleavejoiningdate = document.getElementsByName("afterleavejoiningdate")[0].value;
	var data = {
			id:id,
			employee:empid,
			subject : subject,
			leavedate : leavedate,
			afterleavejoiningdate : afterleavejoiningdate
			
	}

	return data
	
}

function createEmployeeLeaveTable(empData){
	var tbody = "";

	for ( var data in empData) {
		tbody += "<tr>"
			var id = empData[data].id;
		var employeeid = empData[data].employee.userid;
		tbody += "<td>" + employeeid + "</td>"
		var subject = empData[data].subject;
		tbody += "<td>" + subject + "</td>"
		var leavedate = empData[data].leavedate;
		tbody += "<td>" + leavedate + "</td>"
		var afterleavejoiningdate = empData[data].afterleavejoiningdate;
		tbody += "<td>" + afterleavejoiningdate + "</td>"
		tbody += "<td>" + "<button  value='Delete' onclick='deleteEmployeeLeave ("+id+")' >Delete</button>"
		+ "</td>";
        tbody += "<td>" + "<button  value='Edit' onclick='editEmployeeLeave("+id+")' >Edit</button>"
        + "</td>";
		tbody += "<tr>"

	}
	tbody += "</table>"
		return tbody
	
}
