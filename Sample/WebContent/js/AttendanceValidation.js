function validateEmployeeAttendance(employeeAttendence) {
	var isEmployeeAttendanceDataValid = true;
	isEmployeeAttendanceDataValid = isValidInTime(employeeAttendence.intime) && isEmployeeAttendanceDataValid;
	isEmployeeAttendanceDataValid = isValidOutTime(employeeAttendence.outtime) && isEmployeeAttendanceDataValid ;
	isEmployeeAttendanceDataValid = intimeValidation(employeeAttendence.intime,employeeAttendence.outtime) && isEmployeeAttendanceDataValid ;
	isEmployeeAttendanceDataValid = isValidDate(employeeAttendence.date) && isEmployeeAttendanceDataValid ;
	isEmployeeAttendanceDataValid = isValidCurrentDate(employeeAttendence.date) && isEmployeeAttendanceDataValid ;
	return isEmployeeAttendanceDataValid;
}

function isValidInTime(intime) {
	var intime = document.getElementById("intime");
	if (intime.value == "") {
		document.getElementById("intime_validation").innerHTML = "In Time Required";
		intime.style.borderColor = "red";
		/*intime.focus();*/
		return false;
	}
	document.getElementById("intime_validation").innerHTML = "";
	intime.style.borderColor = "";
	return true;
}
function isValidOutTime(outtime) {
	var outtime = document.getElementById("outtime");
	if (outtime.value == "") {
		document.getElementById("outtime_validation").innerHTML = "Out Time Required";
		outtime.style.borderColor = "red";
	/*	outtime.focus();*/
		return false;
	}
	document.getElementById("outtime_validation").innerHTML = "";
	outtime.style.borderColor = "";
	return true;

}
function isValidDate(date) {
	var date = document.getElementById("date");
	if (date.value == "") {
		document.getElementById("date_validation").innerHTML = "Date Required";
		date.style.borderColor = "red";
		/*date.focus();*/
		return false;
	}
	document.getElementById("date_validation").innerHTML = "";
	date.style.borderColor = "";
	return true;
}

function intimeValidation(){
	var intime = document.getElementById("intime").value;
	var outtime = document.getElementById("outtime").value;
	if (intime <= outtime) {
		console.log("if block")
	} else if(outtime <= intime){
		document.getElementById("outtime_validation").innerHTML = " OutTime  should be greater then InTime";
		return false;
	}
	else {
		document.getElementById("intime_validation").innerHTML = "Invalid tme!! InTime  should be greater then OutTime";
		return false;
	}
	return true;
}
function isValidCurrentDate(){
	var joinDate = new Date();
	 var getdate = joinDate.getDate();
	 var getMonth = joinDate.getMonth()+1;
	 var getAttendncedate = document.getElementById("date").value;
	 var attendanceDate = new Date(getAttendncedate);
	 var getAttendate = attendanceDate.getDate();
	 var getAttenMonth = attendanceDate.getMonth()+1;
	 var newdate =  getMonth+"-"+ getdate;
	 var AttendanceDate1 = getAttenMonth+"-"+ getAttendate;
	 if (newdate ==AttendanceDate1 ) {
			return true;
		}else if(newdate < AttendanceDate1){
			document.getElementById("date_validation").innerHTML = "please do not enter past date";
			return false;
		}else if(newdate > AttendanceDate1){
			document.getElementById("date_validation").innerHTML = "please do not enter past date";
			return false;
		}
}
