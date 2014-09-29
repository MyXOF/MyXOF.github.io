//整个游戏对象，保存所有和游戏有关的参数
var Game = {};

//游戏的状态初始化
//false表示暂停或未开始
//true表示开始
Game.Status = false;

//初始化细胞群，并在网页中显示
//row表示细胞的行数，col表示细胞的列数
function Init(row,col){
	Game.canvas = document.getElementById('m_canvas');
	if(Game.canvas.length == 0 || !Game.canvas.getContext){
		return false;
	}
	//程序状态设为开始
	Game.Status = true;

	//初始化画布大小
	Game.canvas.width = 1000;
	Game.canvas.height = 500;
	Game.Painter = Game.canvas.getContext('2d');

	//初始化网格线颜色,线宽
	Game.Line = "#2894FF";
	Game.lineWidth = 0.01;

	//初始化细胞颜色，灰色代表死亡细胞，绿色代表活细胞
	Game.CellAlive = "#F75000";
	Game.CellDead = "#9D9D9D";

	Game.Painter.strokeStyle = Game.Line;

	//设定更新周期为100ms
	Game.IntervalTime = 100;
	
	//设定细胞群的行数和列数
	Game.row = row;
	Game.col = col;

	//最大化利用画布显示细胞群
	//CellSize代表单个细胞的周长，每个细胞将以正方形的形式显示
	var CellHeight = Game.canvas.height / Game.row;
	var CellWidth = Game.canvas.width / Game.col;
	if(CellWidth > CellHeight){
		Game.CellSize = CellHeight;
	}
	else{
		Game.CellSize = CellWidth;
	}

	//初始化代数、细胞存活数
	Game.Generation = 1;
	Game.AliveNum = 0;

	//Cells为二维数组，用于保存当前细胞各自的生存情况
	//NextCells为二位数组，用于保存下一代细胞的生存情况
	Game.Cells = new Array();
	Game.NextCells = new Array();

	for(var i = 0;i < Game.row;i++){
		
			Game.Cells[i] = new Array(Game.col);
			Game.NextCells[i] = new Array(Game.col);
			for(var j = 0; j < Game.col;j++){
				Game.Cells[i][j] = GetRandom();
				if(Game.Cells[i][j]) Game.AliveNum++;

				Game.NextCells[i][j] = 0;
			}
	}
	//计算细胞存活情况并在网页中显示
	CalCellsAlive();
	$('#Generation').html("第"+Game.Generation+"代，存活数："+Game.AliveNum);
	
	//绘制细胞群
	FillCells();
	
	//绘制网格线
	DrawLine();
	
	
}

//绘制网格线
function DrawLine(){

	//Game.Painter.clearRect(0,0,Game.canvas.width,Game.canvas.height);

	//当细胞个数大于20000时，不绘制网格线
	if(Game.row * Game.col > 20000){
		return;
	}
	Game.Painter.beginPath();
	
	//绘制竖线
	for(var i = 0; i <= Game.col;i++){
		Game.Painter.moveTo(i*Game.CellSize,0);
		Game.Painter.lineTo(i*Game.CellSize,Game.CellSize*Game.row);
	}

	//绘制横线
	for(var j = 0; j <= Game.row;j++){
		Game.Painter.moveTo(0,j*Game.CellSize);
		Game.Painter.lineTo(Game.CellSize*Game.col,j*Game.CellSize);
	}
	Game.Painter.stroke();
}

//绘制所有细胞
function FillCells(){
	Game.Painter.clearRect(0,0,Game.canvas.width,Game.canvas.height);
	for(var i = 0;i < Game.row;i++){
		for(var j = 0;j < Game.col;j++){
			DrawCell(i,j);
		}
	}
	
}

//绘制单个细胞在网页中显示
//i,j分别表示该细胞所在的行数和列数
function DrawCell(i,j){
	if(Game.Cells[i][j] == 1){
		//活细胞的颜色
		Game.Painter.fillStyle = Game.CellAlive;
	}
	else{
		//死细胞的颜色
		Game.Painter.fillStyle = Game.CellDead;
		
	}
	Game.Painter.fillRect(j*Game.CellSize,i*Game.CellSize,Game.CellSize,Game.CellSize);
}

//显示下一代细胞
function DisplayNextGeneration(){

	CalNextGeneration();
	UpdateCells();
	CalCellsAlive();
	Game.Generation++;
	DrawLine();
	
	$('#Generation').html("第"+Game.Generation+"代，存活数："+Game.AliveNum);
}


//计算下一代细胞的存货情况
function CalNextGeneration(){
	for(var i = 0;i < Game.row;i++){
		for(var j = 0;j < Game.col;j++){
			var count = 0;
			var i1,i2,j1,j2;
			//处理边界情况
			if(i - 1 < 0){
				i1 = Game.row-1;
			}
			else{
				i1 = i - 1;
			}

			if(i + 1 >=  Game.row){
				i2 = 0;
			}
			else{
				i2 = i + 1;
			}

			if(j - 1 < 0){
				j1 = Game.col-1;
			}
			else{
				j1 = j - 1;
			}

			if(j + 1 >=  Game.col){
				j2 = 0;
			}
			else{
				j2 = j + 1;
			}

			//统计当前细胞周围八个细胞的生存情况，每个细胞将不受自身的影响
			if(i1!= i && j1 != j){
				if(Game.Cells[i1][j1]) count++;
			}

			if(i1!= i){
				if(Game.Cells[i1][j]) count++;
			}

			if(i1!= i && j2 != j){
				if(Game.Cells[i1][j2]) count++;
			}

			if(j1 != j){
				if(Game.Cells[i][j1]) count++;
			}

			
			if(j2 != j){
				if(Game.Cells[i][j2]) count++;
			}
			
			if(i2!= i && j1 != j){
				if(Game.Cells[i2][j1]) count++;
			}
			
			if(i2!= i){
				if(Game.Cells[i2][j]) count++;
			}
			
			if(i2!= i && j2 != j){
				if(Game.Cells[i2][j2]) count++;
			}

			

			//根据游戏规则来决定细胞的生死
			if(count == 3){
				Game.NextCells[i][j] = 1;
			}

			else if(count == 2){
				Game.NextCells[i][j] = Game.Cells[i][j];
			}
			else{
				Game.NextCells[i][j] = 0;
			}
		}
	}
}

//将新的细胞代替原有的细胞并绘制在网页上
function UpdateCells(){
	for(var i = 0;i < Game.row;i++){
		for(var j = 0;j < Game.col;j++){
			if(Game.NextCells[i][j] != Game.Cells[i][j]){
				Game.Cells[i][j] = Game.NextCells[i][j];
				//DrawCell(i,j);
			}
		}
	}
	FillCells();
	
	DrawLine();
}

//计算当前细胞存活数
function CalCellsAlive(){
	Game.AliveNum = 0;
	for(var i = 0;i < Game.row;i++){
		for(var j = 0;j < Game.col;j++){
			if(Game.Cells[i][j]){
				Game.AliveNum++;
			}
		}
	}
}

//随机函数，随机返回0或1
function GetRandom(){
	var x = Math.random();
	if(x <= 0.5) return 0;
	else return 1;
}