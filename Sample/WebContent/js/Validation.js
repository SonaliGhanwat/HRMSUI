function validateEmployee(employee) {
		var isEmployeeDataValid = true;
		isEmployeeDataValid = isValidUserid(employee.userid) && isEmployeeDataValid;
		isEmployeeDataValid = isValidPassword(employee.password) && isEmployeeDataValid ;
		isEmployeeDataValid = isValidFirstName(employee.firstName) && isEmployeeDataValid ;
		isEmployeeDataValid = isValidLastName(employee.lastName) && isEmployeeDataValid;
		isEmployeeDataValid = isValidPhoneNumber(employee.phoneNumber) && isEmployeeDataValid ;
		isEmployeeDataValid = isValidEmailid(employee.emailid) && isEmployeeDataValid ;
		isEmployeeDataValid = validate_date(employee.dateOfBirth) && isEmployeeDataValid ;
		isEmployeeDataValid = dateOfBirthValidation(employee.dateOfBirth,employee.dateOfJoining) && isEmployeeDataValid ;
		isEmployeeDataValid = isValidDateofJoining(employee.dateOfJoining) && isEmployeeDataValid ;
		isEmployeeDataValid = isValidDateofBirth(employee.dateOfBirth) && isEmployeeDataValid ;
		isEmployeeDataValid = isValidAddress(employee.address) && isEmployeeDataValid ;
		isEmployeeDataValid = isValidDepartment(employee.department) && isEmployeeDataValid ;
		isEmployeeDataValid = isValidSalary(employee.salary) && isEmployeeDataValid ;
		
		


		console.log('isEmployeeDataValid : ', isEmployeeDataValid );
		return isEmployeeDataValid;
	}

function isValidUserid() {
	var userid = document.getElementById("userid");
	if (userid.value == "") {
		document.getElementById("userid_validation").innerHTML = "Userid Required";
		userid.style.borderColor = "red";
		userid.focus();
		return false;
	}
	var userid_len = userid.value.length;
	if (userid_len > 5 && userid_len < 8) {
	}else{
		document.getElementById("userid_validation").innerHTML="User Id length between " + 5 + " to "+ 8;
		userid.focus();
		return false;
	}
	
	document.getElementById("userid_validation").innerHTML = "";
	userid.style.borderColor = "";
	return true;
}
function onChangeUserId(){
	var userid = document.getElementById("userid");
	document.getElementById("userid_validation").innerHTML = "";
	userid.style.borderColor = "";
	userid.focus();
	
};

function isValidPassword(password) {
	var password = document.getElementById("password");
	if (password.value == "") {
		document.getElementById("password_validation").innerHTML = "Password Required";
		password.style.borderColor = "red";
		password.focus();
		return false;
	}
	var password_len = password.value.length;
	if (password_len > 5 && password_len < 8) {
	}else{
		document.getElementById("password_validation").innerHTML="password length between " + 5 + " to "+ 8;
		userid.focus();
		return false;
	}
	document.getElementById("password_validation").innerHTML = "";
	password.style.borderColor = "";
	return true;
}
function onChangePassword(){
	var password = document.getElementById("password");
	document.getElementById("password_validation").innerHTML = "";
	password.style.borderColor = "";
	password.focus();
	
};

function isValidFirstName(firstName) {
	 var firstName = document.getElementById("firstName");
	if (firstName.value == "") {
		document.getElementById("firstName_validation").innerHTML = "First Name Required";
		firstName.style.borderColor = "red";
		firstName.focus();
		return false;
	}
	var letters = /[a-zA-Z\\s]+$/;
	if (firstName.value.match(letters)) {
	} else {
		document.getElementById("firstName_validation").innerHTML = "First Name must have alphabet characters only";
		firstName.style.borderColor = "red";
		firstName.focus();
		return false;
	}
	document.getElementById("firstName_validation").innerHTML = "";
	firstName.style.borderColor = "";
	return true;
}
function onChangeFirstName(){
	var firstName = document.getElementById("firstName");
	document.getElementById("firstName_validation").innerHTML = "";
	firstName.style.borderColor = "";
	firstName.focus();
	
};

function isValidLastName(lastName) {
	 var lastName = document.getElementById("lastName");
	if (lastName.value == "") {
		document.getElementById("lastName_validation").innerHTML = "lastName Required";
		lastName.style.borderColor = "red";
		lastName.focus();
		return false;
	}
	var letters = /[a-zA-Z\\s]+$/;
	if (lastName.value.match(letters)) {
	} else {
		document.getElementById("lastName_validation").innerHTML = "lastName must have alphabet characters only";
		lastName.style.borderColor = "red";
		lastName.focus();
		return false;
	}
	document.getElementById("lastName_validation").innerHTML = "";
	lastName.style.borderColor = "";
	return true;
}
function onChangeLastName(){
	var lastName = document.getElementById("lastName");
	document.getElementById("lastName_validation").innerHTML = "";
	lastName.style.borderColor = "";
	lastName.focus();
	
};

