test("UnitTest_CellsStable",function(){
	Init(6,6);
	equal(true,Test_1(),"Case 1 Pass");
	equal(true,Test_2(),"Case 2 Pass");
	equal(true,Test_3(),"Case 3 Pass");
	equal(true,Test_4(),"Case 4 Pass");
	equal(true,Test_5(),"Case 5 Pass");
	equal(true,Test_6(),"Case 6 Pass");
	equal(true,Test_7(),"Case 7 Pass");
	equal(true,Test_8(),"Case 8 Pass");
	equal(true,Test_9(),"Case 9 Pass");
});

test("UnitTest_CellsEdge",function(){
	Init(1,1);
	equal(true,Test_E1(),"Case E1 Pass");
	Init(1,2);
	equal(true,Test_E2(),"Case E2 Pass");
	Init(2,2);
	equal(true,Test_E3(),"Case E3 Pass");
	Init(3,3);
	equal(true,Test_E4(),"Case E4 Pass");
	Init(3,3);
	equal(true,Test_E5(),"Case E5 Pass");
});

function CompareCurrentAndNext(){
	if(!Game.row || !Game.col){
		return false;
	}
	for(var i = 0;i < Game.row;i++){
		for(var j = 0;j < Game.col;j++){
			if(Game.Cells[i][j] != Game.NextCells[i][j]){
				return false;
			}
		}
	}

	return true;
}

function ClearCells(){
	if(!Game.row || !Game.col){
		return;
	}
	for(var i = 0;i < Game.row;i++){
		for(var j = 0;j < Game.col;j++){
				Game.Cells[i][j] = 0;
				//Game.NextCells[i][j] = 0;
		}
	}
}

function Test_1(){
	ClearCells();
	Game.Cells[1][2] = 1;
	Game.Cells[1][3] = 1;
	Game.Cells[2][2] = 1;
	Game.Cells[2][3] = 1;
	CalNextGeneration();
	return(CompareCurrentAndNext());
}

function Test_2(){
	ClearCells();
	Game.Cells[1][2] = 1;
	Game.Cells[2][1] = 1;
	Game.Cells[2][3] = 1;
	Game.Cells[3][2] = 1;
	CalNextGeneration();
	return(CompareCurrentAndNext());
}


function Test_3(){
	ClearCells();
	Game.Cells[1][2] = 1;
	Game.Cells[2][1] = 1;
	Game.Cells[2][3] = 1;
	Game.Cells[3][2] = 1;
	Game.Cells[3][3] = 1;
	CalNextGeneration();
	return(CompareCurrentAndNext());
}


function Test_4(){
	ClearCells();
	Game.Cells[1][2] = 1;
	Game.Cells[2][1] = 1;
	Game.Cells[2][3] = 1;
	Game.Cells[3][1] = 1;
	Game.Cells[3][3] = 1;
	Game.Cells[4][2] = 1;
	CalNextGeneration();
	return(CompareCurrentAndNext());
}


function Test_5(){
	ClearCells();
	Game.Cells[1][2] = 1;
	Game.Cells[2][2] = 1;
	Game.Cells[3][2] = 1;

	CalNextGeneration();
	UpdateCells();
	CalNextGeneration();
	ClearCells();

	Game.Cells[1][2] = 1;
	Game.Cells[2][2] = 1;
	Game.Cells[3][2] = 1;

	return(CompareCurrentAndNext());
}


function Test_6(){
	ClearCells();
	Game.Cells[1][3] = 1;
	Game.Cells[2][2] = 1;
	Game.Cells[2][4] = 1;
	Game.Cells[3][1] = 1;
	Game.Cells[3][4] = 1;
	Game.Cells[4][2] = 1;
	Game.Cells[4][3] = 1;
	CalNextGeneration();
	return(CompareCurrentAndNext());
}


function Test_7(){
	ClearCells();
	Game.Cells[1][2] = 1;
	Game.Cells[1][3] = 1;
	Game.Cells[2][1] = 1;
	Game.Cells[2][4] = 1;
	Game.Cells[3][1] = 1;
	Game.Cells[3][4] = 1;
	Game.Cells[4][2] = 1;
	Game.Cells[4][3] = 1;
	CalNextGeneration();
	return(CompareCurrentAndNext());
}

function Test_8(){
	ClearCells();
	Game.Cells[1][2] = 1;
	Game.Cells[1][3] = 1;
	Game.Cells[2][1] = 1;
	Game.Cells[2][3] = 1;
	Game.Cells[3][1] = 1;
	Game.Cells[3][2] = 1;
	CalNextGeneration();
	return(CompareCurrentAndNext());
}

function Test_9(){
	ClearCells();
	Game.Cells[1][1] = 1;
	Game.Cells[1][2] = 1;
	Game.Cells[1][3] = 1;
	Game.Cells[2][2] = 1;
	Game.Cells[2][3] = 1;
	Game.Cells[2][4] = 1;
	
	CalNextGeneration();
	UpdateCells();
	CalNextGeneration();
	ClearCells();
	
	Game.Cells[1][1] = 1;
	Game.Cells[1][2] = 1;
	Game.Cells[1][3] = 1;
	Game.Cells[2][2] = 1;
	Game.Cells[2][3] = 1;
	Game.Cells[2][4] = 1;

	return(CompareCurrentAndNext());

}

function Test_Edge(){

}

function Test_E1()
{
	Game.Cells[0][0] = 1;
	
	CalNextGeneration();
	ClearCells();

	Game.Cells[0][0] = 0;
	return(CompareCurrentAndNext());

}

function Test_E2()
{
	Game.Cells[0][0] = 1;
	Game.Cells[0][1] = 1;

	CalNextGeneration();

	return(CompareCurrentAndNext());
}


function Test_E3()
{
	Game.Cells[0][0] = 1;
	Game.Cells[0][1] = 1;
	Game.Cells[1][0] = 0;
	Game.Cells[1][1] = 0;

	CalNextGeneration();

	return(CompareCurrentAndNext());
}

function Test_E4()
{
	Game.Cells[0][0] = 1;
	Game.Cells[0][1] = 1;
	Game.Cells[1][0] = 1;
	Game.Cells[2][0] = 1;
	Game.Cells[2][1] = 1;

	CalNextGeneration();
	ClearCells();
	return(CompareCurrentAndNext());

}

function Test_E5()
{
	Game.Cells[0][0] = 1;
	Game.Cells[0][2] = 1;
	Game.Cells[2][0] = 1;
	Game.Cells[2][2] = 1;


	CalNextGeneration();
	return(CompareCurrentAndNext());
}