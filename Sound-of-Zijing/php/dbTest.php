<?php
require_once "dataAPI.php";
$test = new DataAPI();
//echo($test->getStudentId("openid000000000000000003")["message"]."\n");
//echo($test->binding("openid000000000000000001", 2012010001, "binding")."\n");
//echo($test->binding("openid000000000000000003", 2012010002)."\n");
//echo($test->binding("openid000000000000000001", 2012010003, "binding")."\n");
//echo($test->createActivity("DaLiTang"));

echo($test->takeSeat(0,1)['message']."!\n");
echo($test->takeSeat(1,1)['message']."!\n");
echo($test->takeSeat(1,2)['message']."!\n");
echo($test->takeSeat(2,1)['message']."!\n");
echo($test->takeSeat(2,2)['message']."!\n");

//echo($test->initTicket(30, 1)['state']."\n");
//echo($test->takeTicket("openid000000000000000001", 1)['message']."\n");
//echo($test->takeTicket("openid000000000000000002", 1)['message']."\n");
//echo($test->takeTicket("openid000000000000000002", 1)['message']."\n");
//echo($test->takeTicket("openid000000000000000002", 2)['message']."\n");
//echo($test->refundTicket("openid000000000000000002", 3)['message']."\n");

/*for ($x = 1;$x<=4;$x++){
$result = $test->takeTicket("openid000000000000000001", 1 );
$resultMessage = $result['message'];
	echo($result['state']."\n");
}
*/

/*
$result = $test->getInfo(1);
$resultMessage = $result['message'];
if ($result['state'] == "true"){
	
	foreach($result['message'] as $a){
		echo($a["seat_id"].$a["capability"].$a["num_seated"]."\n");
	}
}else{
	echo("11\n");
	echo($resultMessage."\n");
}
*/


/*$result = $test->createActivity("DaLiTang");
$resultMessage = $result['message'];
if ($result['state'] == "true"){
	echo($result['state']."\n");
}else{
	echo($resultMessage."\n");
}


$result = $test->binding("openid000000000000000001", 2012010001, "binding");
$resultMessage = $result['message'];
if ($result['state'] == "true"){
		echo("true"."\n");
}else{
	echo($resultMessage."\n");
}


$result = $test->initTicket(3, 1);
$resultMessage = $result['message'];
if ($result['state'] == "true"){
		echo("true"."\n");
}else{
	echo($resultMessage."\n");
}
*/
/*$result = $test->initTicket(3, 1);
$resultMessage = $result['message'];
if ($result['state'] == "true"){
	for ($i = 0; $i < count($resultMessage);$i++){
		echo($resultMessage[$i]."\n");
	}
}else{
	echo($resultMessage."\n");
}
*/

/*$result = $test->bind("openid000000000000000003", 2012010002);
$resultMessage = $result['message'];
if ($result['state'] == "true"){
	echo("true");
}else{
	echo($resultMessage."\n");
}*/


//echo($test->refundTicket("openid000000000000000002", 6)['message']."\n");
//echo($test->refundTicket("openid000000000000000002", 6)['message']."\n");
//echo($test->refundTicket("openid000000000000000001", 6)['message']."\n");
//echo($test->refundTicket("openid000000000000000001", 6)['message']."\n");
?>
