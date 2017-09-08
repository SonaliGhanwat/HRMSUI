function displayEmployeeList() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody = "";

			for ( var data in empData) {
				tbody += "<tr>"
				/*var id = empData[data].id;
				tbody += "<td>" + id + "</td>"*/
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
				/*
				 * var usertype=empData[data].usertype; tbody += "<td>" +
				 * usertype + "</td>"
				 */

				tbody += "<td>" + "<button  value='Delete' onclick='deleteEmployee (this.id)' >Delete</button>"
						+ "</td>";
				tbody += "<td>" + "<button  value='Edit' onclick='editEmployee(this)' >Edit</button>"
				+ "</td>";
				tbody += "<tr>"

			}
			tbody += "</table>"
			document.getElementById("displayList").innerHTML = tbody;
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();

}


function addEmployee() {
	//validateEmployee()();
	var http = new XMLHttpRequest();
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
	// var usertype = document.getElementsByName("usertype")[0].value;

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
		usertype : 2
	}

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
}

function deleteEmployee(index) {
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
			
			xhttp.open("DELETE", "http://localhost:8085/HRMS/employee/delete/"
					+ index.parentElement.parentElement.children[0].textContent, true);
			xhttp.send();
		}
	}

	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();
}

function editEmployee(index){
	
	var http = new XMLHttpRequest();
	var url = "http://localhost:8085/HRMS/employee/create";
	var userid = document.getElementsByName("userid");
	var password = document.getElementsByName("password");
	var firstName = document.getElementsByName("firstName");
	var lastName = document.getElementsByName("lastName");
	var phoneNumber = document.getElementsByName("phoneNumber");
	var emailid = document.getElementsByName("emailid");
	var dateOfJoining = document.getElementsByName("dateOfJoining");
	var dateOfBirth = document.getElementsByName("dateOfBirth");
	var address = document.getElementsByName("address");
	var department = document.getElementsByName("department");
	var salary = document.getElementsByName("salary");
	// var usertype = document.getElementsByName("usertype")[0].value;

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
		usertype : 2
	}

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
