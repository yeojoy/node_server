var itemJson;

jei_ajax_httpType("GET", "item/D00219A03", null, function(data) {
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
	type: "11",
	grade:"D",
	header:[
		{type:"text" ,"style":"default", value: "Fill Blank."},
		{type:"math" ,"style":"default", value: "10322 \\times 3"},
		{type:"text" ,"style":"default", value: " = ?"},
	],
	
	choices: {
		place: { section: "3"},
		tuple : [
			{type:"input", src:""}
		]
	}	
};*/