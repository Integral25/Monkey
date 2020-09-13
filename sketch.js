var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananasGroup, obstaclesGroup;
var score = 0;
var ground;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {

  obstaclesGroup = createGroup();
  bananasGroup = createGroup();

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  ground = createSprite(250, 490, 500, 20);
  monkey = createSprite(50, 450, 1, 1);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.13;

}


function draw() {
  createCanvas(500, 500);
  
  text("Score: " + score, 430, 50);
  
  if (gameState === 1) {
    if (keyDown("space") && monkey.y > 420) {
      monkey.velocityY = -20;
    }

    score = score + Math.round(getFrameRate()/60);
  
    if (monkey.isTouching(bananasGroup)) {
      bananasGroup.destroyEach();
    }
    
    if (monkey.isTouching(obstaclesGroup)) {
      gameState = END;
    }
    spawnBananas();
    spawnObstacles();
  }
  
  monkey.velocityY = monkey.velocityY + 0.6;
  monkey.collide(ground);
  
  if (gameState === END) {
    
  }
  
  console.log(gameState)
  
  drawSprites();
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(500, 120, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;

    banana.lifetime = 250;

    //add each cloud to the group
    bananasGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 460, 1, 1);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;

    //assign lifetime to the variable
    obstacle.lifetime = 250;

    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
}
