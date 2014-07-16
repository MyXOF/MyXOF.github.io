function show_Message(type, e){
	if (!type){
		return ;
	}
	var title = $(".message-title");
	var content = $(".message-content");
	if (type == "help"){
		$(title).html("<h2>帮助</h2>");
		$(content).html("<h2>版本说明</h2>\n" + 
						"<p>当前版本为v0.9版本，只支持时间模式，更多模式及功能将在正式版本中放出。</p>\n" +
						"<h2>游戏规则</h2>\n" +
						"<p>1. 游戏时间为60s，游戏的目标是获得更多的分数。</p>\n" +
						"<p>2. 游戏开始后，点击转轮上的方块可以将其拖动到下方的棋盘中。</p>\n" +
						"<p>3. 点击右边道具栏的道具可以使用道具消除方格中的方块，同时得到所有消去方块的分数。</p>\n" +
						"<p>4. 不同的道具消耗对应的分数，当分数不足时不能使用相应道具。\n");
	}
	$(".message").css("display", "block");
}

function close_Message(){
	$(".message").css("display", "none");
	$(".message-title").empty();
	$(".message-content").empty();
}
