var isEdit = true;
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
	var employee = getEmployeeDataFromUI(data);
	
	//validate
	
	if(validateEmployee(employee)){
		var myJSON = JSON.stringify(employee);
		console.log(employee);
		http.open("POST", "http://localhost:8085/HRMS/employee/create", true);
	
		http.setRequestHeader("Content-Type", "application/json; charset=utf8");
		http.onreadystatechange = function() {// Call a function when the state
			if (http.readyState == 4 && http.status == 200) {
				alert(this.responseText);
			}
		}
	
		http.send(myJSON);
	}
}

function deleteEmployee(id) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			alert("Employee Deleted Successfully");
			displayEmployeeList();
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/employee/delete/"
			+ id, true);
	xhttp.send();

}

function editEmployee(id) {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		//isEdit = true;
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//updatedisplayTable(empData);
			var employeeData = {
					id:empData.id,
					userid : empData.userid,
					password :empData. password,
					firstName : empData.firstName,
					lastName : empData.lastName,
					phoneNumber : empData.phoneNumber,
					emailid : empData.emailid,
					dateOfJoining : empData.dateOfJoining,
					dateOfBirth : empData.dateOfBirth,
					address : empData.address,
					department : empData.department,
					salary : empData.salary,
					usertype : empData.usertype.id
			};
			sessionStorage.setItem("flag", 1)
			sessionStorage.setItem("id", employeeData.id)
			sessionStorage.setItem("userid", employeeData.userid)
			sessionStorage.setItem("password", employeeData.password)
			sessionStorage.setItem("firstName", employeeData.firstName);
			sessionStorage.setItem("lastName", employeeData.lastName);
			sessionStorage.setItem("phoneNumber", employeeData.phoneNumber);
			sessionStorage.setItem("emailid", employeeData.emailid)
			sessionStorage.setItem("dateOfJoining", employeeData.dateOfJoining)
			sessionStorage.setItem("dateOfBirth", employeeData.dateOfBirth);
			sessionStorage.setItem("address", employeeData.address);
			sessionStorage.setItem("department", employeeData.department);
			sessionStorage.setItem("salary", employeeData.salary);
			sessionStorage.setItem("usertype", employeeData.usertype);
			window.location="CreateEmployee.html";
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/employee/"+id, true);
	xhttp.send();
}
function updateEmployee(){
	var http = new XMLHttpRequest();
	var employee = getEmployeeDataFromUI(data);
	
	if(validateEmployee(employee)){
		
	var myJSON = JSON.stringify(employee);
	console.log(myJSON);
	
	http.open("PUT", "http://localhost:8085/HRMS/employee/update", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			alert(this.responseText);
			window.location="CreateEmployee.html";
			sessionStorage.clear();
			
		}
	}

	http.send(myJSON);
	}
}
function addOrUpdateEmployee(){
	var flag= sessionStorage.getItem("flag");
	if(flag==null){
		addEmployee();
	}else if(flag==1){
		updateEmployee();
	}else{
	}
}
function getEmployeeDataFromUI(){
	var url = "http://localhost:8085/HRMS/employee/create";
	var id=sessionStorage.getItem("id");
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
	var userTypeid = parseInt(usertype);

	var data = {
			id:id,
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
		usertype : userTypeid
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
			selectMenu+='<option value="">Select User Type</option>'+"<br>";
			for(var i = 0; i < empData.length; i++) {
				selectMenu+='<option value="'+empData[i].id +'">'+empData[i].usertypeName +'</option>'+"<br>";
				
				//document.getElementById("list").innerHTML.selectedIndex = selectMenu;
			}
			selectMenu+='</select>';
			document.getElementById("list").innerHTML = selectMenu;
			if(isEdit==true){
				document.getElementById("data").value = sessionStorage.getItem("id");
				document.getElementsByName("userid")[0].value = sessionStorage.getItem("userid");
				document.getElementsByName("password")[0].value = sessionStorage.getItem("password");
				document.getElementsByName("firstName")[0].value = sessionStorage.getItem("firstName");
				document.getElementsByName("lastName")[0].value = sessionStorage.getItem("lastName");
				document.getElementsByName("phoneNumber")[0].value = sessionStorage.getItem("phoneNumber");
				document.getElementsByName("emailid")[0].value = sessionStorage.getItem("emailid");
				document.getElementsByName("dateOfJoining")[0].value = sessionStorage.getItem("dateOfJoining");
				document.getElementsByName("dateOfBirth")[0].value = sessionStorage.getItem("dateOfBirth");
				document.getElementsByName("address")[0].value = sessionStorage.getItem("address");
				document.getElementsByName("department")[0].value = sessionStorage.getItem("department");
				document.getElementsByName("salary")[0].value = sessionStorage.getItem("salary");
				document.getElementById("list").value = sessionStorage.getItem("usertype");
			}
			
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
		/*var salary = empData[data].salary;
		tbody += "<td>" + salary + "</td>"*/
		var usertype = empData[data].usertype.usertypeName;
		tbody += "<td>" + usertype + "</td>"
		tbody += "<td>" + "<button  value='Delete' onclick='deleteEmployee (" +id+ ")' >Delete</button>"
				+ "</td>";
		tbody += "<td>" + "<button  value='Edit' onclick='editEmployee("+id+")' >Edit</button>"
		+ "</td>";
		tbody += "<tr>";

	}
	tbody += "</table>";
		return tbody
}

   

