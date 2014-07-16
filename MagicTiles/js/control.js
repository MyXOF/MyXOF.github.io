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

	function BoardInit(mode){
		if (!mode){
			mode = "Time";
		}
		if (mode == "Time"){
			boardw = 10;
			boardh = 6;
			blockattr.width = 3;
			blockattr.height = 3;
			blockattr.blocks = 4;
			blockattr.colors = 5;
			build_Init(6, 10, 'valid');
			set_Score(100);	
			set_Timer(60);
			$(".timer").css("display", "block");
			clearInterval(timerid);
			timerid = setInterval(function(){
				var time = get_Timer();
				if (time > 0){
					set_Timer(time - 1);
				}
				else{
					clearInterval(timerid);
				}
			}, 1000);
		}
	}

	function get_Boxid(id){
		var value = id.replace(/[^0-9]/ig,""); 
		return "c" + value;
	}

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

	$(document).on("mousedown",".blockcontainer",function(e){
		if (get_Timer() <= 0){
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
		if (tmp.xs.length == tmp.sv){
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
	});

	$(document).mousemove(function(e){
		if (get_Timer() <= 0){
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
			/*
			$(that).css({
				"height":e.pageX + "px",
				"width":e.pageY + "px;
			});*/
		}
	});

	$(document).on("mouseenter", ".area-board .valid", function(){
		var curtool = $(".selected");
		if (curtool.length > 0){
			var coor = $(this).attr("id");
			var x = parseInt(coor[0]);
			var y = parseInt(coor[2]);
			var coors = get_Toolblock(x, y, $(curtool).text());
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
			var coors = get_Toolblock(x, y, $(curtool).text());
			for (var i = 0; i < coors.xs.length; ++i){
				$("#" + coors.xs[i] + "-" + coors.ys[i]).css("opacity", "");
			}
		    $(this).css("opacity", "");
		}
	});

	$(document).on("click", ".area-board .valid", function(){
		var curtool = $(".selected");
		if (curtool.length > 0){
			var coor = $(this).attr("id");
			var x = parseInt(coor[0]);
			var y = parseInt(coor[2]);
			if (use_Tools(x, y, $(curtool).text())){
				clear_Tools();
				var coors = get_Toolblock(x, y, $(curtool).text());
				for (var i = 0; i < coors.xs.length; ++i){
					$("#" + coors.xs[i] + "-" + coors.ys[i]).css("opacity", "");
				}
		    	$(this).css("opacity", "");
			}
		}
	});
	
	$(document).on("click", ".tools", function(){
		var tmp = $(this).attr("class");
		clear_Tools();
		if (tmp == "tools selected"){
			return ;
		}
		$(this).attr("class", "tools selected");
		var type = $(this).text();
		if (type){
			set_Score(get_Score() - toolcost[type]);
			$(".score").css("color", "#FF0000");
		}
	});




	/*以下是menu控制事件*/
	$(document).on("click", "#button-start", function(){
		clear_Tools();
		BoardInit();
		//------------------我加的内容---------
		close_Message();
		//-----------------------------------

		if(!DOOR_STATUS){
			OpenDoor("door");
			START = 1;
		}
		$(".area-spinning").empty();
		var ring =  $('<div id = "ring-1" class = "Ring">');
		$('.area-spinning').append(ring);
		CreateRing(document.getElementById('ring-1'),0);
		for (var i = 0; i < 12; ++i){
			var tmp = build_Div(blockattr.height, blockattr.width, blockattr.blocks, "bl" + i, blockattr.colors);
			$("#c" + i).append(tmp);
		}
	});
	//---------------这是我修改的内容
	$(document).on("click", "#button-help", function(){
		if ($(".message").css("display") == "block"){
			
			if(!DOOR_STATUS){
				if(START == 1)
				{
					OpenDoor("door");
				}
				if(START == 0){
					CloseDoor("door");
				}
				close_Message();
			}

		}
		else{
			
			if(!DOOR_STATUS){
				if(START == 1)
				{
					CloseDoor("door");
				}
				if(START == 0)
				{
					CloseDoor("door");
				}
				show_Message("help");
			}
		}
	});
	//-------------------

	//------------这段是我加的内容---------------
	$(document).on("click","#button-exit",function(){
		//debugger;
		if(!DOOR_STATUS){	
			clearInterval(timerid);
			close_Message();
			CloseDoor("door");
			START = 0;
		}
		
	})
	//------------------------------------------------
});
