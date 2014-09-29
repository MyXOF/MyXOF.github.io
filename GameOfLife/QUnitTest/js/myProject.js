//整个游戏对象，保存所有和游戏有关的参数
var Game = {};

//初始化细胞群，并在网页中显示
//row表示细胞的行数，col表示细胞的列数
function Init(row,col){
	
	//设定细胞群的行数和列数
	Game.row = row;
	Game.col = col;

	
	//Cells为二维数组，用于保存当前细胞各自的生存情况
	//NextCells为二位数组，用于保存下一代细胞的生存情况
	Game.Cells = new Array();
	Game.NextCells = new Array();

	for(var i = 0;i < Game.row;i++){
		
			Game.Cells[i] = new Array(Game.col);
			Game.NextCells[i] = new Array(Game.col);
			for(var j = 0; j < Game.col;j++){
				Game.Cells[i][j] = 0;
				Game.NextCells[i][j] = 0;
			}
	}

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

			//统计当前细胞周围八个细胞的生存情况
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

//将新的细胞代替原有的细胞
function UpdateCells(){
	for(var i = 0;i < Game.row;i++){
		for(var j = 0;j < Game.col;j++){
			if(Game.NextCells[i][j] != Game.Cells[i][j]){
				Game.Cells[i][j] = Game.NextCells[i][j];
				
			}
		}
	}
}


