function validateEmployeeAttendance(employeeAttendence) {
	var isEmployeeAttendanceDataValid = true;
	isEmployeeAttendanceDataValid = isValidInTime(employeeAttendence.intime) && isEmployeeAttendanceDataValid;
	isEmployeeAttendanceDataValid = isValidOutTime(employeeAttendence.outtime) && isEmployeeAttendanceDataValid ;
	isEmployeeAttendanceDataValid = intimeValidation(employeeAttendence.intime,employeeAttendence.outtime) && isEmployeeAttendanceDataValid ;
	isEmployeeAttendanceDataValid = isValidDate(employeeAttendence.date) && isEmployeeAttendanceDataValid ;
	return isEmployeeAttendanceDataValid;
}

function isValidInTime(intime) {
	var intime = document.getElementById("intime");
	if (intime.value == "") {
		document.getElementById("intime_validation").innerHTML = "intime Required";
		intime.style.borderColor = "red";
		intime.focus();
		return false;
	}
	document.getElementById("intime_validation").innerHTML = "";
	intime.style.borderColor = "#F8F8FF";
	return true;
}
function isValidOutTime(outtime) {
	var outtime = document.getElementById("outtime");
	if (outtime.value == "") {
		document.getElementById("outtime_validation").innerHTML = "outtime Required";
		outtime.style.borderColor = "red";
		outtime.focus();
		return false;
	}
	document.getElementById("outtime_validation").innerHTML = "";
	outtime.style.borderColor = "#F8F8FF";
	return true;

}
function isValidDate(date) {
	var date = document.getElementById("date");
	if (date.value == "") {
		document.getElementById("date_validation").innerHTML = "date Required";
		date.style.borderColor = "red";
		date.focus();
		return false;
	}
	document.getElementById("date_validation").innerHTML = "";
	date.style.borderColor = "#F8F8FF";
	return true;
}

function intimeValidation(){
	var intime = document.getElementById("intime").value;
	var outtime = document.getElementById("outtime").value;
	if (intime <= outtime) {
		console.log("if block")
	} else if(outtime <= intime){
		document.getElementById("outtime_validation").innerHTML = "Invalid tme!! outtime  should be greater then intime";
		return false;
	}
	else {
		document.getElementById("intime_validation").innerHTML = "Invalid tme!! intime  should be greater then outtime";
		return false;
	}
	return true;
	
}