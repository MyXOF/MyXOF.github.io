/*
 * global.js
 * 功能：定义全局变量
 * 说明：实在是不好改了，于是把全局变量都扔进来了
*/

/*From spinning.js*/
var Ring_Num = 12;
var Ring_Radius = 350;
var FlagDoorOpen = false;
var DOOR_STATUS = 0;
var MoveD,MoveRW,MoveLW;

/*From playboard.js*/
var colortable = ["#3BA0FA", "#FF4647", "#F8D800",
				  "#FFAA00", "#00FF22"];
var toolcost = {
	"Row" : 10,
	"Column" : 10,
	"Color" : 50,
	"Block" : 20,
	"Cross" : 10,
	"Bomb" : 100,
	"Female" : 30,
	"Male" : 30
};

var tooldelta = {
	"Row" : 2,
	"Column" : 1,
	"Color" : 5,
	"Block" : 2,
	"Cross" : 1,
	"Bomb" : 10,
	"Female" : 1,
	"Male" : 2
}

var blockcost = 10;
var blockdelta = 10;
