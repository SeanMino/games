<?php
	
	if(isset($_POST["type"])){
		
		$type = $_POST["type"];
		
		if($type == 'sendmsg'){
			
			$data = array(
				"name"=>$_POST["name"],
				"msg"=>$_POST["msg"],
				'timestamp'=>time()
			);


			$json_string = file_get_contents('msg.json');
			
			$arr = json_decode($json_string,true);
						
			array_push($arr,$data);
			
						
			$json_string = json_encode($arr);

			// 写入文件
			file_put_contents('msg.json', $json_string);
	
		}else if($type == 'getmsg'){

			$json_string = file_get_contents('msg.json');
			$arr = json_decode($json_string,true);
			
			
			if(count($arr) > 0){
				$data = $arr[count($arr)-1];
				echo json_encode($data);
			}
		}else if($type == 'login'){
			
			$data = array(
				"name"=>$_POST["name"],
				"psd"=>$_POST["psd"],
				'timestamp'=>time()
			);
			
			$user_string = file_get_contents('user.json');
			
			$users = json_decode($user_string,true);
						
			array_push($users,$data);
			
						
			$json_string = json_encode($users);

			// 写入文件
			file_put_contents('user.json', $json_string);
			
			
		}else if($type == 'getusers'){
			
			$user_string = file_get_contents('user.json');
			$user = json_decode($user_string,true);
			
			
			$data = array();
			if(count($user) > 0){
				
				
				for($i = 0;$i < count($user);$i++){
					$data[$i] = $user[$i]['name'];
//					echo $user
				}
			
				echo json_encode($data);
			}
			
		}
	}
	
		