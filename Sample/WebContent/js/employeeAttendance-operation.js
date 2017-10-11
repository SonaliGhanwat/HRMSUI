

var isEdit = true;
function displayEmployeeAttendanceList() {
	document.getElementById('results').innerHTML = '';
	openModal(); 
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			createEmployeeAttendanceTable(empData);
			closeModal();
			
			}
		
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/list", true);
	xhttp.send();
	
}

function addEmployeeAttendance() {
	
	var http = new XMLHttpRequest();
	var employeeAttendence = getEmployeeAttendanceDataFromUI(data);
	
	if(validateEmployeeAttendance(employeeAttendence)){
		document.getElementById('results').innerHTML = '';
		openModal();
	var myJSON = JSON.stringify(employeeAttendence);
	console.log(myJSON);
	
	http.open("POST", "http://localhost:8085/HRMS/employeeattendance/create", true);
	
	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		closeModal();
		if (http.readyState == 4 && http.status == 200) {
			//alert(this.responseText);
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
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
			closeModal();
			var empData = JSON.parse(this.responseText);
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			displayEmployeeAttendanceList();
			
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/employeeattendance/delete/"
			+ id, true);
	xhttp.send();

}
function addOrUpdateEmployeeAttendance(){
	var flag= sessionStorage.getItem("flag");
	if(flag==null){
		addEmployeeAttendance();
		
	}else if(flag==1){
		updateEmployeeattendance();
	}else{
		
	}
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
					intime:empData.intime,
					outtime:empData.outtime,
					date:empData.date
			};
			
			sessionStorage.setItem("flag", 1)
			sessionStorage.setItem("empData.id", empData.id)
			sessionStorage.setItem("empData.userid", empData.employee.id)
			sessionStorage.setItem("empData.intime", empData.intime);
			sessionStorage.setItem("empData.outtime", empData.outtime);
			sessionStorage.setItem("empData.date", empData.date);
			window.location="CreateEmployeeAttendance.html";
			
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/"+id, true);
	xhttp.send();
}

/*function addEmployeeattendance(){
	//var flag = 1;
	
		window.location="CreateEmployeeAttendance.html";
		sessionStorage.clear();
	
}*/
function updateEmployeeattendance(){
	var http = new XMLHttpRequest();
	var employeeAttendence = getEmployeeAttendanceDataFromUI(data);
	
	if(validateEmployeeAttendance(employeeAttendence)){
		document.getElementById('results').innerHTML = '';
		openModal(); 
	var myJSON = JSON.stringify(employeeAttendence);
	console.log(myJSON);
	
	http.open("PUT", "http://localhost:8085/HRMS/employeeattendance/update", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	sessionStorage.clear();
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			/*window.location="CreateEmployeeAttendance.html";
			clearSessionData();
			closeModal();*/
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			//window.location="CreateEmployeeAttendance.html";
			clearSessionData();
			closeModal();
			
			
		}
	}
	http.send(myJSON);
	}
}

function displayEmployeeAttendanceByDate(index){
	var xhttp = new XMLHttpRequest();
	var dateVal = document.getElementById("Date").value;
	console.log("dateVal:",dateVal);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  displayTable(empData);
			document.getElementById("displayList").innerHTML = tbody;
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


function dropDownList(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			//if(flag==0){
			document.getElementById("data").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var selectMenu="";
			selectMenu+='<option value="">Select EmployeeId</option>'+"<br>";
			for(var i = 0; i < empData.length; i++) {
				
				selectMenu+='<option value='+empData[i].id +'>'+empData[i].userid +'</option>'+"<br>";
				//document.getElementById("list").innerHTML.selectedIndex = selectMenu;
			}
			selectMenu+='</select>';
			document.getElementById("list").innerHTML = selectMenu;
			if(isEdit==true){
			document.getElementById("data").value = sessionStorage.getItem("empData.id");
			document.getElementById("list").value = sessionStorage.getItem("empData.userid");
			document.getElementById("intime").value = sessionStorage.getItem("empData.intime");
			document.getElementById("outtime").value = sessionStorage.getItem("empData.outtime");
			document.getElementById("date").value = sessionStorage.getItem("empData.date");
			var flag= sessionStorage.getItem("flag");
			if(flag==null){
			}else if(flag==1){
				document.getElementById("list").disabled = true;
				document.getElementById("date").disabled = true;
				
			}else{
				
			}
			}
			//sessionStorage.clear();
		}
		
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();
}

function getEmployeeAttendanceDataFromUI(){
	var url = "http://localhost:8085/HRMS/employeeattendance/update";
	var id=sessionStorage.getItem("empData.id");
	var employee = document.getElementById("list").value;
	var empid = parseInt(employee);
	var intime = document.getElementsByName("intime")[0].value;
	var outtime = document.getElementsByName("outtime")[0].value;
	var date = document.getElementsByName("date")[0].value;
	var data = {
			id:id,
			employee:empid,
			intime:intime,
			outtime:outtime,
			date:date
	};
	 return data;
}

function createEmployeeAttendanceTable(empData){
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
		tbody += "<td>" + "<button  value='Delete' onclick='deleteEmployeeAttendance ("+id+")' >Delete</button>"
		+ "</td>";
      tbody += "<td>" + "<button id= 'myBtn' value='edit' onclick='editEmployeeAttendance("+id+")' >Edit</button>"
         + "</td>";
		tbody += "<tr>"
	}
	tbody += "</table>"
		return tbody
}

function clearSessionData(){
	for (var i = 0; i < sessionStorage.length; i++) {
        var a = sessionStorage.key(i);
        var b = sessionStorage.removeItem(a);
    }
}
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
 
}

function closeModal() {
document.getElementById('modal').style.display = 'none';
document.getElementById('fade').style.display = 'none';
}
