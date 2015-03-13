var itemJson;

jei_ajax_httpType("GET", "item/D00219A01", null, function(data) {
	itemJson = {
		id : data.id,
		type : data.type,
		grade : data.grade,
		header : eval("("+data.header+")"),
		choices : eval("("+data.choices+")")
	};
	console.log(itemJson);
});

/*var itemJson = { 
	id: "1", 
	type: "multiple_choice",
	grade:"D",
	header:[
		{type:"text" ,"style":"default", value: "Select the groups of three."},
	],
	place: { section: "3"},
	choices: [
		{type:"image", src:"p_img/Test-image_01.png"},
		{type:"image", src:"p_img/Test-image_02.png"},
		{type:"image", src:"p_img/Test-image_03.png"},
		{type:"image", src:"p_img/Test-image_04.png"},
		{type:"image", src:"p_img/Test-image_05.png"},
		{type:"image", src:"p_img/Test-image_06.png"}
	]
};*/