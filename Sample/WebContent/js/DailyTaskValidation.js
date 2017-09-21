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
	date.style.borderColor = "#F8F8FF";
	return true;
}
function isValidTaskName(taskName){
	var taskName = document.getElementById("taskName");
	if (taskName.value == "") {
		document.getElementById("taskName_validation").innerHTML = "TaskName Required";
		taskName.style.borderColor = "red";
		taskName.focus();
		return false;
	}
	document.getElementById("taskName_validation").innerHTML = "";
	taskName.style.borderColor = "#F8F8FF";
	return true;
}
function isValidEstimationTime(estimationTime){
	var estimationTime = document.getElementById("estimationTime");
	if (estimationTime.value == "") {
		document.getElementById("estimationTime_validation").innerHTML = "EstimationTime Required";
		estimationTime.style.borderColor = "red";
		estimationTime.focus();
		return false;
	}
	document.getElementById("estimationTime_validation").innerHTML = "";
	estimationTime.style.borderColor = "#F8F8FF";
	return true;
}
function isValidStartTime(starttime){
	var starttime = document.getElementById("starttime");
	if (starttime.value == "") {
		document.getElementById("starttime_validation").innerHTML = "StartTime Required";
		starttime.style.borderColor = "red";
		starttime.focus();
		return false;
	}
	document.getElementById("starttime_validation").innerHTML = "";
	starttime.style.borderColor = "#F8F8FF";
	return true;
}
function isValidEndTime(endtime){
	var endtime = document.getElementById("endtime");
	if (endtime.value == "") {
		document.getElementById("endtime_validation").innerHTML = "EndTime Required";
		endtime.style.borderColor = "red";
		endtime.focus();
		return false;
	}
	document.getElementById("endtime_validation").innerHTML = "";
	endtime.style.borderColor = "#F8F8FF";
	return true;
}