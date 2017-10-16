function validateLogin(holiday) {
	var isHolidayDataValid =true;
	isHolidayDataValid = isvalidHolidayDate(holiday.holidayDate) && isHolidayDataValid;
	isHolidayDataValid = isValidHolidayName(holiday.holidayName) && isHolidayDataValid ;
	return isHolidayDataValid;
	
}