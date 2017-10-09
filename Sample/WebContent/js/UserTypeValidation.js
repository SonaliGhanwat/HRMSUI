function validateUserType(userType) {
	var isUserTypeDataValid =true;
	isUserTypeDataValid = isvalidUserTypeName(userType.usertypeName) && isUserTypeDataValid;
	isUserTypeDataValid = isvalidUserTypeDescription(userType.description) && isUserTypeDataValid ;
	return isUserTypeDataValid;
	
}
function isvalidUserTypeName() {
	var usertypeName = document.getElementById("usertypeName");
	if (usertypeName.value == "") {
		document.getElementById("usertypeName_validation").innerHTML = "User Type Required";
		usertypeName.style.borderColor = "red";
		usertypeName.focus();
		return false;
	}
	document.getElementById("usertypeName_validation").innerHTML = "";
	usertypeName.style.borderColor = "";
	return true;
}
function isvalidUserTypeDescription(){
	var description = document.getElementById("description");
	if (description.value == "") {
		document.getElementById("Description_validation").innerHTML = "description Required";
		description.style.borderColor = "red";
		description.focus();
		return false;
	}
	document.getElementById("Description_validation").innerHTML = "";
	description.style.borderColor = "";
	return true;
}