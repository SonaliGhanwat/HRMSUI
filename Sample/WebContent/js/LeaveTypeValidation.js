function validateLeaveType(LeaveType) {
	var isLeaveTypeDataValid =true;
	isLeaveTypeDataValid = isvalidLeaveTypeName(LeaveType.name) && isLeaveTypeDataValid;
	return isLeaveTypeDataValid;
	
}


function isvalidLeaveTypeName(){
	var leaveTypeName = document.getElementById("leavetypename");
	if(leaveTypeName.value ==""){
		document.getElementById("leavetypename_validation").innerHTML = "Leave Type Required";
		leavetypename.style.borderColor = "red";
		return false;
	}
	document.getElementById("leavetypename_validation").innerHTML = "";
	leavetypename.style.borderColor = "";
	return true;
}