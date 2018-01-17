const 
	delay = () => {
    	var x = document.getElementById("delayInput").value;
    	alert("delay "+x+"s");
	}

	displayDelay = () => {
        var x = document.getElementById("delay");
        x.style.display = x.style.display === 'none' ? '' : 'none';
    }

document.getElementById("submit").onclick = delay
document.getElementById("toggle2").onclick = displayDelay

document.title = "Checkout"