/*整体布局*/
function wholelayout(){
	var height = $(window).height();
	var width = $(window).width();
	var h = Math.max(470, height - 30);
	$("div.area-whole").height(h);
}


/*调用*/
$(document).ready(function(){
	wholelayout();
});

