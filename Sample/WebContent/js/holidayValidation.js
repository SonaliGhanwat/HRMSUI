function validateHoliday(holiday) {
	var isHolidayDataValid =true;
	isHolidayDataValid = isvalidHolidayDate(holiday.holidayDate) && isHolidayDataValid;
	isHolidayDataValid = isValidHolidayName(holiday.holidayName) && isHolidayDataValid ;
	return isHolidayDataValid;
	
}


function isvalidHolidayDate() {
	var holidayDate = document.getElementById("holidayDate");
	if (holidayDate.value == "") {
		document.getElementById("HolidayDate_validation").innerHTML = "Holiday Date Required";
		holidayDate.style.borderColor = "red";
		holidayDate.focus();
		return false;
	}
	document.getElementById("HolidayDate_validation").innerHTML = "";
	holidayDate.style.borderColor = "";
	return true;
}
function isValidHolidayName(){
	var holidayName = document.getElementById("holidayName");
	if (holidayName.value == "") {
		document.getElementById("HolidayName_validation").innerHTML = "Holiday Name Required";
		holidayName.style.borderColor = "red";
		holidayName.focus();
		return false;
	}
	document.getElementById("HolidayName_validation").innerHTML = "";
	holidayName.style.borderColor = "";
	return true;
}