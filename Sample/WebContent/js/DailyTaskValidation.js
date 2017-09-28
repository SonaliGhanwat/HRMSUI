function validateEmployeeDailyTask(employeeDailyTask) {
	var isEmployeeDailyTaskDataValid = true;
	isEmployeeDailyTaskDataValid = isValidDate(employeeDailyTask.date) && isEmployeeDailyTaskDataValid;
	isEmployeeDailyTaskDataValid = isValidTaskName(employeeDailyTask.taskName) && isEmployeeDailyTaskDataValid ;
	isEmployeeDailyTaskDataValid = isValidEstimationTime(employeeDailyTask.estimationTime) && isEmployeeDailyTaskDataValid ;
	//isEmployeeDailyTaskDataValid = intimeValidation(employeeDailyTask.estimationTime,employeeAttendence.outtime) && isEmployeeDailyTaskDataValid ;
	isEmployeeDailyTaskDataValid = isValidStartTime(employeeDailyTask.starttime) && isEmployeeDailyTaskDataValid ;
	isEmployeeDailyTaskDataValid = isValidEndTime(employeeDailyTask.endtime) && isEmployeeDailyTaskDataValid ;
	return isEmployeeDailyTaskDataValid;
}
function isValidDate(date){
	var date = document.getElementById("date");
	if (date.value == "") {
		document.getElementById("date_validation").innerHTML = "Date Required";
		date.style.borderColor = "red";
		date.focus();
		return false;
	}
	document.getElementById("date_validation").innerHTML = "";
	date.style.borderColor = "";
	return true;
}
function isValidTaskName(taskName){
	var taskName = document.getElementById("taskName");
	if (taskName.value == "") {
		document.getElementById("taskName_validation").innerHTML = "Task Name Required";
		taskName.style.borderColor = "red";
		taskName.focus();
		return false;
	}
	var taskName_len = taskName.value.length;
	if (taskName_len >= 8) {
	}else{
		document.getElementById("taskName_validation").innerHTML="Task Name should be 8 character";
		taskName.focus();
		return false;
	}
	document.getElementById("taskName_validation").innerHTML = "";
	taskName.style.borderColor = "";
	return true;
}
function isValidEstimationTime(estimationTime){
	var estimationTime = document.getElementById("estimationTime");
	if (estimationTime.value == "") {
		document.getElementById("estimationTime_validation").innerHTML = "Estimation Time Required";
		estimationTime.style.borderColor = "red";
		estimationTime.focus();
		return false;
	}
	document.getElementById("estimationTime_validation").innerHTML = "";
	estimationTime.style.borderColor = "";
	return true;
}
function isValidStartTime(starttime){
	var starttime = document.getElementById("starttime");
	if (starttime.value == "") {
		document.getElementById("starttime_validation").innerHTML = "Start Time Required";
		starttime.style.borderColor = "red";
		starttime.focus();
		return false;
	}
	document.getElementById("starttime_validation").innerHTML = "";
	starttime.style.borderColor = "";
	return true;
}
function isValidEndTime(endtime){
	var endtime = document.getElementById("endtime");
	if (endtime.value == "") {
		document.getElementById("endtime_validation").innerHTML = "End Time Required";
		endtime.style.borderColor = "red";
		endtime.focus();
		return false;
	}
	document.getElementById("endtime_validation").innerHTML = "";
	endtime.style.borderColor = "";
	return true;
}