$("#autosubmit").mouseover(e => {
	var id = e.currentTarget.childNodes[1].childNodes[0].id || e.currentTarget.childNodes[1].childNodes[0].childNodes[0].id
	$("#description").html(getSettingsDoc(id))
})

function getSettingsDoc(id) {
	switch (id) {
		case 'autosubmit':
			return "The checkout form will be submitted automatically if this option is enabled. Auto add to cart : item will be automatically add to cart to gain time."
	}
}