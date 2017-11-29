var isEdit = true;
var employeeData = "";
var getUIEmployeeData = ""
function displayEmployeeList() {
	document.getElementById('results').innerHTML = '';
	openModal(); 
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var tbody =  createEmployeeTable(empData);
			document.getElementById("displayList").innerHTML = tbody;
			closeModal();
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();
}

function addEmployee() {
	var http = new XMLHttpRequest();
	var employee = getEmployeeDataFromUI(data);
	if(validateEmployee(employee)){
		document.getElementById('results').innerHTML = '';
		openModal();
		var myJSON = JSON.stringify(employee);
		console.log(employee);
		http.open("POST", "http://localhost:8085/HRMS/employee/create", true);
	
		http.setRequestHeader("Content-Type", "application/json; charset=utf8");
		http.onreadystatechange = function() {
			closeModal();
			if (http.readyState == 4 && http.status == 200) {
				var json = eval("(" + this.responseText + ")");
				var data = json.message;
				var code = json.code;
				if(code===1){
					document.getElementById("response").innerHTML = data;
				}else if(code===0){
					document.getElementById("response").innerHTML = data;
					getDataHtmlFieldId();
				}
				
			}
		}
	
		http.send(myJSON);
	}
}

function deleteEmployee(id) {
	document.getElementById('results').innerHTML = '';
	openModal(); 
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//alert("Employee Deleted Successfully");
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			displayEmployeeList();
			closeModal();
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
					usertype : empData.usertype.id,
					employeeType : empData.employeetype.id,
					designation : empData.designation.id,
					reportTo : empData.reportTo
					
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
			sessionStorage.setItem("employeeType", employeeData.employeeType);
			sessionStorage.setItem("designation", employeeData.designation);
			sessionStorage.setItem("reportTo", employeeData.reportTo)
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
	getSessionData();
	if(JSON.stringify(employeeData) === JSON.stringify(getUIEmployeeData) ){
		document.getElementById("response").innerHTML ="Please Do Some Changes" ;
	}else{
	http.open("PUT", "http://localhost:8085/HRMS/employee/update", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			//window.location="CreateEmployee.html";
			getDataHtmlFieldId();
			sessionStorage.clear();
			
		}
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
	//var url = "http://localhost:8085/HRMS/employee/create";
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
	var employeeType = document.getElementById("employeeType").value;
	var employeeTypeid = parseInt(employeeType);
	var getDesignationid = document.getElementById("designation").value;
	var designationid = parseInt(getDesignationid);
	var getReportTo = document.getElementById("reportto").value;
	var reportToid = parseInt(getReportTo);
	 getUIEmployeeData = {
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
		usertype : userTypeid,
		employeetype : employeeTypeid,
		designation : designationid,
		reportTo:reportToid
	}
	 return getUIEmployeeData
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
				document.getElementById("reportto").value = sessionStorage.getItem("reportTo")
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
		/*var address = empData[data].address;
		tbody += "<td>" + address + "</td>"*/
		/*var department = empData[data].department;
		tbody += "<td>" + department + "</td>"*/
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

function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
 
}

function closeModal() {
document.getElementById('modal').style.display = 'none';
document.getElementById('fade').style.display = 'none';
}
function getSessionData(){
	var id=sessionStorage.getItem("id");
	var userid = sessionStorage.getItem("userid");
	var password = sessionStorage.getItem("password");
	var firstName = sessionStorage.getItem("firstName");
	var lastName = sessionStorage.getItem("lastName");
	var phoneNumber = sessionStorage.getItem("phoneNumber");
	var emailid = sessionStorage.getItem("emailid");
	var dateOfJoining = sessionStorage.getItem("dateOfJoining");
	var dateOfBirth = sessionStorage.getItem("dateOfBirth");
	var address = sessionStorage.getItem("address");
	var department = sessionStorage.getItem("department");
	var salary = sessionStorage.getItem("salary");
	var usertype = sessionStorage.getItem("usertype");
	var userTypeid = parseInt(usertype);
	var employeeType = sessionStorage.getItem("employeeType");
	var employeeTypeid = parseInt(employeeType);
	var getDesignationid =sessionStorage.getItem("designation");
	var designationid = parseInt(getDesignationid);
	var getReportTo = sessionStorage.getItem("reportTo");
	var reportToid = parseInt(getReportTo);
	 employeeData = {
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
		usertype : userTypeid,
		employeetype : employeeTypeid,
		designation : designationid,
		reportTo : reportToid
	}
	 return employeeData
}
function getDataHtmlFieldId(){
	document.getElementsByName("userid")[0].value = "";
	document.getElementsByName("password")[0].value = "";
	document.getElementsByName("firstName")[0].value = "";
    document.getElementsByName("lastName")[0].value = "";
	document.getElementsByName("phoneNumber")[0].value = "";
    document.getElementsByName("emailid")[0].value = "";
	document.getElementsByName("dateOfJoining")[0].value = "";
	document.getElementsByName("dateOfBirth")[0].value = "";
	document.getElementsByName("address")[0].value = "";
	document.getElementsByName("department")[0].value = "";
	document.getElementsByName("salary")[0].value = "";
	document.getElementById("list").value="";
	document.getElementById("employeeType").value= "";
	document.getElementById("designation").value="";
	document.getElementById("reportto").value="";
}
/*function clearEmployeeForm(){
	  sessionStorage.clear();
	  window.location="CreateEmployee.html";
}*/
function employeeTypeList(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("data").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var selectMenu="";
			selectMenu+='<option value="">Select Employee Type</option>'+"<br>";
			for(var i = 0; i < empData.length; i++) {
				selectMenu+='<option value="'+empData[i].id +'">'+empData[i].type +'</option>'+"<br>";
				
				//document.getElementById("list").innerHTML.selectedIndex = selectMenu;
			}
			selectMenu+='</select>';
			document.getElementById("employeeType").innerHTML = selectMenu;
			document.getElementById("employeeType").value = sessionStorage.getItem("employeeType");
			
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/employeetype/list", true);
	xhttp.send();
}
function designationList(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("data").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var selectMenu="";
			selectMenu+='<option value="">Select Designation</option>'+"<br>";
			for(var i = 0; i < empData.length; i++) {
				selectMenu+='<option value="'+empData[i].id +'">'+empData[i].name +'</option>'+"<br>";
			}
			selectMenu+='</select>';
			document.getElementById("designation").innerHTML = selectMenu;
			document.getElementById("designation").value = sessionStorage.getItem("designation");
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/designation/list", true);
	xhttp.send();
}
function reportTo(){
	/*var getData = sessionStorage.getItem("designation");*/
	var getDesignationid = document.getElementById("designation").value;
	var designationid = parseInt(getDesignationid);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("data").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var selectMenu="";
			selectMenu+='<option value="">Select ReportTo</option>'+"<br>";
			for(var i = 0; i < empData.data.length; i++) {
				selectMenu+='<option value="'+empData.data[i].id +'">'+empData.data[i].firstName+' '+empData.data[i].lastName +'</option>'+"<br>";
			}
			selectMenu+='</select>';
			document.getElementById("reportto").innerHTML = selectMenu;
			document.getElementById("reportto").value = sessionStorage.getItem("reportto");
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/designation/reportTo/"+designationid, true);
	xhttp.send();
}