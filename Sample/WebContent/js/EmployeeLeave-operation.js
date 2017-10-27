
var isEdit=true;
var listEmpData = "";
function displayEmployeeLeaveList() {
	document.getElementById('results').innerHTML = '';
	openModal();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  createEmployeeLeaveTable(empData)
			
			closeModal();
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeleave/list", true);
	xhttp.send();
}
function addEmployeeLeave() {
	
	var http = new XMLHttpRequest();
	var employeeLeave = getEmployeeLeaveDataFromUI(data)
	if(validateEmployeeLeave(employeeLeave)){
		document.getElementById('results').innerHTML = '';
		openModal();
	var myJSON = JSON.stringify(employeeLeave);
	console.log(myJSON);

	http.open("POST", "http://localhost:8085/HRMS/employeeleave/create", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
											// changes.
		if (http.readyState == 4 && http.status == 200) {
			closeModal();
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

function deleteEmployeeLeave(id) {
	document.getElementById('results').innerHTML = '';
	openModal();
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			displayEmployeeDailyTaskList();
			closeModal();
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
		document.getElementById('results').innerHTML = '';
		openModal();
	var myJSON = JSON.stringify(employeeLeave);
	var subject=employeeLeave.subject;
	var leavedate= employeeLeave.leavedate;
	var afterleavejoiningdate=employeeLeave.afterleavejoiningdate;
	var getUIEmpData={
			subject:subject,
			 leavedate:leavedate,
			 afterleavejoiningdate:afterleavejoiningdate
	}
	closeModal();		
	getSessionData();
	if(JSON.stringify(listEmpData) === JSON.stringify(getUIEmpData) ){
		document.getElementById("response").innerHTML ="Please Do Some Changes" ;
	}else{
	
	
	http.open("PUT", "http://localhost:8085/HRMS/employeeleave/update", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			//window.location="CreateEmployeeLeave.html";
			getDataHtmlField();
			sessionStorage.clear();
		}
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
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			createEmployeeLeaveTable(empData);
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeleave/getEmployeeLeave/"+dateVal, true);
	xhttp.send();

}
function dropDownList(index){
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
				var flag= sessionStorage.getItem("flag");
				if(flag==null){
				}else if(flag==1){
					document.getElementById("list").disabled = true;
				}else{
				}
				}
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();
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
		document.getElementById("displayList").innerHTML = tbody;
		return tbody
	
}
function getEmployeeLeaveDataFromUI(data){
	//var url = "http://localhost:8085/HRMS/employeedailytask/create";
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
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
 
}

function closeModal() {
document.getElementById('modal').style.display = 'none';
document.getElementById('fade').style.display = 'none';
}
function getDataHtmlField(){
	document.getElementById("list").value="";
	document.getElementsByName("subject")[0].value="";
	document.getElementsByName("leavedate")[0].value="";
	document.getElementsByName("afterleavejoiningdate")[0].value="";
}
function getSessionData(){
	var subject = sessionStorage.getItem("subject");
	var leavedate = sessionStorage.getItem("leavedate");
	var afterleavejoiningdate = sessionStorage.getItem("afterleavejoiningdate");
	 listEmpData={
			 
			 subject:subject,
			 leavedate:leavedate,
			 afterleavejoiningdate:afterleavejoiningdate
	}	
	return listEmpData;
}
function clearEmployeeLeaveForm(){
	  sessionStorage.clear();
	  window.location="CreateEmployeeLeave.html";
}