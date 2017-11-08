function validateDesignation(designation) {
	var isDesignationDataValid =true;
	isDesignationDataValid = isvalidDesignationName(designation.name) && isDesignationDataValid;
	isDesignationDataValid = isvalidBand(designation.band) && isDesignationDataValid ;
	isDesignationDataValid = isvalidLevel(designation.level) && isDesignationDataValid ;
	return isDesignationDataValid;
	
}
function isvalidDesignationName() {
	var designationName = document.getElementById("designationName");
	if (designationName.value == "") {
		document.getElementById("designationName_validation").innerHTML = "Designation Required";
		designationName.style.borderColor = "red";
		/*usertypeName.focus();*/
		return false;
	}
	document.getElementById("designationName_validation").innerHTML = "";
	designationName.style.borderColor = "";
	return true;
}
function isvalidBand(){
	var band = document.getElementById("band");
	if (band.value == "") {
		document.getElementById("band_validation").innerHTML = "Band Required";
		band.style.borderColor = "red";
		/*description.focus();*/
		return false;
	}
	document.getElementById("band_validation").innerHTML = "";
	band.style.borderColor = "";
	return true;
}
function isvalidLevel(){
	var level = document.getElementById("level");
	if (level.value == "") {
		document.getElementById("level_validation").innerHTML = "Leave Required";
		level.style.borderColor = "red";
		/*description.focus();*/
		return false;
	}
	document.getElementById("level_validation").innerHTML = "";
	level.style.borderColor = "";
	return true;
}