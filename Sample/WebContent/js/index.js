

function employeeFunction() {
    document.getElementById("employee").classList.toggle("show");
    commonData();
}



function attendanceFunction() {
    document.getElementById("attendance").classList.toggle("show");
    commonData();
}



function dailyTaskFunction() {
    document.getElementById("dailyTask").classList.toggle("show");
    commonData();
}

function leaveFunction() {
    document.getElementById("leave").classList.toggle("show");
    commonData();
}
function userTypeFunction() {
    document.getElementById("userType").classList.toggle("show");
    commonData();
}

function holidayFunction() {
    document.getElementById("holiday").classList.toggle("show");
    commonData();
}
function commonData(){
	window.onclick = function(event) {
		  if (!event.target.matches('.dropbtn')) {

		    var dropdowns = document.getElementsByClassName("dropdown-content");
		    var i;
		    for (i = 0; i < dropdowns.length; i++) {
		      var openDropdown = dropdowns[i];
		      if (openDropdown.classList.contains('show')) {
		        openDropdown.classList.remove('show');
		      }
		    }
		  }
		}
}
function approval(){
	window.location="Approvals.html";
}
function sidebar() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
        
    } else {
        x.style.display = "none";
        
    }
}

/*function addAttendance() {
    var x = document.getElementById("MyDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
        
       
    } else {
        x.style.display = "none";
        
    }
}*/
function getUserId(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("data").innerHTML = "";
			var empData = JSON.parse(this.responseText);
			var selectMenu="";
			selectMenu+='<option value="">Select EmployeeId</option>'+"<br>";
			for(var i = 0; i < empData.length; i++) {
				selectMenu+='<option value='+empData[i].id +'>'+empData[i].userid +'</option>'+"<br>";
			}
			selectMenu+='</select>';
			document.getElementById("list").innerHTML = selectMenu;
		}
	};
	xhttp.open("GET", "http://localhost:8085/HRMS/employee/list", true);
	xhttp.send();
}
function clearEmployeeForm(){
	  sessionStorage.clear();
	  window.location="CreateEmployee.html";
}
function clearAttendanceForm(){
	  sessionStorage.clear();
	window.location="CreateEmployeeAttendance.html";
}
function clearEmployeeDailyTaskForm(){
	  sessionStorage.clear();
	  window.location="CreateEmployeeDailyTask.html";
}
function clearEmployeeLeaveForm(){
	  sessionStorage.clear();
	  window.location="CreateEmployeeLeave.html";
}
function clearHolidayForm(){
	  sessionStorage.clear();
	  window.location="CreateHoliday.html";
}
function clearUserTypeForm(){
	  sessionStorage.clear();
	  window.location="CreateUserType.html";
	  
}
function constantHeader(){
	window.location="menu.html";
}

/*function checkIfContinue(){
	 if(confirm("Do you want to continue?")) {
		 
         window.setTimeout('checkIfContinue()', 60000);  
     }else
     {
         window.location = 'index.html';
     }
}*/