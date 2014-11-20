<?php
class AccessToken{
	public function getAccessToken(){
		$appid = "wx31f3308295716fd1";
		$secret = "1eeac4dc44d5e2ae0141d3675dbeef7b";
		$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$secret";

		$storeFile = file("../access_token");
		if (count($storeFile) >= 2){
			$expireTime = intval(trim($storeFile[1]));
			if(time() < $expireTime) return trim($storeFile[0]);
		}

		$json = file_get_contents($url);
		$result = json_decode($json, true);
		if($result['access_token']){
			$access_token = $result['access_token'];
			$expires_in = $result['expires_in'];
			$tokenFile = fopen("../access_token", "w");
			fwrite($tokenFile, $access_token . "\n" . (time() + intval($expires_in) / 2) . "\n");
			fclose($tokenFile);
			$logFile = fopen("../log/token_log", "a");
			fwrite($logFile, $json);
			fclose($logFile);
			return $result['access_token'];
		}
		else{
			$logFile = fopen("../log/token_log", "a");
			fwrite($logFile, $json);
			fclose($logFile);
			return "";
		}
		//return $result;
	}
}
?>
