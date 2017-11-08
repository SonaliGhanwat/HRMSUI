function validateEmployeeType(employeeType) {
	var isEmployeeTypeDataValid =true;
	isEmployeeTypeDataValid = isvalidEmployeeTypeName(employeeType.type) && isEmployeeTypeDataValid;
	isEmployeeTypeDataValid = isvalidNOofLeaves(employeeType.onOfLeaves) && isEmployeeTypeDataValid ;
	return isEmployeeTypeDataValid;
	
}
function isvalidEmployeeTypeName() {
	var employeetypeName = document.getElementById("employeetypeName");
	if (employeetypeName.value == "") {
		document.getElementById("employeetypeName_validation").innerHTML = "Employee Type Required";
		employeetypeName.style.borderColor = "red";
		/*usertypeName.focus();*/
		return false;
	}
	document.getElementById("employeetypeName_validation").innerHTML = "";
	employeetypeName.style.borderColor = "";
	return true;
}
function isvalidNOofLeaves(){
	var noofleaves = document.getElementById("noofleaves");
	if (noofleaves.value == "") {
		document.getElementById("noofleaves_validation").innerHTML = "NoOFLeaves Required";
		noofleaves.style.borderColor = "red";
		/*description.focus();*/
		return false;
	}
	document.getElementById("noofleaves_validation").innerHTML = "";
	noofleaves.style.borderColor = "";
	return true;
}