var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var player,player_running,player_collided,playerImage,zombie,zombie_running,zombie_attack;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
ground_image=loadImage("scary.png");
  player_running=loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png","Run (11).png","Run (12).png","Run (14).png","Run (15).png","Run (16).png","Run (17).png","Run (18).png","Run (19).png","Run (20).png");
  zombie_running=loadAnimation("Walk (1).png","Walk (2).png","Walk (3).png","Walk (4).png","Walk (5).png","Walk (6).png","Walk (7).png","Walk (8).png","Walk (9).png","Walk (10).png");
  zombie_attack=loadAnimation("Attack (2).png","Attack (3).png","Attack (4).png","Attack (5).png","Attack (6).png","Attack (7).png","Attack (8).png");
  obstacle1=loadImage("obstacle1.png");
  zombie_idle=loadImage("Stand.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  gameOverImage=loadImage("gameOver1.png");
  restartImage=loadImage("restart1.png");
  player_collided=loadImage("Dead (30).png");
  playerImage=loadImage("Idle (1).png");
  //inv_ground =  loadImage("grass.png");
}

function setup() {
 createCanvas(600,500);
  
ground=createSprite(0,0,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=1.4;
   ground.velocityX=-1
  
   player=createSprite(300,420,600,10);
  player.addAnimation("player_running",player_running);
  player.addImage("player_collided",player_collided);
  player.addImage("playerImage",playerImage);
  player.scale=0.2;
 // player.velocityX=2;
  player.debug=false;
  player.setCollider("rectangle",0,0,player.width,player.height)

  
  zombie=createSprite(50,410,600,10);
  zombie.addAnimation("zombie_running",zombie_running);
  zombie.addAnimation("zombie_attack",zombie_attack);
  zombie.addImage("zombie_idle",zombie_idle);
  zombie.scale=0.2;
  zombie.debug=false;
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=true;

   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup=new Group();
  console.log(player.x);
  score=0;
}

function draw() {
 background("black");
  
 // console.log(player.y);
   //Gravity
player.velocityY = player.velocityY + 0.8;
player.collide(invisible_ground); 
  
   //Gravity
zombie.velocityY = zombie.velocityY + 0.8;
zombie.collide(invisible_ground); 
  
  
   if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
    //  zombie.y=player.y;
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   if (obstaclesGroup.isTouching(zombie)){
     zombie.velocityY=-12;
   }
 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
 if((keyDown("space")&& player.y >= 220)) {
   player.velocityY = -12;
    jumpSound.play();
  }  
  
  if (player.isTouching(obstaclesGroup)){
    gameState=END;
     dieSound.play();
  }
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     player.velocityY = 0
    player.changeImage("playerImage",playerImage);
  zombie.changeAnimation("zombie_attack",zombie_attack);
     zombie.x=player.x;
  if (zombie.isTouching(player)) {
    player.changeImage("player_collided",player_collided);
    zombie.changeImage("zombie_idle",zombie_idle);
  }
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
 
  drawSprites();
  fill("white");
  textSize(20);
   text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
player.changeAnimation("player_running",player_running);
  obstaclesGroup.destroyEach();
  score=0;
  zombie.x=50;
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,450,10,40);
   obstacle.velocityX = -6 ;//+ score/100);
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}

