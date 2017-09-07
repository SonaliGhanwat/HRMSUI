function displayEmployeeAttendanceList() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody = "";

			for ( var data in empData) {
				tbody += "<tr>"
				var id = empData[data].id;
				tbody += "<td>" + id + "</td>"
				var employeeid = empData[data].employee.id;
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
				tbody += "<td>" + "<button  value='Delete' onclick='deleteEmployeeAttendance (this)' >Delete</button>"
						+ "</td>";
				tbody += "<td>" + "<button  value='Edit' onclick='editEmployee(this)' >Edit</button>"
				+ "</td>";
				tbody += "<tr>"

			}
			tbody += "</table>"
			document.getElementById("displayList").innerHTML = tbody;
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/list", true);
	xhttp.send();

}

function addEmployeeAttendance() {
	
	var http = new XMLHttpRequest();

	var url = "http://localhost:8085/HRMS/employeeattendance/create";
	var intime = document.getElementsByName("intime")[0].value;
	var outtime = document.getElementsByName("outtime")[0].value;
	var date = document.getElementsByName("date")[0].value;
	var url = "http://localhost:8085/HRMS/employee/list"
	var employee = document.getElementsByName("employee")[0].value.id
	
	// var usertype = document.getElementsByName("usertype")[0].value;

	var data = {
			intime : intime,
			outtime : outtime,
			date : date,
			employee : employee,
	}

	var myJSON = JSON.stringify(data);
	console.log(myJSON);

	http.open("POST", "http://localhost:8085/HRMS/employeeattendance/create", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
											// changes.
		if (http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}

	http.send(myJSON);
}
function deleteEmployeeAttendance(index) {
	var xhttp = new XMLHttpRequest();
	console.log("index:", index);

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			var tbodies= document.getElementsByTagName('tr')
			for (var i = tbodies.length - 1; i >= 0; i--) {

				var rows = tbodies[i].getElementsByTagName('tr');

				for (var j = rows.length - 1; j >= 0; j--) {
					rows[j].onclick = function() {
						alert(this.rowIndex + 1);
					}
				}
			};

			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			
			xhttp.open("DELETE", "http://localhost:8085/HRMS/employeeattendance/delete/"
					+ index.parentElement.parentElement.children[0].textContent, true);
			xhttp.send();
		}
	}

	xhttp.open("GET", "http://localhost:8085/HRMS/employeeattendance/list", true);
	xhttp.send();
}

function dropDownList(index){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("data").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			//var selectMenu="";
			var selectMenu ='<select name="dropDown" >';
			for(var i = 0; i < empData.length; i++) {
				selectMenu+='<option name="'+empData[i].userid +'">'+empData[i].userid +'</option>'+"<br>";
				
				
				console.log("empData[i].userid:",empData[i].userid)
				console.log("selectMenu:",selectMenu);
				
				//document.getElementById("list").innerHTML.selectedIndex = selectMenu;
			}
			selectMenu+='</select>';
			document.getElementById("list").innerHTML = selectMenu;
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();

	
}