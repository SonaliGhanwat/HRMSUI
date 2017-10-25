

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
function sidebar() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
       
       
    } else {
        x.style.display = "none";
        
    }
}
/*function openNav() {
    document.getElementById("data").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}*/
