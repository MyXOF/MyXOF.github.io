$(document).ready(function(){

	//游戏开始按键事件
	$("#Game-Start").click(function(){
		var RowNum = document.getElementById("ROW").value;
		var ColNum = document.getElementById("COL").value;
		var reg = /^\d+$/;
		//判断输入的行数和列数是否同时为数字
		if(reg.test(RowNum) && reg.test(ColNum)){
			var row = parseInt(RowNum);
			var col = parseInt(ColNum);
			if(row > 0 && col > 0){
				if(Game.Status){
					Game.Painter.clearRect(0,0,Game.canvas.width,Game.canvas.height);
					clearInterval(Game.Stop);
					Game.Status = false;
					
				}

				Init(row,col);
				Game.Stop = setInterval(DisplayNextGeneration,Game.IntervalTime);
				$("#Game-Paused").css("display","block");
				$("#Next-Generation").css("display","none");
				$("#Reset").css("display","block");
				$("#Generation").css("display","block");
			}
			else{
				alert("输入的数字必须大于0!");
			}
		}
		else{
			alert("输入的行数和列数必须为数字!");
		}
		$("#Game-Paused").html("暂停");
	});

	//游戏暂停按键事件
	$("#Game-Paused").click(function(){
		if(Game.Status){
			clearInterval(Game.Stop);
			Game.Status = false;
			$("#Game-Paused").html("继续");
			$("#Next-Generation").css("display","block");
		}
		else{
			Game.Stop = setInterval(DisplayNextGeneration,Game.IntervalTime);
			Game.Status = true;
			$("#Game-Paused").html("暂停");
			$("#Next-Generation").css("display","none");
		}
		
	});

	//下一代按键事件
	$("#Next-Generation").click(function(){
		//游戏处于暂停状态下可以使用下一代按键功能
		if(!Game.Status){
			DisplayNextGeneration();
		}
		
	});

	//重置按键事件
	$("#Reset").click(function(){
		debugger;
		Game.Painter.clearRect(0,0,Game.canvas.width,Game.canvas.height);
		$("#Game-Paused").html("暂停");

		document.getElementById("ROW").value = "";
		document.getElementById("COL").value = "";
		
		clearInterval(Game.Stop);
		Game.Status = false;
			
		
		$("#Game-Paused").css("display","none");
		$("#Reset").css("display","none");
		$("#Next-Generation").css("display","none");
		$("#Generation").css("display","none");
	});
	
});