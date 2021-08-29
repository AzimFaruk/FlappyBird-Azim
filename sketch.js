var bg, bgImg;
var ground, groundImg;

var bird, birdImg;

var pipe, pipeImg;
var pipeGroup;

var invisibleGround;

var score = 0;

var PLAY = 0;
var END = 1;
var gameState = 0;

var restart, restartImg;

var dieSound, swooshSound, pointSound, hitSound, wingSound;

function preload(){
    bgImg = loadImage("background.png");
    groundImg = loadImage("base.png");
    birdImg = loadImage("bird.png");
    pipeImg = loadImage("pipe.png");
    restartImg = loadImage("restart.png");

    dieSound = loadSound("die.wav");
    swooshSound  = loadSound("swoosh.wav");
    hitSound  = loadSound("hit.wav");
    pointSound = loadSound("point.wav");
    wingSound = loadSound("wing.wav");
}

function setup(){
    createCanvas(289, 500);

    bg = createSprite(144, 250);
    bg.addImage(bgImg);
    bg.velocityX = -3;

    ground = createSprite(125, 500);
    ground.addImage(groundImg);
    ground.velocityX = -3;

    bird = createSprite(75, 200, 50, 50);
    bird.addImage(birdImg);
    bird.scale = 0.07;

    invisibleGround = createSprite(300, 475, 1000, 50);
    invisibleGround.visible = false;

    restart = createSprite(150, 225);
    restart.addImage(restartImg);
    restart.visible = false;
    restart.scale = 0.5;

    pipeGroup = new Group();
}

function draw(){
    background("pink");

    if(score === 100){
        pointSound.play();
    }

    if(score === 200){
        pointSound.play();
    }

    if(score === 300){
        pointSound.play();
    }

    if(score === 400){
        pointSound.play();
    }

    if(score === 500){
        pointSound.play();
    }


    if(gameState === PLAY){

        if(bg.x < 100){
            bg.x = 200;
        }
        
        if(ground.x < 100){
            ground.x = 200;
        }

    SpawnPipe();
    
        if((touches.length > 0 || keyDown("UP_ARROW")) && bird.y  <= 500){
    
            //giving velocity
            bird.velocityY = -12;

            wingSound.play();

            touches = [];
          }
          
          //increasing velocity
          bird.velocityY = bird.velocityY + 0.8;
    
          score = score + Math.round(getFrameRate()/60);
    
          if(bird.isTouching(invisibleGround)){
              gameState = 1;

              dieSound.play();
          }
    
          if(pipeGroup.isTouching(bird)){
            gameState = 1;

            hitSound.play();
          }
    }
    else if(gameState === END){
        
       bg.velocityX = 0;
       bird.velocityY = 0;
       ground.velocityX = 0;
       pipeGroup.setVelocityXEach(0);
       pipeGroup.destroyEach();

     restart.visible = true;
    
     if(touches.length > 0 || mousePressedOver(restart)){
         reset();

         touches = [];
     }
    }

    drawSprites();
    
    textSize(20);
    fill("Black");
    text("Score : " + score, 50, 25)

    textSize(15);
    fill("Red");
    text("Made by Azim Faruk", 140, 485)
}

function SpawnPipe(){
    if(frameCount % 50 === 0){
        pipe = createSprite(300, random([0, -100, 450, 600]));
        pipe.addImage(pipeImg);

        pipe.velocityX = -3;
        
        pipe.lifetime = 200;

        pipeGroup.add(pipe);
        
    pipe.depth = bird.depth;
    bird.depth +=1;
    }
}

//reset function -
function reset(){
  
    //changing gameState
    gameState = 0;

    swooshSound.play();

    bird.y = 200;
    pipeGroup.setVelocityXEach(-3);
    restart.visible = false;
    bg.velocityX = -3;
    ground.velocityX = -3;
    pipeGroup.destroyEach();
    
    //score as 0
    score = 0;
  
  }