var listHolidayData = "";
var getUIHolidayData = "";
function displayHolidayList() {
	document.getElementById('results').innerHTML = '';
	openModal();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("createTable").innerHTML = "";
			var holidayData = JSON.parse(this.responseText);
			var tbody =  createHolidayTable(holidayData);
			document.getElementById("displayList").innerHTML = tbody;
			closeModal();
		}
	};

	xhttp.open("GET", "http://localhost:8085/HRMS/holiday/list", true);
	xhttp.send();
}
function addHoliday() {
	
	var http = new XMLHttpRequest();
	var holiday = getHolidayFromUI(data);
	
	//validate
	
	if(validateHoliday(holiday)){
		document.getElementById('results').innerHTML = '';
		openModal();
		var myJSON = JSON.stringify(holiday);
		console.log(holiday);
		http.open("POST", "http://localhost:8085/HRMS/holiday/create", true);
	
		http.setRequestHeader("Content-Type", "application/json; charset=utf8");
		http.onreadystatechange = function() {// Call a function when the state
			closeModal();				// changes.
			if (http.readyState == 4 && http.status == 200) {
				myFunction();
				var json = eval("(" + this.responseText + ")");
				var data = json.message;
				var code = json.code;
				if(code===1){
					document.getElementById("response").innerHTML = data;
					
				}
				
			}
		}
	
		http.send(myJSON);
	}
}
function deleteHoliday(id) {
	document.getElementById('results').innerHTML = '';
	openModal();
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			closeModal();
			displayHolidayList();
		}
	}
	xhttp.open("DELETE", "http://localhost:8085/HRMS/holiday/delete/"
			+ id, true);
	xhttp.send();

}
function editHoliday(id) {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		//isEdit = true;
		if (this.readyState == 4 && this.status == 200) {
			var empData = JSON.parse(this.responseText);
			//updatedisplayTable(empData);
			var employeeData = {
					id:empData.id,
					holidayDate : empData.holidayDate,
					holidayName : empData.holidayName,
			};
			
			sessionStorage.setItem("flag", 1)
			sessionStorage.setItem("id", empData.id)
			sessionStorage.setItem("holidayDate", empData.holidayDate)
			sessionStorage.setItem("holidayName", empData.holidayName);
			
			window.location="CreateHoliday.html";
		}
	}
	xhttp.open("GET", "http://localhost:8085/HRMS/holiday/"+id, true);
	xhttp.send();
}
function updateHoliday(){
	var http = new XMLHttpRequest();
	var holiday = getHolidayFromUI(data);
	
	if(validateHoliday(holiday)){
		document.getElementById('results').innerHTML = '';
		openModal();
	var myJSON = JSON.stringify(holiday);
	console.log(myJSON);
	closeModal();
	getHolidayFromUI();
	getSessionData();
	if(JSON.stringify(listHolidayData) === JSON.stringify(getUIHolidayData) ){
		document.getElementById("response").innerHTML ="Please Do Some Changes" ;
	}else{
	http.open("PUT", "http://localhost:8085/HRMS/holiday/update", true);

	http.setRequestHeader("Content-Type", "application/json; charset=utf8");
	http.onreadystatechange = function() {// Call a function when the state
		if (http.readyState == 4 && http.status == 200) {
			var json = eval("(" + this.responseText + ")");
			var data = json.message;
			document.getElementById("response").innerHTML = data;
			getDataHtmlField();
			//window.location="CreateHoliday.html";
			sessionStorage.clear();
		}
	
	}
	}
	http.send(myJSON);
}
}
function addOrUpdateHoliday(){
	var flag= sessionStorage.getItem("flag");
	if(flag==null){
		addHoliday();
	}else if(flag==1){
		updateHoliday();
		
	}else{
		
	}
}
function getHolidayIdFromHtml(){
	document.getElementById("data").value = sessionStorage.getItem("id");
	document.getElementById("holidayDate").value = sessionStorage.getItem("holidayDate");
	document.getElementById("holidayName").value = sessionStorage.getItem("holidayName");
	
}
function getHolidayFromUI(){
	//var url = "http://localhost:8085/HRMS/holiday/create";
	var id=sessionStorage.getItem("id");
	var holidayDate = document.getElementsByName("holidayDate")[0].value;
	var holidayName = document.getElementsByName("holidayName")[0].value;
	

	 getUIHolidayData = {
			id:id,
			holidayDate : holidayDate,
			holidayName : holidayName,
		
	}
	 return getUIHolidayData
}
function createHolidayTable(holidayData){
	var tbody = "";

	for ( var data in holidayData) {
		tbody += "<tr>"
		var id = holidayData[data].id;
		/*tbody += "<td>" + id + "</td>"*/
		var holidayDate = holidayData[data].holidayDate;
		tbody += "<td>" + holidayDate + "</td>"
		/*var password = empData[data].password;
		tbody += "<td>" + password + "</td>"*/
		var holidayName = holidayData[data].holidayName;
		tbody += "<td>" + holidayName + "</td>"
		
		tbody += "<td>" + "<button  value='Delete' onclick='deleteHoliday (" +id+ ")' >Delete</button>"
				+ "</td>";
		tbody += "<td>" + "<button  value='Edit' onclick='editHoliday("+id+")' >Edit</button>"
		+ "</td>";
		tbody += "<tr>";

	}
	tbody += "</table>";
		return tbody
}

function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
 
}

function closeModal() {
document.getElementById('modal').style.display = 'none';
document.getElementById('fade').style.display = 'none';
}
function getDataHtmlField(){
	document.getElementsByName("holidayDate")[0].value="";
	document.getElementsByName("holidayName")[0].value="";
}
function getSessionData(){
	var holidayDate = sessionStorage.getItem("holidayDate");
	var holidayName = sessionStorage.getItem("holidayName");
	 listHolidayData={
			 holidayDate:holidayDate,
			 holidayName:holidayName
	}	
	return listEmpData;
}