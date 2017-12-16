function validateEmployeeType(employeeType) {
	var isEmployeeTypeDataValid =true;
	isEmployeeTypeDataValid = isvalidEmployeeTypeName(employeeType.type) && isEmployeeTypeDataValid;
	isEmployeeTypeDataValid = isvalidSeekLeave(employeeType.seekLeave) && isEmployeeTypeDataValid;
	isEmployeeTypeDataValid = isvalidPaidLeave(employeeType.paidLeave) && isEmployeeTypeDataValid;
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
function isvalidSeekLeave(){
	var seekleave = document.getElementById("seekleave");
	if (seekleave.value == "") {
		document.getElementById("seekleave_validation").innerHTML = "Seek Leave Required";
		seekleave.style.borderColor = "red";
		/*description.focus();*/
		return false;
	}
	document.getElementById("seekleave_validation").innerHTML = "";
	seekleave.style.borderColor = "";
	return true;
}
function isvalidPaidLeave(){
	var paidleave = document.getElementById("paidleave");
	if (paidleave.value == "") {
		document.getElementById("paidleave_validation").innerHTML = "Paid Leave Required";
		paidleave.style.borderColor = "red";
		/*description.focus();*/
		return false;
	}
	document.getElementById("paidleave_validation").innerHTML = "";
	paidleave.style.borderColor = "";
	return true;
}
function isvalidNOofLeaves(){
	var noofleaves = document.getElementById("totalleaves");
	if (noofleaves.value == "") {
		document.getElementById("totalleaves_validation").innerHTML = "Total Leave Required";
		noofleaves.style.borderColor = "red";
		/*description.focus();*/
		return false;
	}
	document.getElementById("totalleaves_validation").innerHTML = "";
	noofleaves.style.borderColor = "";
	return true;
}