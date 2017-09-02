function validate() {
	var userid = document.Employee.userid;
	var password = document.Employee.password;
	var firstname = document.Employee.firstName;
	var lastname = document.Employee.lastName;
	var phoneNumber = document.Employee.phoneNumber;
	var emailid = document.Employee.emailid;
	var dateOfJoining = document.Employee.dateOfJoining;
	var dateOfBirth = document.Employee.dateOfBirth;
	var address = document.Employee.address;
	var department = document.Employee.department;
	var salary = document.Employee.salary;
	if (userid_validation(userid, 5, 12)) {
		if (password_validation(password, 7, 12)) {
			if (firstname_validation(firstname)) {
				if (ValidateLetter(lastname)) {
					if(Validatephonenumber(phoneNumber))  {
					//if(ValidateEmail(emailid))  {
						//if(ValidateDate(dateOfJoining))  {
							//if(Validatesalary(salary)){
								
							//}
							
								
							//}
							
						//}
					}

				}

			}
		}

	}
	return false; 
}
function userid_validation(userid, mx, my) {
	var userid_len = userid.value.length;
	if (userid_len == 0 || userid_len >= my || userid_len < mx) {
		alert("User Id should not be empty / length be between " + 5 + " to "+ 12);
		userid.focus();
		return false;
	}
	return true;
}
function password_validation(password, mx, my) {
	var password_len = password.value.length;
	if (password_len == 0 || password_len >= my || password_len < mx) {
		alert("Password should not be empty / length be between " + 7 + " to "+ 12);
		password.focus();
		return false;
	}
	return true;
}
function firstname_validation(firstname) {
	var letters = /[a-zA-Z\\s]+$/;
	if (firstname.value.match(letters)) {
		return true;
	} else {
		alert('First Name must have alphabet characters only');
		firstname.focus();
		return false;
	}
}
function ValidateLetter(lastname) {
	var letters = /^[A-Za-z]+$/;
	if (lastname.value.match(letters)) {
		return true;
	} else {
		alert('Last Name must have alphabet characters only');
		lastname.focus();
		return false;
	}
}

function Validatephonenumber(phoneNumber)  
{  
  var phoneno = /^\d{10}$/;  
  if((phoneNumber.value.match(phoneno)))
        {  
      return true;  
        }  else  {  
        alert("Phone Number must have 10 number only");  
        phoneNumber.focus();
        return false;  
        }  
}  
/*function ValidateEmail(emailid) {
	var mailformat = /[a-zA-Z0-9\\.]+@[a-zA-Z0-9\\-\\_\\.]+\\.[a-zA-Z0-9]{3}/;
	if (emailid.value.match(mailformat)) {
		return true;
	} else {
		alert("You have entered an invalid email address!");
		emailid.focus();
		return false;
	}
}*/
function ValidateDate(dateOfJoining) {
var dateformat = /[0-9]{2})-([0-9]{2})-([0-9]{4}/ ;
if(dateOfJoining.match(dateformat)){
	return true;
}else {
	alert('You have entered an invalid email address!');
	dateOfJoining.focus();
	return false;
}

return false;
}
function ValidateDate(dateOfBirth) {
	var dateformat = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
	if(dateOfBirth.match(dateformat)){
		return true;
	}else {
		alert('You have entered an invalid Date!');
		dateOfBirth.focus();
		return false;
	}

	return false;
	}


function Validatesalary(salary){
	var salary=/{10}/;
	if(salary.value.match(salary)){
		return true
	}else{
		alert("salary must number only")
		salary.focus();
		return false;
	}
}