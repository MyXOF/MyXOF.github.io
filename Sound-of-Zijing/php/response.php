<?php
/**
  * Response the user's request
  * Author: Zhao Zhiheng; Feng Zhibin
  * Last modified: 2014.11.9
  */

require_once "dataformat.php";
  
class RequestResponse{
    //Author: Zhao Zhiheng
    //Generate a response xml string
    //params: ResponseData $data
    //return: string
    //Test: No
    public function response($data){
        $toUserName = $data->toUserName;
        $fromUserName = $data->fromUserName;
        $createTime = $data->createTime;
        $msgType = $data->msgType;
        $result = "<xml>
<ToUserName><![CDATA[$toUserName]]></ToUserName>
<FromUserName><![CDATA[$fromUserName]]></FromUserName>
<CreateTime>$createTime</CreateTime>
<MsgType><![CDATA[$msgType]]></MsgType>
%s
</xml>";
        $xml = $this->getTypeXML($data);
        $result = sprintf($result, $xml);
        return $result;
    }
    
    //Author: Feng Zhibin
    //Generate the specific part of response string
    //params: ResponseData $data
    //return： string
    //Test: No
    private function getTypeXML($data){
        if ($data->msgType == "text"){
            $content = $data->content;
            $result = "<Content><![CDATA[$content]]></Content>";
            return $result;
        }
	else if ($data->msgType == "image"){
	    $mediaId = $data->mediaId;
	    $result = "<Image><MediaId><![CDATA[$mediaId]]></MediaId></Image>";
	    return $result;
	}
	else if ($data->msgType == "voice"){
	    $mediaId = $data->mediaId;
	    $result = "<Voice><MediaId><![CDATA[$mediaId]]></MediaId></Voice>";	
	}
	else if ($data->msgType == "video"){
	    $mediaId = $data->mediaId;
	    $title = $data->title;
	    $description = $data->description;
	    $result = "<Video><MediaId><![CDATA[$mediaId]]></MediaId><Title><![CDATA[$title]]></Title><Description><![CDATA[$description]]></Description></Video>";
	    return $result;
	}
	else if ($data->msgType == "music"){
	    $mediaId = $data->mediaId;
	    $title = $data->title;
	    $description = $data->description;
	    $musicURL = $data->musicURL;
	    $hQMusicUrl = $data->hQMusicUrl;
	    $thumbMediaId = $data->thumbMediaId;
	    $result = "<Music><Title><![CDATA[$title]]></Title><Description><![CDATA[$description]]></Description><MusicUrl><![CDATA[$musicURL]]></MusicUrl><HQMusicUrl><![CDATA[$hQMusicUrl]]></HQMusicUrl><ThumbMediaId><![CDATA[$thumbMediaId]]></ThumbMediaId>
</Music>";
	    return $result;
	}
	else if ($data->msgType == "news"){
	    $articleCount = $data->articleCount;
	    $articles = $data->articles;
	    $result = "<ArticleCount>$articleCount</ArticleCount><Articles>";
	    for ($i = 0; $i < $articleCount; $i++){
		$title = $articles[$i]->title;
		$description = $articles[$i]->description;
		$picUrl = $articles[$i]->picUrl;
		$url = $articles[$i]->url;
		$result .= "<item><Title><![CDATA[$title]]></Title><Description><![CDATA[$description]]></Description><PicUrl><![CDATA[$picUrl]]></PicUrl><Url><![CDATA[$url]]></Url></item>";
	    }
	    $result .= "</Articles>";
	    return $result;
	}
    }
}

?>
