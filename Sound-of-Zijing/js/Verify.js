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

function SetComfirmList(){
	var width =  document.body.scrollWidth;	
	var js_comfirmlist = $("#Confirm-List");
	if(width * 0.8 > 400){

		
		js_comfirmlist.css("width",400);
	}
	else if(width < 250){
		js_comfirmlist.css("width",width*0.9);
		js_comfirmlist.css("margin","auto");
		$("#Username").css("height","20px");
		$("#Password").css("height","20px");
	}

}

function SetForceBlindText(){
	
	var js_ForceBlindText = $("#ForeBlindText");

	if(js_ForceBlindText.hasClass("BlindDisActive")){
		js_ForceBlindText.attr("class","BlindActive");
		js_ForceBlindText.css("color","rgb(200,0,0)");
	}
	else{
		js_ForceBlindText.attr("class","BlindDisActive");
		js_ForceBlindText.css("color","black");
	}

                
}

$(document).ready(function(){
	SetFooter();
	SetComfirmList();
	

	//alert(height);
	$("#Cancel-Button").click(function(){
		$("#VerifyNOIMG").css("display","none");
		$("#Cancel-Button").css("display","none");
		$("#Confirm-List").css("display","block");
		$("#Username").val("");
		$("#Password").val("");

		
		//$("#Forcebind").removeAttr("checked");
		//$("#ForeBlindText").attr("class","BlindDisActive");
		//$("#ForeBlindText").css("color","black");

		$("#results").text("请填写信息进行认证。");

	});

	$("#Forcebind").mousedown(function(){
		SetForceBlindText();
	});
});




