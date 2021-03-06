function validateEmployeeLeave(employeeLeave) {
	var isEmployeeLeaveDataValid =true;
	isEmployeeLeaveDataValid = validSubject(employeeLeave.subject) && isEmployeeLeaveDataValid;
	isEmployeeLeaveDataValid = isValidLeaveDate(employeeLeave.leavedate) && isEmployeeLeaveDataValid ;
	isEmployeeLeaveDataValid = isValidAfetrLeaveJoiningDate(employeeLeave.afterleavejoiningdate) && isEmployeeLeaveDataValid ;
	isEmployeeLeaveDataValid = leaveDateValidation(employeeLeave.leavedate,employeeLeave.afterleavejoiningdate) && isEmployeeLeaveDataValid ;
	isEmployeeLeaveDataValid = currentDateValidation(employeeLeave.leavedate) && isEmployeeLeaveDataValid ;
	return isEmployeeLeaveDataValid;
	
}

function validSubject(){
	var subject = document.getElementById("subject");
	if (subject.value == "") {
		document.getElementById("subject_validation").innerHTML = "Subject Required";
		subject.style.borderColor = "red";
		/*subject.focus();*/
		return false;
	}
	document.getElementById("subject_validation").innerHTML = "";
	subject.style.borderColor = "";
	return true;
}
function isValidLeaveDate(date) {
	var leavedate = document.getElementById("leavedate");
	if (leavedate.value == "") {
		document.getElementById("leavedate_validation").innerHTML = "Required";
		leavedate.style.borderColor = "red";
		/*leavedate.focus();*/
		return false;
	}
	document.getElementById("leavedate_validation").innerHTML = "";
	leavedate.style.borderColor = "";
	return true;
}

function isValidAfetrLeaveJoiningDate(){
	var afterleavejoiningdate = document.getElementById("afterleavejoiningdate");
	if (afterleavejoiningdate.value == "") {
		document.getElementById("afterleavejoiningdate_validation").innerHTML = "Leave Date Required";
		afterleavejoiningdate.style.borderColor = "red";
		/*afterleavejoiningdate.focus();*/
		return false;
	}
	document.getElementById("afterleavejoiningdate_validation").innerHTML = "";
	afterleavejoiningdate.style.borderColor = "";
	return true;
	
}
function leaveDateValidation(){
	var leavedate = document.getElementById("leavedate").value;
	var afterleavejoiningdate = document.getElementById("afterleavejoiningdate").value;
	if (leavedate <= afterleavejoiningdate) {
		console.log("if block")
	} else if(afterleavejoiningdate <= leavedate){
		document.getElementById("afterleavejoiningdate_validation").innerHTML = "Invalid Date!! After leave joining date  should be greater then Leave date";
		return false;
	}
	else {
		document.getElementById("leavedate_validation").innerHTML = "Invalid Date!! Leave Date  should be greater then After leave joining date";
		return false;
	}
	return true;
	
}
function currentDateValidation(){
	var joinDate = new Date();
	 var getdate = joinDate.getDate();
	 var getMonth = joinDate.getMonth()+1;
	 var getYear = joinDate.getFullYear()
	 var leavedate = document.getElementById("leavedate").value;
	 var leaveDate = new Date(leavedate);
	 var leavedate = leaveDate.getDate();
	 var leavemonth = leaveDate.getMonth()+1;
	 var leaveYear = leaveDate.getFullYear();
	 var newdate =  getMonth+"-"+ getdate;
	 var leaveDate1 = leavemonth+"-"+ leavedate;
	 if (newdate ==leaveDate1 ) {
			return true;
		}else if(newdate < leaveDate1){
			return true;
		}else {
			document.getElementById("leavedate_validation").innerHTML = "please do not enter past date";
			return false;
		}
}
