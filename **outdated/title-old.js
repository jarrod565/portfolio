var myDynamics = ["Lead", "Designer", "Researcher", "Developer"];

dynamicCounter = 0;
setInterval(function(){
	selectedText = myDynamics[dynamicCounter];
	thislength = selectedText.length + 10;
	var newIntervalCount = 1;
	document.getElementById("jobTitle").innerHTML = "";
	var innterInterval = setInterval(function(){

		document.getElementById("jobTitle").innerHTML = document.getElementById("jobTitle").innerHTML + myDynamics[dynamicCounter].substring(newIntervalCount - 1 , newIntervalCount);
		newIntervalCount = newIntervalCount + 1;
		if (newIntervalCount > thislength) {
			clearInterval(innterInterval);
		}

	}, 60);

	if (dynamicCounter >= 3) {
		dynamicCounter = 0;
	}else{
		dynamicCounter = dynamicCounter + 1;
	}
}, 4000);
