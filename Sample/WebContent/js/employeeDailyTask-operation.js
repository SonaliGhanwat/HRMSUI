var isEdit=true;
var listEmpData = "";
function displayEmployeeDailyTaskList() {
	document.getElementById('results').innerHTML = '';
	openModal(); 
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody = createTable(empData);
			document.getElementById("displayList").innerHTML = tbody;
			closeModal();
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeedailytask/list", true);
	xhttp.send();
}

function deleteEmployeeDailyTask(id) {
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
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/employeedailytask/delete/"
			+ id, true);
	xhttp.send();

}

function addEmployeeDailyTask() {
	
	var http = new XMLHttpRequest();
	var employeeDailyTask=getEmployeeDailyTaskDataFromUI(data);
	if(validateEmployeeDailyTask(employeeDailyTask)){
		document.getElementById('results').innerHTML = '';
		openModal(); 
	var myJSON = JSON.stringify(employeeDailyTask);
	console.log(employeeDailyTask);

	http.open("POST", "http://localhost:8085/HRMS/employeedailytask/create", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		closeModal();			// changes.
		if (http.readyState == 4 && http.status == 200) {
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			var code = json.code;
			if(code===1){
				document.getElementById("response").innerHTML = data;
				getDataHtmlField();
			}
			
		}
	}

	http.send(myJSON);
	}
}
function editEmployeeDailyTask(id) {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		//isEdit = true;
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//updatedisplayTable(empData);
			var employeeData = {
					id:empData.id,
					employee:empData.employee.id,
					date : empData.date,
					taskName : empData.taskName,
					estimationTime : empData.estimationTime,
					starttime : empData.starttime,
					endtime : empData.endtime
			};
			
			sessionStorage.setItem("flag", 1)
			sessionStorage.setItem("id", empData.id)
			sessionStorage.setItem("userid", empData.employee.id)
			sessionStorage.setItem("date", empData.date);
			sessionStorage.setItem("taskName", empData.taskName);
			sessionStorage.setItem("estimationTime", empData.estimationTime);
			sessionStorage.setItem("starttime", empData.starttime);
			sessionStorage.setItem("endtime", empData.endtime);
			window.location="CreateEmployeeDailyTask.html";
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/employeedailytask/"+id, true);
	xhttp.send();
}
function updateEmployeeDailyTask(){
	var http = new XMLHttpRequest();
	var employeeDailyTask = getEmployeeDailyTaskDataFromUI(data);
	
	if(validateEmployeeDailyTask(employeeDailyTask)){
		document.getElementById('results').innerHTML = '';
		openModal(); 
	var myJSON = JSON.stringify(employeeDailyTask);
	
	var taskName=employeeDailyTask.taskName;
	var estimationTime= employeeDailyTask.estimationTime;
	var starttime=employeeDailyTask.starttime;
	var endtime= employeeDailyTask.endtime;
	var getUIEmpData={
			taskName:taskName,
			 estimationTime:estimationTime,
			 starttime:starttime,
			 endtime:endtime
	}
	closeModal();		
	getSessionData();
	if(JSON.stringify(listEmpData) === JSON.stringify(getUIEmpData) ){
		document.getElementById("response").innerHTML ="Please Do Some Changes" ;
	}else{
	http.open("PUT", "http://localhost:8085/HRMS/employeedailytask/update", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			closeModal();
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			//window.location="CreateEmployeeDailyTask.html";
			getDataHtmlField();
			sessionStorage.clear();
		}
	}
	}
	http.send(myJSON);
	}
}
function addOrUpdateEmployeeDailyTask(){
	var flag= sessionStorage.getItem("flag");
	if(flag==null){
		addEmployeeDailyTask();
	}else if(flag==1){
		updateEmployeeDailyTask();
	}else{
		
	}
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
				console.log("empData[i].userid:",empData[i].userid)
				console.log("selectMenu:",selectMenu);
				//document.getElementById("list").innerHTML.selectedIndex = selectMenu;
			}
			selectMenu+='</select>';
			document.getElementById("list").innerHTML = selectMenu;
			if(isEdit==true){
				document.getElementById("data").value = sessionStorage.getItem("id");
				document.getElementById("list").value = sessionStorage.getItem("userid");
				document.getElementById("date").value = sessionStorage.getItem("date");
				document.getElementById("taskName").value = sessionStorage.getItem("taskName");
				document.getElementById("estimationTime").value = sessionStorage.getItem("estimationTime");
				document.getElementById("starttime").value = sessionStorage.getItem("starttime");
				document.getElementById("endtime").value = sessionStorage.getItem("endtime");
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
function createTable(empData){
	var tbody = "";

	for ( var data in empData) {
		tbody += "<tr>"
			var id = empData[data].id;
		var employeeid = empData[data].employee.userid;
		tbody += "<td>" + employeeid + "</td>"
		var date = empData[data].date;
		tbody += "<td>" + date + "</td>"
		var taskName = empData[data].taskName;
		tbody += "<td>" + taskName + "</td>"
		var estimationtime = empData[data].estimationTime;
		tbody += "<td>" + estimationtime + "</td>"
		var startTime = empData[data].starttime;
		tbody += "<td>" + startTime + "</td>"
		var endTime = empData[data].endtime;
		tbody += "<td>" + endTime + "</td>"
		var takenTime = empData[data].takenTime;
		tbody += "<td>" + takenTime + "</td>"
		tbody += "<td>" + "<button  value='Delete' onclick='deleteEmployeeDailyTask ("+id+")' >Delete</button>"
				+ "</td>";
		tbody += "<td>" + "<button  value='Edit' onclick='editEmployeeDailyTask("+id+")'>Edit</button>"
		+ "</td>";
		tbody += "<tr>"

	}
	tbody += "</table>"
		return tbody
	
}
function getEmployeeDailyTaskDataFromUI(data){
	//var url = "http://localhost:8085/HRMS/employeedailytask/create";
	var id=sessionStorage.getItem("id");
	var employee = document.getElementById("list").value;
	var empid = parseInt(employee);
	var date = document.getElementsByName("date")[0].value;
	var taskName = document.getElementsByName("taskName")[0].value;
	var estimationTime = document.getElementsByName("estimationTime")[0].value;
	if(estimationTime.split(":").length===2){
		estimationTime = document.getElementById("estimationTime").value + ':00';
	}else{
		estimationTime = document.getElementById("estimationTime").value ;
	}
	var starttime = document.getElementsByName("starttime")[0].value;
	if(starttime.split(":").length===2){
		starttime = document.getElementById("starttime").value + ':00';
	}else{
		starttime = document.getElementById("starttime").value ;
	}
	var endtime = document.getElementsByName("endtime")[0].value;
	if(endtime.split(":").length===2){
		endtime = document.getElementById("endtime").value + ':00';
	}else{
		endtime = document.getElementById("endtime").value ;
	}
	var data = {
			id:id,
			employee:empid,
			date : date,
			taskName : taskName,
			estimationTime : estimationTime,
			starttime : starttime,
			endtime : endtime
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
	document.getElementsByName("date")[0].value="";
	document.getElementsByName("taskName")[0].value="";
	document.getElementsByName("estimationTime")[0].value="";
	document.getElementsByName("starttime")[0].value="";
	document.getElementsByName("endtime")[0].value="";
}
function getSessionData(){
	var taskName = sessionStorage.getItem("taskName");
	var estimationTime = sessionStorage.getItem("estimationTime");
	var starttime = sessionStorage.getItem("starttime");
	var endtime = sessionStorage.getItem("endtime");
	 listEmpData={
			 taskName:taskName,
			 estimationTime:estimationTime,
			 starttime:starttime,
			 endtime:endtime
	}	
	return listEmpData;
}
/*function clearEmployeeDailyTaskForm(){
	  sessionStorage.clear();
	  window.location="CreateEmployeeDailyTask.html";
}*/

function displayDailyTaskByUserid(){
	var xhttp = new XMLHttpRequest();
	var userid = document.getElementById("list").value;
	console.log("dateVal:",userid);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			createTable(empData);
			if(empData==0){
				var message = document.getElementById("displayMessage").innerHTML = "We are sorry. This Employee does not Exist";
				document.getElementById("displayMessage").innerHTML = message;
				
			}
		}
		
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeedailytask/getDailyTaskByUserid/"+userid, true);
	xhttp.send();
}