/**
 * 
 * 定义角色类
 * 
 * */
var Role = function(opts){
	Sprite.call(this,opts);
}
Role.prototype = new Sprite();
Role.prototype.constructor = Role;

Role.prototype.hp = 0;

Role.prototype.isMove = false;

var moveTimer = null;
Role.prototype.move = function(direction){
	
	
	var imgNode = this.imgNode;
	var _dir = this.direction;
	
	
	clearInterval(moveTimer);
	
	moveTimer = setInterval(move,40)
	
	var self = this;
	function move(){
		if(self.isMove){
			switch(direction){
				case 'A':  moveLeft(); break;
				case 'W':  moveUp();break;
				case 'D':  moveRight();break;
				case 'S':  moveDown();break;
			}
		}
	}

	
	function moveLeft(){
		_dir = -1;
		self.direction = _dir;
		imgNode.style.transform = 'scaleX(-1)';
		imgNode.style.left = imgNode.offsetLeft - Config.MoveSpeed + 'px';
	}
	function moveRight(){
		_dir = 1;
		self.direction = _dir;
		imgNode.style.transform = 'scaleX(1)';
		imgNode.style.left = imgNode.offsetLeft + Config.MoveSpeed + 'px';
	}
	
	function moveUp(){
		imgNode.style.top = imgNode.offsetTop - Config.MoveSpeed + 'px';
	}
	function moveDown(){
		imgNode.style.top = imgNode.offsetTop + Config.MoveSpeed + 'px';
	}
	
	
	var parentNode = this.imgNode.parentNode;
	if(imgNode.offsetLeft < 0){
		imgNode.style.left = '0px';
	}
	if(imgNode.offsetLeft > parentNode.offsetWidth - imgNode.offsetWidth){
		imgNode.style.left = parentNode.offsetWidth - imgNode.offsetWidth + 'px'
	}
	
	if(imgNode.offsetTop < 0){
		imgNode.style.top = '0px';
	}
	if(imgNode.offsetTop > parentNode.offsetHeight - imgNode.offsetHeight){
		imgNode.style.top  = parentNode.offsetHeight - imgNode.offsetHeight + 'px'
	}
		
		
	
	this.direction = _dir;

}

