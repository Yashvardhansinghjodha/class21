var path,player;
var pathImg, PlayerImg;

var purpleCar,redCar, blueCar;
var purpleCarImg, redCarImg, blueCarImg;

var gameOverImg

var purpleCG, redCG, blueCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;



function preload(){
   pathImg = loadImage("Road.png");

   PlayerImg = loadAnimation("giphy.gif");
  
   purpleCarImg = loadAnimation("purpleCar.png");
   
   redCarImg = loadAnimation("redcar.png");

   blueCarImg = loadAnimation("blueCar.png");

   gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);

path = createSprite(600,150);
path.addImage(pathImg);
path.velocityX = -5;
path.scale = 1


player  = createSprite(110,230);
player.addAnimation(PlayerImg,"playerRunning");
player.scale=0.5;
  

player.setCollider("rectangle",0,0,40,40);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
purpleCG = new Group();
blueCG = new Group();
redCG = new Group();

  
}

function draw() {
  background("white");
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   player.y = World.mouseY;
  
   edges = createEdgeSprites();
   player.collide(edges);
  

  if(path.x < 0 ){
    path.x = width/2;
  }
  
    
   var car = Math.round(random(1,3));
  
  if (World.frameCount % 100 == 0) {
    if (car === 1) {
      purpleCar();
    } else if (car === 2) {
      blueCar();
    } else if (car === 3){
      redCar();
    }
  }
  
   if(purpleCG.isTouching(player)){
     gameState = END;
     player.velocityY = 0;
  
    }
    
    if(blueCG.isTouching(player)){
      gameState = END;
      player.velocityY = 0;
      
    }
    
    if(redCG.isTouching(player)){
      gameState = END;
      player.velocityY = 0;
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
   
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
   

     if(keyDown("UP_ARROW")) {
       reset();
     }
}
}

function purpleCar(){
        purplecar =createSprite(1100,Math.round(random(50, 250)));
        purplecar.scale =0.06;
        purplecar.velocityX = -(6 + 2*distance/150);
        purplecar.addAnimation(purpleCarImg);
        purplecar.setLifetime=170;
        purpleCG.add(purpleCar);
}

function blueCar(){
        bluecar =createSprite(1100,Math.round(random(50, 250)));
        bluecar.scale =0.06;
        bluecar.velocityX = -(6 + 2*distance/150);
        bluecar.addAnimation(blueCarImg);
        bluecar.setLifetime=170;
        blueCG.add(blueCar);
}

function redCar(){
        redcar =createSprite(1100,Math.round(random(50, 250)));
        redcar.setLifetime=170;
        redcar.scale =0.06;
        redcar.velocityX = -(6 + 2*distance/150);
        redcar.addAnimation(redCarImg);
        redCG.add(redCar);
}


function reset(){
  gameState = PLAY;
 gameOver.visible = false;
  player.addAnimation(PlayerImg,"playerRunning");
  
 pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
 }

