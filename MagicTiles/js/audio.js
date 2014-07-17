/*
 * audio.js
 * 功能：控制音乐、音效
 * 实现：赵志恒
 * 主要技术：HTML5
*/

//控制音频
$(document).ready(function(){
	$("audio")[0].volume = 0.1;
	add_SE(["alert", "buy", "over", "put", "tool"]);
	$(document).on("click",".audio",function(){
		if ($("#BGM")[0].paused){
			$("#BGM")[0].play();
		}
		else{
			$("#BGM")[0].pause();
		}
	});
});

/*播放音效*/
function play_SE(name){
	$("#" + name)[0].pause();
	$("#" + name)[0].currentTime = 0.0;
	$("#" + name)[0].play();
}

/*添加音效*/
function add_SE(names){
	for (var i = 0; i < names.length; ++i){
		var newSE = $("<audio preload id='" + names[i] + "'></audio>");
		newSE.html("<source src='./audio/" + names[i] + ".ogg' type='audio/ogg'>\n" +
				   "<source src='./audio/" + names[i] + ".mp3' type='audio/mpeg'>");
		$("body").prepend(newSE);
	}
}
