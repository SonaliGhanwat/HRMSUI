function displayEmployeeList() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  createEmployeeTable(empData);
			document.getElementById("displayList").innerHTML = tbody;
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();

}


function addEmployee() {
	
	var http = new XMLHttpRequest();
	var employee = createEmployee(data);
	var myJSON = JSON.stringify(employee);
	console.log(employee);
	http.open("POST", "http://localhost:8085/HRMS/employee/create", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
											// changes.
		if (http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}

	http.send(myJSON);
}

function deleteEmployee(id) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/employee/delete/"
			+ id, true);
	xhttp.send();

}

function editEmployee(index){
	
	var http = new XMLHttpRequest();
	createEmployee(data);
	var myJSON = JSON.stringify(data);
	console.log(myJSON);

	http.open("POST", url, true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
											// changes.
		if (http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}

	http.send(myJSON);
	
	http.open("PUT", "http://localhost:8085/HRMS/employee/update", true);
	http.send();
}
function createEmployee(data){
	var url = "http://localhost:8085/HRMS/employee/create";
	var userid = document.getElementsByName("userid")[0].value;
	var password = document.getElementsByName("password")[0].value;
	var firstName = document.getElementsByName("firstName")[0].value;
	var lastName = document.getElementsByName("lastName")[0].value;
	var phoneNumber = document.getElementsByName("phoneNumber")[0].value;
	var emailid = document.getElementsByName("emailid")[0].value;
	var dateOfJoining = document.getElementsByName("dateOfJoining")[0].value;
	var dateOfBirth = document.getElementsByName("dateOfBirth")[0].value;
	var address = document.getElementsByName("address")[0].value;
	var department = document.getElementsByName("department")[0].value;
	var salary = document.getElementsByName("salary")[0].value;
	var usertype = document.getElementById("list").value;
	var id = parseInt(usertype);

	var data = {
		userid : userid,
		password : password,
		firstName : firstName,
		lastName : lastName,
		phoneNumber : phoneNumber,
		emailid : emailid,
		dateOfJoining : dateOfJoining,
		dateOfBirth : dateOfBirth,
		address : address,
		department : department,
		salary : salary,
		usertype : id
	}
	 return data
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
				selectMenu+='<option value="'+empData[i].id +'">'+empData[i].usertypeName +'</option>'+"<br>";
				
				//document.getElementById("list").innerHTML.selectedIndex = selectMenu;
			}
			//selectMenu+='</select>';
			document.getElementById("list").innerHTML = selectMenu;
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/usertype/list", true);
	xhttp.send();
}
function createEmployeeTable(empData){
	var tbody = "";

	for ( var data in empData) {
		tbody += "<tr>"
		var id = empData[data].id;
		/*tbody += "<td>" + id + "</td>"*/
		var userid = empData[data].userid;
		tbody += "<td>" + userid + "</td>"
		/*var password = empData[data].password;
		tbody += "<td>" + password + "</td>"*/
		var firstName = empData[data].firstName;
		tbody += "<td>" + firstName + "</td>"
		var lastName = empData[data].lastName;
		tbody += "<td>" + lastName + "</td>"
		var phoneNumber = empData[data].phoneNumber;
		tbody += "<td>" + phoneNumber + "</td>"
		var emailid = empData[data].emailid;
		tbody += "<td>" + emailid + "</td>"
		var DateOfJoining = empData[data].dateOfJoining;
		tbody += "<td>" + DateOfJoining + "</td>"
		var DateOfBirth = empData[data].dateOfBirth;
		tbody += "<td>" + DateOfBirth + "</td>"
		var address = empData[data].address;
		tbody += "<td>" + address + "</td>"
		var department = empData[data].department;
		tbody += "<td>" + department + "</td>"
		var salary = empData[data].salary;
		tbody += "<td>" + salary + "</td>"
		tbody += "<td>" + "<button  value='Delete' onclick='deleteEmployee (" +id+ ")' >Delete</button>"
				+ "</td>";
		tbody += "<td>" + "<button  value='Edit' onclick='editEmployee("+ empData[data] +")' >Edit</button>"
		+ "</td>";
		tbody += "<tr>"

	}
	tbody += "</table>"
		return tbody
	
}
