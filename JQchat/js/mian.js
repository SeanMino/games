window.onload = function(){
	
	//判断是不是从登录页面过来的
	if(document.referrer == '' || document.referrer == null){
		window.location.href = 'login.html';
	}
	
	
	var username =localStorage['username'];
	
	console.log(username)
	
	var input = document.getElementsByTagName('input')[0];
	
	var sendbtn = document.getElementById('sendbtn');
	
	var chatwindow = document.getElementById('chatwindow');
	
	sendbtn.onclick = function(){
		sendMsg();
	}
	
	document.addEventListener('keydown',function(e){
		if(e.keyCode == 13){
			sendMsg();
		}
		
	},false);
	
	function sendMsg(){
		var msg = input.value;
		
		input.value = '';
		if(msg != '' && msg != null){
			$.ajax({
				type:"post",
				url:"server.php",
				data: { type:'sendmsg',name: username, msg:msg },   
				async:true,
				success:function(data){
					console.log('send msg sucess')
				}
			});
		}
		
	}
	
	
	setInterval(getMsg,500)
	
	
	var last_timestamp = null;
	function getMsg(){
	
		$.ajax({
			type:"post",
			url:"server.php",
			data: { 'type':'getmsg' },
			success:function(data){
				
				if(data != '' && data != null){
					var json = JSON.parse(data)

		            var timestamp = json.timestamp;
		            
		            if(last_timestamp != timestamp){
		            	var name = json.name;
		            	var msg = json.msg;
		            	last_timestamp = timestamp;
		            	var time = getDate();
	 					var p = document.createElement('p');
//						p.innerHTML = name + " " + time + msg;
//			            chatwindow.appendChild(p);
						$(p).html(name + " " + time + msg);
						$("#chatwindow").append($(p));
		            }
		            
		            chatwindow.scrollTop = chatwindow.scrollHeight;
				}
	           
			}
		});
	
	}
	

//	getUsers();
	setInterval(getUsers,3000);
	function getUsers(){
		$.ajax({
			type:"post",
			url:"server.php",
			data: { 'type':'getusers'},
			success:function(data){
				if(data != '' && data != null){
					var json = JSON.parse(data);
					$("#people_count").html(json.length)
					var str = '';
					for(var i = 0;i < json.length;i++){
						str += json[i] + '<br>';
					}
					
					$("#rightside").html(str);
				}
			}
		})
	}
	
	
	function getDate(){
		 var date = new Date();
		 var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var time = h + ':' + m + ':' + s + ': ';
        return time;
	}
}
