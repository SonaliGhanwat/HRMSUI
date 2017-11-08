function validateLeaveType(LeaveType) {
	var isLeaveTypeDataValid =true;
	isLeaveTypeDataValid = isvalidLeaveTypeName(LeaveType.name) && isLeaveTypeDataValid;
	return isLeaveTypeDataValid;
	
}
function isvalidLeaveTypeName() {
	var leavetypename = document.getElementById("leavetypename");
	if (leavetypename.value == "") {
		document.getElementById("leavetypename_validation").innerHTML = "Leave Type Required";
		leavetypename.style.borderColor = "red";
		/*usertypeName.focus();*/
		return false;
	}
	document.getElementById("leavetypename_validation").innerHTML = "";
	leavetypename.style.borderColor = "";
	return true;
}
