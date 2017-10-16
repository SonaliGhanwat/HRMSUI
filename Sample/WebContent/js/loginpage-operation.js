var data
function login(){
var http = new XMLHttpRequest();
	var employee = getEmployeeDataFromUI();
	
	//validate
	
	//if(validateEmployee(employee)){
		document.getElementById('results').innerHTML = '';
		openModal();
		var myJSON = JSON.stringify(employee);
		console.log(employee);
		http.open("POST", "http://localhost:8085/HRMS/employee/login", true);
		closeModal();
		http.setRequestHeader("Content-Type", "application/json; charset=utf8");
		http.onreadystatechange = function() {
			
			if (http.readyState == 4 && http.status == 200) {
				var json = eval("(" + this.responseText + ")");
				var data = json.message;
				var code = json.code;
				if(code===1){
					document.getElementById("response").innerHTML = data;
				}else if(code===0){
					getDataHtmlFieldId();
					window.location="menu.html";
					document.getElementById("response").innerHTML = data;
					
				}
				
				
			}
		}
	
		http.send(myJSON);
	//}
}
function getEmployeeDataFromUI(){
	
	var userid = document.getElementsByName("userid")[0].value;
	var password = document.getElementsByName("password")[0].value;
	 data={
			userid:userid,
			password:password
	}
	 return data;
}
function getDataHtmlFieldId(){
	document.getElementsByName("userid")[0].value = "";
	document.getElementsByName("password")[0].value = "";
}
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
 
}

function closeModal() {
document.getElementById('modal').style.display = 'none';
document.getElementById('fade').style.display = 'none';
}
	