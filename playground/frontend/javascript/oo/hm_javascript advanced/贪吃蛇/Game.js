//自调用函数--游戏对象
		(function(){
			function Game(map){
				this.food = new Food();
				this.snake = new Snake();
				this.map = map;
				that = this;
			}
			Game.prototype.init = function(){
				this.food.init(this.map);
				this.snake.init(this.map);
				this.runSnake(this.food,this.map);
				this.bindKey();
			};

			Game.prototype.runSnake = function(food,map){
				var timeId = setInterval(function(){
					this.snake.move(food,map);
					this.snake.init(map);
					//横坐标的最大值
					var maxX = this.map.offsetWidth/this.snake.width;
					//纵坐标的最大值
					var maxY = this.map.offsetHeight/this.snake.height;
					//蛇头的横坐标
					var headX = this.snake.body[0].x;
					//蛇头的纵坐标
					var headY = this.snake.body[0].y;
					if(headX<0 || headX>=maxX){
						//撞墙了,停止定时器
						clearInterval(timeId);
						alert("游戏结束了!");
					}
					if(headY<0 || headY>=maxY){
						//撞墙了,停止定时器
						clearInterval(timeId);
						alert("游戏结束了!");
					}
				}.bind(that),150);
			};

			//获取用户的按键,改变小蛇的方向
			Game.prototype.bindKey = function(){
				document.addEventListener("keydown",function(e){
					switch(e.keyCode){//keyCode是时间对象的参数---获取键盘按下的键对应的代码值
						//代码值不用加引号,因为就是数字类型
						case 37:this.snake.direction = "left";break;
						case 38:this.snake.direction = "top";break;
						case 39:this.snake.direction = "right";break;
						case 40:this.snake.direction = "bottom";break;

					}
				}.bind(that),false);
				//这里的this是出发keydown时间的对象-----document
			};

			window.Game = Game;
		}());