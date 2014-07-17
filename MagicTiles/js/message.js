/*
 * message.js
 * 功能：实现开始游戏、游戏帮助等说明信息的蒙版显示、隐藏
 * 实现：赵志恒
 * 主要技术：jQuery
 * 函数功能说明：
 * show_Message 显示说明信息
 * close_Message 关闭说明信息
*/

/*显示说明信息*/
function show_Message(type, e){
	if (!type){
		return ;
	}
	var title = $(".message-title");
	var content = $(".message-content");
	if (type == "help"){
		$(".message").attr("id", "help");
		$(title).html("<h2>帮助</h2>");
		$(content).html("<h2>版本说明</h2>\n" + 
						"<p>当前版本为v1.0版本，支持标准模式、禅模式、背包模式。储存、载入以及成就系统暂未实现</p>\n" +
						"<h2>游戏规则</h2>\n" +
						"<p>1. 游戏的目标是在规则限定下获得更多的分数。</p>\n" +
						"<p>2. 游戏开始后，点击转轮上的方块可以将其拖动到下方的棋盘中。</p>\n" +
						"<p>3. 点击右边道具栏的道具可以使用道具消除方格中的方块，同时得到所有消去方块的分数。</p>\n" +
						"<p>4. 不同的道具消耗对应的分数，当分数不足时不能使用相应道具。\n");
	}
	if (type == "start"){
		$(".message").attr("id", "start");
		$(title).html("<h2>开始游戏</h2>");
		$(content).html("<h2>请选择游戏模式</h2>\n" +
						"<p>标准模式：从3*4小区域开始，可以用分数扩展区域。随着区域的扩大，会出现更多的道具。</p>\n" +
						"<p>禅模式：游戏时间为60s，在限定时间内取得尽量多的分数</p>\n" +
						"<p>背包模式：只有一次摆放机会，摆放完成后用Bomb消除，类似于背包问题>_<~</p>\n" +
						"<div>\n" +
						"<ul class='menu-group clearfix'>\n" +
						"<li class='message-button' id='Normal'><a>标准模式</a>\n" +
						"<li class='message-button' id='Time'><a>禅模式</a>\n" +
						"<li class='message-button' id='Package'><a>背包模式</a>\n" +
						"</div>");
	}
	if (type == "gameover"){
		$(".message").attr("id", "start");
		$(title).html("<h2>游戏结束</h2>");
		$(content).html("<h2>最终得分：" + get_Score() + "</h2>");
	}
	$(".message").css("display", "block");
}

/*关闭说明信息*/
function close_Message(){
	$(".message").css("display", "none");
	$(".message").attr("id", "");
	$(".message-title").empty();
	$(".message-content").empty();
}
