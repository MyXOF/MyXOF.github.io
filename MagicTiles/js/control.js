/*
 * control.js
 * 功能：实现游戏流程的控制
 * 实现：赵志恒、徐毅
 * 主要技术：HTML、CSS、jQuery
*/

var START = 0;
$(document).ready(function(){
	var timerid = 0;
	var boardw = 10, boardh = 6;
	var move = false;
	var curid = "";
	var offsetx, offsety;
	var blockattr = {
		width: 2,
		height: 2,
		blocks: 3,
		colors: 3
	};
	var game_mode;
	var GAMEOVER = 0;


	/*游戏结束的操作*/
	function Gameover(){
		GAMEOVER = 1;
		play_SE("over");
		$(".blockcontainer").trigger("mouseup");
		$("#ring-1").css("-webkit-animation-play-state", "paused");
		$(".blank").css("-webkit-animation-play-state", "paused");
		clear_Tools();
		show_Message("gameover");
	}

	/*根据不同的游戏模式初始化*/
	function BoardInit(mode){
		if (!mode){
			mode = "Time";
		}
		toolcost = {
				"Row" : 0,
				"Column" : 0,
				"Color" : 20,
				"Block" : 20,
				"Cross" : 10,
				"Bomb" : 100,
				"Female" : 30,
				"Male" : 30
		};
		tooldelta = {
				"Row" : 2,
				"Column" : 1,
				"Color" : 5,
				"Block" : 2,
				"Cross" : 1,
				"Bomb" : 10,
				"Female" : 1,
				"Male" : 2
		};
		clearInterval(timerid);
		set_Timer(1);
		$(".timer").css("display", "none");
		/*禅模式*/
		if (mode == "Time"){
			boardw = 6;
			boardh = 6;
			blockattr.width = 3;
			blockattr.height = 3;
			blockattr.blocks = 4;
			blockattr.colors = 5;
			build_Init(6, 6, 'valid');
			set_Tools(["Row", "Column", "Block", "Color"], "block");
			set_Tools(["Cross", "Bomb", "Female", "Male"], "none");
			toolcost["Row"] = 10;
			toolcost["Column"] = 10;
			toolcost["Block"] = 20;
			toolcost["Color"] = 50;
			tooldelta["Row"] = 0;
			tooldelta["Column"] = 0;
			tooldelta["Block"] = 0;
			tooldelta["Color"] = 0;
			set_Score(100);	
			set_Timer(60);
			$(".timer").css("display", "block");
			timerid = setInterval(function(){
				var time = get_Timer();
				if (time > 0){
					set_Timer(time - 1);
					if (time <= 10){
						play_SE("alert");
					}
				}
				else{
					clearInterval(timerid);
					Gameover();
				}
			}, 1000);
		}
		/*背包模式*/
		if (mode == "Package"){
			boardw = 10;
			boardh = 6;
			blockattr.width = -1;
			blockattr.height = -1;
			blockattr.blocks = -1;
			blockattr.colors = 1;
			build_Init(6, 10, 'valid');
			set_Tools(["Bomb"], "block");
			set_Tools(["Cross", "Female", "Male", "Row", "Column", "Block", "Color"], "none");
			toolcost["Bomb"] = 0;
			tooldelta["Bomb"] = 100000;
			set_Score(0);
		}
		/*标准模式*/
		if (mode == "Normal"){
			boardw = 10;
			boardh = 6;
			blockattr.width = 2;
			blockattr.height = 2;
			blockattr.blocks = -1;
			blockattr.colors = 1;
			blockcost = 10;
			blockdelta = 10;
			build_Init(6, 10, 'available');
			build_Attr([0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
					   [3, 4, 5, 6, 3, 4, 5, 6, 3, 4, 5, 6], "valid");
			set_Tools(["Row", "Column"], "block");
			set_Tools(["Cross", "Bomb", "Female", "Male", "Block", "Color"], "none");
			set_Score(0);
		}
	}

	/*标准模式中道具的出现条件*/
	function new_Tools(){
		var count = count_Valid();
		blockattr.colors = Math.floor(count / 12);
		if (count >= 16){
			set_Tools(["Block"], "block");
		}
		if (count >= 20){
			set_Tools(["Color"], "block");
		}
		if (count >= 28){
			set_Tools(["Cross"], "block");
		}
		if (count >= 36){
			set_Tools(["Bomb"], "block");
		}
		if (count >= 48){
			set_Tools(["Female"], "block");
		}
		if (count >= 60){
			set_Tools(["Male"], "block");
		}
		if (count >= 32){
			blockattr.width = 3;
			blockattr.height = 3;
		}
		if (count >= 48){
			blockattr.width = 4;
			blockattr.height = 4;
		}
	}

	function get_Boxid(id){
		var value = id.replace(/[^0-9]/ig,""); 
		return "c" + value;
	}

	/*寻找待选方块和棋盘上方块的交集*/
	function find_Cover(id){
		var height = $("#" + id).find("tr").length;
		var width = $("#" + id).find("td").length / height;
		var sumvalid = 0;
		var x = [], y = [];
		var coor = {};
		var pos = {};
		for (var i = 0; i < height; ++i)
			for (var j = 0; j < width; ++j){
				var item = $("#" + id + "-" + i + "-" + j);
				if (item.attr("class") == "valid"){
					sumvalid++;
					coor = get_Coor(i, j, id + "-");
					pos = get_Pos(coor.left, coor.top, boardw, boardh);
					if (pos.x >= 0 && pos.y >= 0 && 
						$("#" + pos.x + "-" + pos.y).attr("class") == "valid" &&
						$("#" + pos.x + "-" + pos.y).text() == ""){
						x.push(pos.x);
						y.push(pos.y);
					}
				}
			}
		return {
			xs : x,
			ys : y,
			sv : sumvalid
		};
	}

	/*替换格子*/
	function replace_Block(id){
		var height = $("#" + id).find("tr").length;
		var width = $("#" + id).find("td").length / height;
		var coor = {};
		var pos = {};
		var source = $(""), target = $("");
		for (var i = 0; i < height; ++i)
			for (var j = 0; j < width; ++j){
				source = $("#" + id + "-" + i + "-" + j);
				if (source.attr("class") == "valid"){
					coor = get_Coor(i, j, id + "-");
					pos = get_Pos(coor.left, coor.top, boardw, boardh);
					target = $("#" + pos.x + "-" + pos.y);
					$(target).text($(source).text());
					$(target).css("background-color", $(source).css("background-color"));
				}
			}
	}

	/*格子的选取、拖拽、放下*/
	$(document).on("mousedown",".blockcontainer",function(e){
		if (GAMEOVER){
			return ;
		}
		if (curid){
			return;
		}
		clear_Tools();
		move = true;
		curid = this.id;
		find_Cover(curid);
		set_Mode(this.id, "Move");
		$(".area-main").prepend($(this));
		offsetx = $(this).find("table").width() / 2 + 240;
		offsety = $(this).find("table").height() / 2;
		$(this).css("position", "absolute");
		$(this).css({
				"top":e.pageY - offsety + "px",
				"left":e.pageX -offsetx + "px"
		});
		$(this).css("cursor", "url('./image/wrong.cur'), auto");
		return false;
	});

	$(document).on("mouseup",".blockcontainer", function(){
		var tmp = find_Cover(curid);
		if (tmp.sv > 0 && tmp.xs.length == tmp.sv){
			play_SE("put");
			replace_Block(curid);
			rebuild_Div(blockattr.height, blockattr.width, blockattr.blocks, curid, blockattr.colors);
		}
		move = false;
		$(this).css({"position":"relative",
			"top":"auto",
			"left":"auto"
		});
		set_Mode(this.id, "Static");
		$("#" + get_Boxid(curid)).append($(this));
		$(this).css("cursor", "pointer");
		clear_Opacity(boardw, boardh);
		curid="";
		return false;
	});

	/*拖拽事件*/
	$(document).mousemove(function(e){
		if (GAMEOVER){
			return ;
		}
		if (move){
			var coor = get_Coor(0, 0, curid + "-");
			var pos = get_Pos(coor.left, coor.top, boardw, boardh);
			clear_Opacity(boardw, boardh);
			var tmp = find_Cover(curid);
			for (var i = 0; i < tmp.xs.length; ++i){
				$("#" + tmp.xs[i] + "-" + tmp.ys[i]).css("opacity", "0.5");
			}
			if (tmp.xs.length == tmp.sv){
				$("#" + curid).css("cursor", "url('./image/check.cur'), auto");
			}
			else{
				$("#" + curid).css("cursor", "url('./image/wrong.cur'), auto");
			}
			$("#" + curid).css({
				"top":e.pageY - offsety + "px",
				"left":e.pageX - offsetx + "px"
			});
		}
	});

	/*道具的作用范围显示*/
	$(document).on("mouseenter", ".area-board .valid", function(){
		var curtool = $(".selected");
		if (curtool.length > 0){
			var coor = $(this).attr("id");
			var x = parseInt(coor[0]);
			var y = parseInt(coor[2]);
			var coors = get_Toolblock(x, y, $(curtool).attr("id"));
			for (var i = 0; i < coors.xs.length; ++i){
				$("#" + coors.xs[i] + "-" + coors.ys[i]).css("opacity", "0.5");
			}
			$(this).css("opacity", "0.5");
		}
	});

	$(document).on("mouseleave", ".area-board .valid", function(){
		var curtool = $(".selected");
		if (curtool.length > 0){
			var coor = $(this).attr("id");
			var x = parseInt(coor[0]);
			var y = parseInt(coor[2]);
			var coors = get_Toolblock(x, y, $(curtool).attr("id"));
			for (var i = 0; i < coors.xs.length; ++i){
				$("#" + coors.xs[i] + "-" + coors.ys[i]).css("opacity", "");
			}
		    $(this).css("opacity", "");
		}
	});
	
	/*消除格子，判断游戏是否结束*/
	$(document).on("click", ".area-board .valid", function(){
		if (GAMEOVER){
			return ;
		}
		var curtool = $(".selected");
		if (curtool.length > 0){
			var coor = $(this).attr("id");
			var x = parseInt(coor[0]);
			var y = parseInt(coor[2]);
			if (use_Tools(x, y, $(curtool).attr("id"))){
				play_SE("tool");
				clear_Tools();
				var coors = get_Toolblock(x, y, $(curtool).attr("id"));
				for (var i = 0; i < coors.xs.length; ++i){
					$("#" + coors.xs[i] + "-" + coors.ys[i]).css("opacity", "");
				}
		    	$(this).css("opacity", "");
			}
		}
		var over = true;
		var curscore = get_Score();
		for (var i in toolcost){
			if ($("#" + i.toString()).css("display") == "block" && curscore >= toolcost[i]){
				over = false;
			}
		}
		if (over){
			Gameover();
		}
	});

	/*买格子*/
	$(document).on("mouseenter", ".area-board .available", function(){
		$(this).text(blockcost);
		$(this).css("opacity", "0.8");
	});

	$(document).on("mouseleave", ".area-board .available", function(){
		$(this).text("");
		$(this).css("opacity", "");
	});

	$(document).on("click",  ".area-board .available", function(){
		var curscore = get_Score();
		if (curscore >= blockcost){
			play_SE("buy");
			curscore -= blockcost;
			$(this).attr("class", "valid");
			$(this).text("");
			$(this).css("opacity", "");
			blockcost += blockdelta;
			new_Tools();
		}
		set_Score(curscore);
	});
	
	/*使用道具*/
	$(document).on("click", ".tools", function(){
		if (GAMEOVER){
			return ;
		}
		var tmp = $(this).attr("class");
		clear_Tools();
		if (tmp == "tools selected"){
			return ;
		}
		var type = $(this).attr("id");
		if (type){
			if (get_Score() - toolcost[type] < 0){
				return ;
			}
			$(this).attr("class", "tools selected");
			var cost = toolcost[type];
			set_Score(get_Score() - cost);
			$(".score").css("color", "#FF0000");
		}
	});
	
	/*道具花费显示*/
	$(document).on("mouseenter", ".tools", function(){
		$(this).text(toolcost[$(this).attr("id")]);
	});

	$(document).on("mouseleave", ".tools", function(){
		$(this).text($(this).attr("id"));
	});

	/*开始游戏选择界面*/
	$(".message").on("click", ".message-button", function(){
		var type = $(this).attr("id");
		game_mode = type;
		GAMEOVER = 0;
		clear_Tools();
		BoardInit(type);
		$(".area-spinning").empty();
		var ring =  $('<div id = "ring-1" class = "Ring">');
		$('.area-spinning').append(ring);
		CreateRing(document.getElementById('ring-1'),0);
		for (var i = 0; i < 12; ++i){
			var tmp = build_Div(blockattr.height, blockattr.width, blockattr.blocks, "bl" + i, blockattr.colors);
			$("#c" + i).append(tmp);
		}
		close_Message();
		if(!DOOR_STATUS){
			OpenDoor("door");
			START = 1;
		}
	});

	/*以下是menu控制事件*/
	/*开始游戏*/
	$(document).on("click", "#button-start", function(){
		show_Message("start");
		return ;
	});
	
	/*游戏帮助*/
	$(document).on("click", "#button-help", function(){
		if ($(".message").attr("id") == "help"){
			close_Message();
		}
		else{
			show_Message("help");
		}
	});

	/*结束游戏*/
	$(document).on("click","#button-exit",function(){
		//debugger;
		if(!DOOR_STATUS){	
			clearInterval(timerid);
			close_Message();
			CloseDoor("door");
			START = 0;
		}
		
	})
});


