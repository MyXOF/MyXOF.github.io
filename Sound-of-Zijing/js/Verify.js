/*
	* JS Control For Verify.html
	* Author: XuYi
	* Last modified :2014/11/18
*/
function VerifySuccess(){
	$("#Confirm-List").css("display","none");
	$("#VerifyOKIMG").css("display","block");


}

function VerifyFail(){
	$("#Confirm-List").css("display","none");
	$("#VerifyNOIMG").css("display","block");
	$("#Cancel-Button").css("display","block");
}

function SetFooter(){
	var height =  document.body.scrollHeight;

	//$("#main-content").css("height",height);

	var js_main_content = $("#main-content");
	var set = js_main_content.hasClass("Setted");
	//debugger;
	if(!set){
		js_main_content.addClass("Setted");
		js_main_content.css("height",height);
	}
	$("body").css("height",height);

	
}

$(document).ready(function(){
	SetFooter();
	
	

	//alert(height);
	$("#Cancel-Button").click(function(){
		$("#VerifyNOIMG").css("display","none");
		$("#Cancel-Button").css("display","none");
		$("#Confirm-List").css("display","block");
		$("#Username").val("");
		$("#Password").val("");
		$("#results").text("请填写信息进行认证。");
	});
});




