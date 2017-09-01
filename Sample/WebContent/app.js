function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
	  
	  if (this.readyState == 4 && this.status == 200) {
		    document.getElementById("demo").innerHTML = "";
		    var empData = JSON.parse(this.responseText);
		    var tbody="";
		    
		        tbody += "<th>id</th>"
				tbody += "<th>UserId</th>"
				tbody += "<th>Password</th>"
				tbody += "<th>FirstName</th>"
				tbody += "<th>LastName</th>"
				tbody += "<th>PhoneNumber</th>"
				tbody += "<th>EmailId</th>"
				tbody += "<th>DateOfJoining</th>"
				tbody += "<th>DateOfBirth</th>"
				tbody += "<th>Address</th>"
				tbody += "<th>Department</th>"
				tbody += "<th>salary</th>"
				tbody += "<th>UserType</th>"
					tbody += "</table>"  
	            for (var data in empData) {
		    	console.log(empData[data]);
		         var id = empData[data].id;
		         tbody +=  "<td>" + id + "</td>"
		         var userid = empData[data].userid;
		         tbody += "<td>" + userid + "</td>"
		         var password=empData[data].password;
		         tbody += "<td>" + password + "</td>"
		         var firstName = empData[data].firstName;
		         tbody += "<td>" + firstName + "</td>"
		         var lastName = empData[data].lastName;
		         tbody += "<td>" + lastName + "</td>"
		         var phoneNumber=empData[data].phoneNumber;
		         tbody += "<td>" + phoneNumber + "</td>"
		         var emailid = empData[data].emailid;
		         tbody += "<td>" + emailid + "</td>"
		         var DateOfJoining = empData[data].dateOfJoining;
		         tbody += "<td>" + DateOfJoining + "</td>"
		         var DateOfBirth=empData[data].dateOfBirth;
		         tbody += "<td>" + DateOfBirth + "</td>"
		         var address = empData[data].address;
		         tbody += "<td>" + address + "</td>"
		         var department = empData[data].department;
		         tbody += "<td>" + department + "</td>"
		         var salary=empData[data].salary;
		         tbody += "<td>" + salary + "</td>"
		         var usertype=empData[data].usertype;
		         tbody += "<td>" + usertype + "</td>"
		         tbody += "</table>"   
		         
		                document.getElementById("matchData").innerHTML = tbody;
		    }
		        console.log(empData);
		    
	  }
  };
 
  xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
  xhttp.send();
 
}




function doFunction() {
	
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
	var usertype = document.getElementsByName("usertype")[0].value;
	 var data ={
			userid:userid,
			password:password,
			firstName:firstName,
			lastName:lastName,
			phoneNumber:phoneNumber,
			emailid:emailid,
			dateOfJoining:dateOfJoining,
			dateOfBirth:dateOfBirth,
			address:address,
			department:department,
			salary:salary,
			usertype:usertype
			}
	 
	var myJSON = JSON.stringify(data);
	console.log(myJSON);
	
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	    	 document.getElementById("data").innerHTML = this.responseText;
	        alert(http.responseText);
	    }
	}
	
	http.send(myJSON);
	
}
