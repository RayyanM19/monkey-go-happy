var gazelle,gazelleImg,gazelleImg2;
var obstacle,obstacleImg;
var prey,preyImg;
var preyGroup,obstacleGroup;
var bg,backgroundImg;
var score;
var gameState=0;
var leafGroup,preyGroup;

function preload(){
gazelleImg = loadImage("lagazelle.png");
gazelleImg2 = loadImage("gazzele.png");
obstacleImg = loadImage("alion.png");
preyImg = loadImage("leafio.png");
backgroundImg = loadImage("suunny.jpg");
  
 
}


function setup() {
  createCanvas(700,400);
  
  bg = createSprite(500,200,1100,1100);
  bg.addImage(backgroundImg);
  bg.velocityX = -2;
  bg.scale = 2;
  
  gazelle = createSprite(100,300,20,20);
  gazelle.addImage(gazelleImg)
  gazelle.scale = 0.07;
  
  ground = createSprite(350,380,700,10);
  ground.visible = false;
  
  preyGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;

}


function draw() {
  background("white");
  drawSprites();
  
  if(ground.x > 300){
     ground.x = ground.width/2;
   }
  
  if(bg.x < 200){
    bg.x = bg.width/2;
  }
   ground.velocityX = 2;
  
  gazelle.velocityY = gazelle.velocityY+0.5;
  gazelle.collide(ground);
  if(keyDown("space")){
    gazelle.velocityY = -10;
  }
  
  preys();
  obstacles();
  
  stroke("black");
  textSize(20);
  fill("white");
  text("Score: "+score,100,50);
  
  if(gazelle.isTouching(obstacleGroup)){
    ground.velocityX = 0;
    gazelle.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    preyGroup.setVelocityXEach(0);
    preyGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    bg.velocityX = 0;
    textSize(30);
    fill("black");
    text("Game Over",300,200);
  
  }
  if(preyGroup.isTouching(gazelle)){
    score=score+2;
    preyGroup.destroyEach();
  }
  
}
 

  


function preys(){
  if(frameCount%80===0){
    prey = createSprite(750,Math.round(random(120,200)),20,20);
    prey.addImage(preyImg);
    prey.scale = 0.1;
    prey.velocityX = -4;
    prey.lifetime = 200;
    
    preyGroup.add(prey);
  }
  
}

function obstacles(){
  if(frameCount%300===0){
    obstacle = createSprite(750,340,10,40);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.07;
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
  }
  
}