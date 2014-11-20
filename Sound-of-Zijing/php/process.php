<?php
/**
  * Process the user's request
  * Author: Zhao Zhiheng, Feng Zhibin
  * Last modified: 2014.11.17
  */
  
require_once "dataformat.php";
require_once "dataAPI.php";
require_once "ticket.php";
  
class RequestProcess{
    //Author: Zhao Zhiheng, Feng Zhibin
    //Process with the request data
    //params: RequestData $data
    //return: ResponseData $result
    //Test: No
    public function process($data){
	    $result = new ResponseData();
	    $ticketHandler = new ticketHandler();
	    if ($data->msgType == "text"){
            $content = trim($data->content);
            if ($content == "帮助"){
                $result = $this->help($data);
            }
            else if (substr($content, 0, 6) == "解绑"){
                $result = $this->unbind($data);
            }
	        else if (substr($content, 0, 6) == "退票" || substr($content, 0, 6) == "查票"){
	            $result = $ticketHandler->ticketHandle($data);
	        }
            else{
                $result->msgType = "text";
                $result->content = "请输入帮助查看应用说明";
            }
        }
        else if ($data->msgType == "event"){
            //Menu click
            if ($data->event == "CLICK"){
                if ($data->eventKey == "USER_BIND"){
                    $result = $this->bindlink($data);
                }
				else if(substr($data->eventKey, 0, 4) == "TAKE"){
					$result = $ticketHandler->takeTicket($data);
				}
            }
        }
        
        $result->toUserName = $data->fromUserName;
        $result->fromUserName = $data->toUserName;
        $result->createTime = time();
        return $result;
    }
    
    //Author: Zhao Zhiheng
    //Process the bind/unbind operation
    //params: RequestData $data
    //return: ResponseData $result
    //Test: No
    
    public function bindlink($data){
        $result = new ResponseData();
        $dataapi = new dataAPI();
        $studentid = $dataapi->getStudentId($data->fromUserName);
        $result->msgType = "text";
        if ($studentid['state'] == 'true'){
            $result->content = "你目前绑定的学号是" . $studentid['message'];
        }
        else{
            $result->content = "<a href=\"wx9.igeek.asia/Verify.html?id=$data->fromUserName\">请点击我进行绑定</a>";
        }
        return $result;
    }
    
    //Author: Zhao Zhiheng
    //Display the help info
    //params: RequestData $data
    //return: ResponseData $result
    //Test: No
    public function help($data){
        $result = new ResponseData();
        $result->msgType = "text";
        $result->content = "目前此平台有两个功能，点击用户管理菜单可以进入绑定页面，输入解绑+学号可以解绑微信号。
                            输入抢票X（X为活动编号）。所有的输入忽略空格。";
        return $result;
    }
    /*
    //Author: Zhao Zhiheng
    //Process the bind operation
    //params: RequestData $data
    //return: ResponseData $result
    //Test: No
    public function bind($data){
        $result = new ResponseData();
        $result->msgType = "text";
        $openId = $data->fromUserName;
        $studentId = trim(substr(trim($data->content), 6));
        if (!is_numeric($studentId) || strlen($studentId) != 10){
            $result->content = "学号输入错误";
            return $result;
        }
        $dataapi = new dataAPI();
        $bindResult = $dataapi->binding($openId, intval($studentId), "binding");
	if($bindResult['state'] == "true"){
		$result->content = "绑定成功";
	}
	else{
		$result->content = "绑定失败：" . $bindResult['message'];
	}
        return $result;
    }
    */
    //Author: Zhao Zhiheng
    //Process the unbind operation
    //params: RequestData $data
    //return: ResponseData $result
    //Test: No
    public function unbind($data){
        $result = new ResponseData();
        $result->msgType = "text";
        $openId = $data->fromUserName;
        $studentId = trim(substr(trim($data->content), 6));
        if (!is_numeric($studentId) || strlen($studentId) != 10){
            $result->content = "学号输入错误";
            return $result;
        }
        $dataapi = new dataAPI();
        $unbindResult = $dataapi->unbind($openId, intval($studentId));
	if($unbindResult['state'] == "true"){
		$result->content = "解绑成功";
	}
	else{
		$result->content = "解绑失败：" . $unbindResult['message'];
	}
        return $result;
    }
}
?>
