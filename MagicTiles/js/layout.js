/*
 * layout.js
 * 功能：调整窗口布局
 * 实现：赵志恒
 * 说明：本来想用这个文件控制窗口布局自适应，后来都写到css里了
*/

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