function isValidPhoneNumber() {
	 var phoneNumber = document.getElementById("phoneNumber");
	if (phoneNumber.value == "") {
		document.getElementById("phoneNumber_validation").innerHTML = "Phone Number Required";
		phoneNumber.style.borderColor = "red";
		phoneNumber.focus();
		return false;
	}
	var phoneno = /^\d{10}$/;
	if ((phoneNumber.value.match(phoneno))) {
	} else {
		document.getElementById("phoneNumber_validation").innerHTML = "Phone Number must have 10 number only";
		phoneNumber.style.borderColor = "red";
		phoneNumber.focus();
		return false;
	}
	document.getElementById("phoneNumber_validation").innerHTML = "";
	phoneNumber.style.borderColor = "";
	return true;
}
function onChangePhoneNumber(){
	var phoneNumber = document.getElementById("phoneNumber");
	document.getElementById("phoneNumber_validation").innerHTML = "";
	phoneNumber.style.borderColor = "";
	phoneNumber.focus();
	
}

function isValidEmailid(emailid) {
	 var emailid = document.getElementById("emailid");
	if (emailid.value == "") {
		document.getElementById("emailid_validation").innerHTML = "EmailId  Required";
		emailid.style.borderColor = "red";
		emailid.focus();
		return false;
	}
	var email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{3})$/;
	if ((emailid.value.match(email))) {
	} else {
		document.getElementById("emailid_validation").innerHTML = "Invalid Email Address";
		emailid.style.borderColor = "red";
		emailid.focus();
		return false;
	}
	document.getElementById("emailid_validation").innerHTML = "";
	emailid.style.borderColor = "";
	return true;
}
function onChangeEmailid(){
	var emailid= document.getElementById("emailid");
	document.getElementById("emailid_validation").innerHTML = "";
	emailid.style.borderColor = "";
	emailid.focus();
}

function isValidDateofJoining() {
	var dateOfJoining = document.getElementById("dateOfJoining");
	if (dateOfJoining.value == "") {
		document.getElementById("dateOfJoining_validation").innerHTML = "DateOfJoining Required";
		dateOfJoining.style.borderColor = "red";
		dateOfJoining.focus();
		return false;
	}
	document.getElementById("dateOfJoining_validation").innerHTML = "";
	dateOfJoining.style.borderColor = "#F8F8FF";
	validate_date();
	return true;
	
}

function isValidDateofBirth() {
	 var dateOfBirth = document.getElementById("dateOfBirth");
	if (dateOfBirth.value == "") {
		document.getElementById("dateOfBirth_validation").innerHTML = "DateOfBirth Required";
		dateOfBirth.style.borderColor = "red";
		dateOfBirth.focus();
		return false;
	}
	document.getElementById("dateOfBirth_validation").innerHTML = "";
	dateOfBirth.style.borderColor = "#F8F8FF";
	dateOfBirthValidation();
	return true;
}

function isValidAddress() {
	 var address = document.getElementById("address");
	if (address.value == "") {
		document.getElementById("address_validation").innerHTML = "Address Required";
		address.style.borderColor = "red";
		address.focus();
		return false;
	}
	document.getElementById("address_validation").innerHTML = "";
	address.style.borderColor = "#F8F8FF";
	return true;

}

function isValidDepartment() {
	var department = document.getElementById("department");
	if (department.value == "") {
		document.getElementById("department_validation").innerHTML = "Department Required";
		department.style.borderColor = "red";
		department.focus();
		return false;
	}
	document.getElementById("department_validation").innerHTML = "";
	department.style.borderColor = "#F8F8FF";
	return true;
}

function isValidSalary() {
	var salary = document.getElementById("salary");
	if (salary.value == "") {
		document.getElementById("salary_validation").innerHTML = "Salary Required";
		salary.style.borderColor = "red";
		salary.focus();
		return false;
	}
	document.getElementById("salary_validation").innerHTML = "";
	salary.style.borderColor = "#F8F8FF";
	return true;
}
function validate_date() {
	var dateOfJoining = document.getElementById("dateOfJoining").value;
    var dateOfBirth = document.getElementById("dateOfBirth").value;
    var joinDate = new Date(dateOfJoining);
	var dateOfJoiningYear = joinDate.getFullYear();
	var birthDate = new Date(dateOfBirth);
	var dateOfBirthYear = birthDate.getFullYear();
	var maxAge=18;
	var total = dateOfJoiningYear - dateOfBirthYear;
	if (maxAge <= total) {
		console.log("if block")
	} else {
		document.getElementById("dateOfJoining_validation").innerHTML = "Invalid date!! Joining date should be 18 year greater then Birth date";
		return false;
	}
	return true;
}
function dateOfBirthValidation(){
	var currentdate = new Date();
	var currentyearonly = currentdate.getFullYear();
	var usrdob = document.getElementById('dateOfBirth').value;
	var dateEntered = new Date(usrdob);
	var data = dateEntered.getFullYear();;
	var res = currentyearonly-data;
	if (res >= 18){
	}
	else
	{
		document.getElementById("dateOfBirth_validation").innerHTML ="Invalid date!! Birth date should be 18 year old ";
		return false;
	}
	return true;
}
