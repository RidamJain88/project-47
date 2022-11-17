var PLAY = 1;
var END = 0;
var gameState = "play"
var bg , bgImg ;
var player , playerImg , bulletImg , bulletGroup ;
var zombies , zombieImg , zombie2Img,zombieGroup ;
var heart1 , heart2 , heart3 , heart1Img , heart2Img , heart3Img
var life = 3 ;
var score = 0 ;
var bullets = 75;

function preload(){
  playerImg = loadImage("assets/pc.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombie2Img = loadImage("assets/ZOMBIE2.jpg")
  heart1Img=loadImage("assets/heart_1.png")
  heart2Img=loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  bulletImg = loadImage("assets/bulletpic2.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
bg = createSprite(displayWidth/2-20,displayHeight/2-40 , 20,20);
bg.addImage(bgImg)
player=createSprite(displayWidth/2-500 , displayHeight/2-35 , 20,20)
player.addImage(playerImg)
player.scale = 0.4
//player.debug=true;
player.setCollider("rectangle",0,0,300,300)

heart1 = createSprite(displayWidth-150,40,20,20)
heart1.visible = false;
heart1.addImage("heart1",heart1Img)
heart1.scale = 0.4

heart2 = createSprite(displayWidth-150,40,20,20)
heart2.visible = false;
heart2.addImage("heart2",heart2Img)
heart2.scale = 0.4

heart3 = createSprite(displayWidth-150,40,20,20)
heart3.visible = false;
heart3.addImage("heart3",heart3Img)
heart3.scale = 0.4

zombieGroup = new Group();
bulletGroup = new Group();




}

function draw() {
  background(220);
 if(gameState === "play"){
  
  
  if(keyDown("LEFT_ARROW")){
    player.y=player.y-10
  }

  if(keyDown("RIGHT_ARROW")){
    player.y=player.y+10
  }
  
  if(keyWentDown("SPACE")){
    bullet = createSprite(player.x +2 , player.y  , 20,20)
    bullet.velocityX = 20 ;
    bulletGroup.add(bullet)
    player.depth = bullet.depth;
    player.depth = player.depth+2
    bullet.addImage(bulletImg)
    bullet.lifetime = 200 ;
    bullet.scale = 0.2 ;
   bullet = bullets-1
    
  
  }
  else if(keyWentUp("space")){
    player.addImage(playerImg)
  }
  if(bullets === 0){
    gameState = "bullet"
  }
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        //score = score+5
      }
    }
  }
  if(zombieGroup.isTouching(player)){
    for(var i = 0;i<zombieGroup.length;i++){
     if(zombieGroup.isTouching(player)){
      zombieGroup[i].destroy()
     // life = life-1 ;
     }
    }
  }
  zombie();
}
drawSprites();
 if(gameState === "lost") {

  

   fill("red")
   textSize(45)
    text("You Lost" ,displayWidth/2 , displayHeight/2 );
  zombieGroup.destroyEach();
  player.destroy();

}
if(gameState === "won") {

  

  fill("blue")
  textSize(45)
   text("You Won" ,400, 400 );
 zombieGroup.destroyEach();
 player.destroy();

}
if(gameState === "bullet") {

  

  fill("red")
  textSize(45)
   text("You ran out of bullets" ,470, 420 );
 zombieGroup.destroyEach();
 player.destroy();
 bulletGroup.destroyEach();

}


  // textSize(20)
  // fill("white")
  // text("Score:"+score , displayWidth-200 , displayHeight/2-220)
  // text("Lives:"+life , displayWidth-200 , displayHeight/2-280)
}


function zombie(){
if(frameCount%60===0){
  
  zombies=createSprite(random(1100,1200),random(100,500) , 20 ,20)
  zombies.addImage(zombieImg)
  zombies.scale = 0.15
  zombies.velocityX = -4;
  //zombies.debug = true;
  zombies.setCollider("rectangle",0,0,400,400)
  zombies.lifetime = 400
  zombieGroup.add(zombies)


}

  
}