function selectMuti(obj) {
	if(obj.hasClass('sel')){
		obj.removeClass("sel");
		$("#checkbox_"+obj.attr('id')).prop("checked",false);
	}else {
		obj.addClass("sel");
		$("#checkbox_"+obj.attr('id')).prop("checked",true);
	}
}
function selectOnly(obj) {
	$("li.sel").removeClass('sel');
	obj.find("input").prop("checked",true);	
	obj.addClass("sel");
}
function selectOnlyNum(obj) {
		$("li.sel").removeClass('sel');
	obj.addClass("sel");
	$("li span.checkNum.on").removeClass("on");
	obj.find("span.checkNum").addClass("on");
	obj.find("input.checkNumHide").prop("checked",true);	
}
function init(){
	fadeOutResult();
	initEvent();
	$('.eMath').mathquill();
	$('.eMathAnswer').mathquill('editable');
}
function initEvent(){
	$("li.es").on("click",function(e){
		var problemType = itemJson.type;
		if (problemType === "13") { //다지 선다
			selectMuti($(this));
		}
		else if (problemType === "12" ) { //다지 선택 
			selectOnly($(this));
		}else if (problemType === "22" ) {
			selectOnlyNum($(this));
		}

	});
	
	//$(".es_t1").css("float",(itemJson.place.section === "1")? "none" : "left").css("width", (ratio == 100) ? "50%" : ratio+"%");
}

function fadeOutResult() {
	$("div.feedbackWrap").fadeOut("fast");
    $("div.right").fadeOut("fast");
    $("div.wrong").fadeOut("fast");
    $("div.fill").fadeOut("fast");
}

function jei_ajax_httpType(httpType, data_url, params, callback) {
	$.ajax({
		type: httpType,
		url: data_url,
		data: params,
		beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json");
        },
		success: function(data) {
			console.log("SUCCESS : " + JSON.stringify(data));
	      	callback.apply(this, [data]);
		},
		compelte: function(data) {
				
		},
		error: function(xhr, status, error) {
			alert("서버 통신중 에러가 발생했습니다.\n잠시 후 사용해 주세요.")
			console.log("POST Error");
			console.log("xhr : " + JSON.stringify(xhr));
			console.log("status : " + JSON.stringify(status));
			console.log("error : " + JSON.stringify(error));
		}
			
	});
}
