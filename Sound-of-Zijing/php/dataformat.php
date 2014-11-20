<?php
/**
  * Define the data format
  * Author: Zhao Zhiheng
  * Last modified: 2014.11.9
  */
  
class RequestData{
    var $toUserName; // 开发者微信号
    var $fromUserName; // 发送方帐号（一个OpenID）
    var $createTime; // 消息创建时间
    var $msgType; // 消息类型 文本：text 图片：image 语音：voice 视频：video
    var $content; // 文本消息内容
    var $picUrl; // 图片链接
    var $mediaId; // 图片、语音、视频消息媒体id，可以调用多媒体文件下载接口拉取数据
    var $format; // 语音格式，如amr，speex等
    var $thumbMediaId; // 视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据。
    var $msgId; // 消息id，64位整型
    var $location_x;  // 地理位置纬度
    var $location_y; // 地理位置经度
    var $scale; // 地图缩放大小
    var $label; //地理位置信息
    var $title; // 消息标题
    var $description; // 消息描述
    var $url; // 消息链接
    var $event; // 事件类型，CLICK
    var $eventKey; // 事件KEY值，与自定义菜单接口中KEY值对应
}
  
class ResponseData{
    var $toUserName; // 接收方帐号（收到的OpenID）
    var $fromUserName; // 开发者微信号
    var $createTime; // 消息创建时间
    var $msgType; // 消息类型 文本：text 图片：image 语音：voice 视频：video 音乐：music 图文： news
    var $content; // 回复的消息内容（换行：在content中能够换行，微信客户端就支持换行显示）
    var $mediaId; // 通过上传多媒体文件，得到的id。
    var $title; // 视频、音乐消息的标题
    var $description; // 视频、音乐消息的描述
    var $musicURL; // 音乐链接
    var $hQMusicUrl; // 高质量音乐链接，WIFI环境优先使用该链接播放音乐
    var $thumbMediaId; // 缩略图的媒体id，通过上传多媒体文件，得到的id
    var $articleCount; // 图文消息个数，限制为10条以内
    var $articles; // 多条图文消息信息，默认第一个item为大图,注意，如果图文数超过10，则将会无响应
}

class Article{
    var $title; // 图文消息标题
    var $description; // 图文消息描述
    var $picUrl; // 图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
    var $url; // 点击图文消息跳转链接
}
?>
