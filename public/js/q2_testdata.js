var itemJson;

jei_ajax_httpType("GET", "item/D00219A02", null, function(data) {
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
	type: "12",
	grade:"D",
	header:[
		{type:"text" ,"style":"default", value: "Which sign makes the statement true ?"},
		{type:"math" ,"style":"default", value: "10322 \\times 3"},
		{type:"text" ,"style":"default", value: " ? "},
		{type:"math" ,"style":"default", value: "31422"}
	],
	choices: {
		place: { section: "1"},
		tuple : [
			{type:"text", src:">"},
			{type:"text", src:"="},
			{type:"text", src:"<"}
		]
	}
};*/