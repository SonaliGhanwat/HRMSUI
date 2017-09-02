function getEmployeeFromUI() {
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
  alert(xhttp.responseText);
 
}





