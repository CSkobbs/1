if (typeof localStorage["params"] !== "string") localStorage["params"] = "{}"
if(localStorage['cgu'] === undefined) localStorage['cgu'] = false




const 
	Delay = () => {
    	var x = document.getElementById("delayInput").value;
    	console.log(x +'s')
	}

	displayDelay = () => {
		console.log("call displayDelay")
		if (document.getElementById('Delay').checked) {
			document.getElementById("delayStepper").style.display = '';
		} else {
			document.getElementById("delayStepper").style.display = 'none';
		}
    }

const 
	checkBox = ["Delay","terms"],

	updateParams = () => {

		var dataObj = {}

		checkBox.forEach((data) => {

			
			var value = document.getElementById(data).checked
			
			if(value != "")
					dataObj[data] = value
					localStorage["params"] = JSON.stringify(dataObj)
		})
		console.log("params edit : success")
	}

//fill inputs with localStorage
checkBox.forEach(data => {
	if (typeof JSON.parse(localStorage["params"])[data] !== "undefined") {
		if (document.getElementById(data).type != "checkbox")
			document.getElementById(data).value = JSON.parse(localStorage["params"])[data]
		else
			document.getElementById(data).checked = JSON.parse(localStorage["params"])[data]
	}
	
})


const
	_edit = () => {
		Delay()
		updateParams()
	}
	_init = () => {
		displayDelay()
	}

document.getElementById("submit").onclick = _edit
document.getElementById("Delay").onclick = displayDelay
document.body.onload = _init

document.title = "Checkout"