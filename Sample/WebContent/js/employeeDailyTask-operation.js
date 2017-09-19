function displayEmployeeDailyTaskList() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody = createTable(empData);
			document.getElementById("displayList").innerHTML = tbody;
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeedailytask/list", true);
	xhttp.send();
}

function deleteEmployeeDailyTask(id) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var empData = JSON.parse(this.responseText);
			
			
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/employeedailytask/delete/"
			+ id, true);
	xhttp.send();

}

function addEmployeeDailyTask() {
	
	var http = new XMLHttpRequest();
	var employeeDailyTask=getEmployeeDailyTaskDataFromUI(data)
	var myJSON = JSON.stringify(employeeDailyTask);
	console.log(employeeDailyTask);

	http.open("POST", "http://localhost:8085/HRMS/employeedailytask/create", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
											// changes.
		if (http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}

	http.send(myJSON);
}
function dropDownList(index){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("data").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var selectMenu="";
			//var selectMenu ='<select name="dropDown" >';
			for(var i = 0; i < empData.length; i++) {
				selectMenu+='<option value='+empData[i].id +'>'+empData[i].userid +'</option>'+"<br>";
				console.log("empData[i].userid:",empData[i].userid)
				console.log("selectMenu:",selectMenu);
				//document.getElementById("list").innerHTML.selectedIndex = selectMenu;
			}
			//selectMenu+='</select>';
			document.getElementById("list").innerHTML = selectMenu;
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
		tbody += "<td>" + "<button  value='Edit' onclick='editEmployee(this)' >Edit</button>"
		+ "</td>";
		tbody += "<tr>"

	}
	tbody += "</table>"
		return tbody
	
}
function getEmployeeDailyTaskDataFromUI(data){
	var url = "http://localhost:8085/HRMS/employeedailytask/create";
	var date = document.getElementsByName("date")[0].value;
	var taskName = document.getElementsByName("taskName")[0].value;
	var estimationTime = document.getElementsByName("estimationTime")[0].value;
	var starttime = document.getElementsByName("starttime")[0].value;
	var endtime = document.getElementsByName("endtime")[0].value;
	var employee = document.getElementById("list").value;
	var id = parseInt(employee);
	
	
	var data = {
			date : date,
			taskName : taskName,
			estimationTime : estimationTime,
			starttime : starttime,
			endtime : endtime,
			employee:id
	}
	return data
	
}

