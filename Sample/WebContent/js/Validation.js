function validateEmployee() {
	var userid = document.Employee.userid.value;
	var password = document.Employee.password.value;
	var firstName = document.Employee.firstName.value;
	var lastName = document.Employee.lastName.value;
	var phoneNumber = document.Employee.phoneNumber.value;
	var emailid = document.Employee.emailid.value;
	var dateOfJoining = document.Employee.dateOfJoining.value;
	var dateOfBirth = document.Employee.dateOfBirth.value;
	var address = document.Employee.address.value;
	var department = document.Employee.department.value;
	var salary = document.Employee.salary.value;
	var valid = true;

	var userid = document.getElementById("userid");

	if (userid.value == "") {
		alert("Please enter userid");
		userid.focus();
		return false;
	}

	var password = document.getElementById("password");
	var password_len = password.value.length;
	if (password_len == 0 || password_len >= 12 || password_len < 7) {
		alert("Password should not be empty / length be between " + 7 + " to "
				+ 12);
		password.focus();
		return false;
	}

	var firstName = document.getElementById("firstName");
	if (firstName.value == "") {
		alert("Please enter firstName");
		firstName.focus();
		return false;
	}
	var letters = /[a-zA-Z\\s]+$/;
	if (firstName.value.match(letters)) {
	} else {
		alert('First Name must have alphabet characters only');
		firstName.focus();
		return false;
	}

	var lastName = document.getElementById("lastName");
	if (lastName.value == "") {
		alert("Please enter firstName");
		lastName.focus();
		return false;
	}
	var letters = /[a-zA-Z\\s]+$/;
	if (lastName.value.match(letters)) {
	} else {
		alert('First Name must have alphabet characters only');
		lastName.focus();
		return false;
	}

	var phoneNumber = document.getElementById("phoneNumber");
	var phoneno = /^\d{10}$/;
	if ((phoneNumber.value.match(phoneno))) {
	} else {
		alert("Phone Number must have 10 number only");
		phoneNumber.focus();
		return false;
	}

	/*
	 * var emailid = document.getElementById("emailid"); if (emailid.value ==
	 * "") { alert("Please re-enter email"); emailid.focus(); return false; }
	 * var mailformat =
	 * /[a-zA-Z0-9\\.]+@[a-zA-Z0-9\\-\\_\\.]+\\.[a-zA-Z0-9]{3}/; if
	 * (emailid.value.match(mailformat)) { return true; } else { alert("You have
	 * entered an invalid email address!"); emailid.focus(); return false; }
	 */

	var dateOfJoining = document.getElementById("dateOfJoining");
	if (dateOfJoining.value == "") {
		alert("Please enter dateOfJoining");
		dateOfJoining.focus();
		return false;
	}

	var dateOfBirth = document.getElementById("dateOfBirth");
	if (dateOfBirth.value == "") {
		alert("Please enter dateOfBirth");
		dateOfBirth.focus();
		return false;
	}

	var address = document.getElementById("address");
	if (address.value == "") {
		alert("Please enter address");
		address.focus();
		return false;
	}
	var department = document.getElementById("department");
	if (department.value == "") {
		alert("Please enter department");
		department.focus();
		return false;
	}
	var salary = document.getElementById("salary");
	if (salary.value == "") {
		alert("Please enter department");
		salary.focus();
		return false;
	}

}