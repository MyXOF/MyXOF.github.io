<?php
/**
  * Parse the user's messages
  * Author: Zhao Zhiheng; Feng Zhibin
  * Last modified: 2014.11.9
  */

require_once "dataformat.php";
  
class RequestParse{
    //Author: Zhao Zhiheng; Feng Zhibin
    //Parse a response xml string
    //params: string $xml_string
    //return: RequestData
    //Test: No
    public function parse($xml_string){
        $postObj = simplexml_load_string($xml_string, 'SimpleXMLElement', LIBXML_NOCDATA);
        $result = new RequestData();
        $result->toUserName = $postObj->ToUserName;
        $result->fromUserName = $postObj->FromUserName;
        $result->createTime = $postObj->CreateTime;
        $result->msgType = $postObj->MsgType;
        $result->msgId = $postObj->MsgId;
        
        //Parse for specific type
        if ($result->msgType == "text"){
            $result->content = trim($postObj->Content);
            return $result;
        }
	    else if ($result->msgType == "image"){
            $result->picurl = trim($postObj->PicUrl);
            $result->mediaId = trim($postObj->MediaId);
            return $result;
        }
        else if ($result->msgType == "voice"){
            $result->MediaId = trim($postObj->MediaId);
            $result->format = trim($postObj->Format);
            return $result;
        }
        else if ($result->msgType == "video"){
            $result->MediaId = trim($postObj->MediaId);
            $result->thumbMediaId = trim($postObj->ThumbMediaId);
            return $result;	
        }
        else if ($result->msgType == "location"){
            $result->location_x = trim($postObj->Location_X);
            $result->location_y = trim($postObj->Location_Y);
            $result->scale = trim($postObj->Scale);
            return $result;
        }
        else if ($result->msgType == "link"){
            $result->title = trim($postObj->Title);
            $result->description = trim($postObj->Description);
            $result->url = trim($postObj->Url);
            return $result;
        }
        else if ($result->msgType == "event"){
            $result->event = trim($postObj->Event);
            $result->eventKey = trim($postObj->EventKey);
            return $result;
        }
    }
}
?>
