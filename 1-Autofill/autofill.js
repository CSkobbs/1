const

	DATA = JSON.parse(localStorage["data"]),
	generateExpireDate = () => {
		const expireMonth = document.getElementById("card_month")
		for (var m = 1; m <= 12; m++) {
			m = m.toString()
			m = m.length < 2 ? "0" + m : m
			var option = document.createElement("option")
			option.text = m, option.value = m
			expireMonth.add(option)
		}

		const expireYear = document.getElementById("card_year"), currentYear = new Date().getFullYear()
		for (var y = currentYear; y <= currentYear + 10; y++) {
			var option = document.createElement("option")
			option.text = y, option.value = y
			expireYear.add(option)
		}
	},
	Data = {
		fieldsShipping: ["name",
				"email",
				"phone",
				"address1",
				"address2",
				"address3",
				"city",
				"zip",
				'state',
				'province',
				"country"],
		fieldsBilling: ["card_number",
						"card_year",
						"card_month",
						"card_type",
						"cvv"],
		fill: () => {
			var inputs = Data.fieldsShipping.concat(Data.fieldsBilling)
			
			inputs.forEach(data => {

				// Boucle de remplissage des valeurs : 
				// for (int i=0; i<data.size();i++){
				// 	DATA[data]= champ data avec id correspondant
				// }

				if (typeof DATA[data] !== "undefined")
					document.getElementById(data).value = DATA[data]

				//display province/state if country is canada/usa
				if (data == 'country') {
					if (DATA.country == "USA")
						document.getElementById('state_row').style = ''
					else if (DATA.country == "CANADA")
						document.getElementById('province_row').style = ''
				}
			})
		},
		checkIfShippingFilled: cb => {
			var error = ''
			Data.fieldsShipping.forEach((input, index, array) => {
				if (document.getElementById(input).value == '' && $('#'+input).is(":visible")) {
				// if (document.getElementById(input).value == '') {
					//address2 and 3 are optional
					if (input != "address2" && input != "address3") {
						error += "- Field " + input + " is empty.<br/>"
					}
				}

				if (index === array.length - 1) cb(error)
			})
		},
		checkIfBillingFilled: cb => {
			var error = ''
			Data.fieldsBilling.forEach((input, index, array) => {
				if (document.getElementById(input).value == '' && $('#'+input).is(":visible")) {
				// if (document.getElementById(input).value == '') {
					error += "- Field " + input + " is empty.<br/>"
				}
				if (index === array.length - 1) cb(error)
				// display the card form if id !=paypal
			})
		}
	},
	displayShipping = () => {
        var x = document.getElementById("shipping");
        var y = document.getElementById("payment");
        var z = document.getElementById("paymentHeader");
        
        x.style.display = x.style.display === 'none' ? '' : 'none';
        y.style.display = y.style.display === 'none' ? '' : 'none';
        z.style.display = z.style.display === 'none' ? '' : 'none';
    },
	countryChange = () => {
		var country = document.getElementById('country')
		if (country.value == "USA") {
			document.getElementById('state_row').style = ''
			document.getElementById('province_row').style.display = 'none'
		}
		else if (country.value == "CANADA") {
			document.getElementById('province_row').style = ''
			document.getElementById('state_row').style.display = 'none'
		} else {
			document.getElementById('province_row').style.display = 'none'
			document.getElementById('state_row').style.display = 'none'
		}
	},
	// Edit billing layout : responsive
	billingChange = () => {
		var card = document.getElementById('card_type')
		if (card.value != "paypal") {
			var x = document.getElementById('card_number');
        	var y = document.getElementById('card_month');
        	var z = document.getElementById('card_year');
        	var a = document.getElementById('cvv');
        	
        	x.style.display = x.style.display === 'none' ? '' : 'none';
        	y.style.display = y.style.display === 'none' ? '' : 'none';
        	z.style.display = z.style.display === 'none' ? '' : 'none';
        	a.style.display = a.style.display === 'none' ? '' : 'none';
		}
		else {
			document.getElementById('card_number').style.display = 'none'
        	document.getElementById('card_month').style.display = 'none'
        	document.getElementById('card_year').style.display = 'none'
        	document.getElementById('cvv').style.display = 'none'
		}
	},
	editShipping = () => {
		console.log("editShipping")
		Data.checkIfShippingFilled(r => {
			if (r.length == 0) {
				console.log("shipping ok")
				// dsp("Information has been updated", "success")
				var dataObj = JSON.parse(localStorage["data"])
				Data.fieldsShipping.forEach((data, index, array) => {
					dataObj[data] = document.getElementById(data).value
					if (index === array.length - 1) 
						localStorage["data"] = JSON.stringify(dataObj)
				})
			// } else dsp(r, "error")
			} else console.log(r)
		})
	},
	editBilling = () => {
		Data.checkIfBillingFilled(r => {
			if (r.length == 0) {
				//dsp("Information has been updated", "success")
				var dataObj = JSON.parse(localStorage["data"])
				Data.fieldsBilling.forEach((data, index, array) => {
					dataObj[data] = document.getElementById(data).value
					if (index === array.length - 1) 
						localStorage["data"] = JSON.stringify(dataObj)
				})
			// } else dsp(r, "error")		
			} else console.log("erro shipping")	
		})
	}

const 
	checkBox = ["autoFill","terms"],

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
		editShipping()
		editBilling()
		updateParams()
	}
const
	 _init = () => {
		generateExpireDate()
		Data.fill()
	}



if (typeof localStorage["data"] !== "string") localStorage["data"] = "{}"
if (typeof localStorage["params"] !== "string") localStorage["params"] = "{}"
if (typeof localStorage["keyword"] !== "string") localStorage["keyword"] = '{"0": {"category":"jackets", "keyword": "", "color": "", "size": "Small"}}'
if(localStorage['cgu'] === undefined) localStorage['cgu'] = false

document.getElementById('country').onchange = countryChange
document.getElementById('card_type').onchange = billingChange


// Verifier si case est cochée
document.getElementById('autoFill').onclick = displayShipping


// si case terms est cochée alors update des paramètres / checkbox invisible enable
document.getElementById("submit").onclick = _edit




document.title = "Autofill"

document.body.onload = _init




