// these are globaal variables
var bg, backgroundImg;
var ironman;
var stoneGroup,stoneImage;
var diamondGroup,diamonImage;
var diamondScore=0;
var spikeGroup;spikeImage;
var gameState="PLAY";

function preload() {
 // to load diiferent images
  bgImg = loadImage("images/bg.jpg");
 ironmanImg = loadImage("images/iron.png");
 stoneImage=loadImage("images/stone.png");
 diamondImage=loadImage("images/diamond.png");
 spikeImage=loadImage("images/spikes.png");
}

function setup() {
  //to create a canvas of 1000*600
  createCanvas(1000, 600);

  // create background sprite
  bg = createSprite(580,300);
  bg.addImage(bgImg);
  bg.scale =2;
  bg.velocityY=10;

 // create ground sprite for mario 
 ground = createSprite(200,585,1700,10);
 ground.visible = false;

 // to create group
 stoneGroup=new Group();
 
 //to create ironman sprite 
 ironman =createSprite(200,450,20,50);
 ironman.addImage(ironmanImg);
 ironman.scale=0.3;

 // to change collider height and width
 ironman.setCollider("rectangle",0,0,500,450);
 //to display collider
 ironman.debug=true;

 //to create group
 diamondGroup=new Group();
 spikeGroup=new Group();
}

function draw() {

 if(gameState === "PLAY"){ 
//scroll background 
  if(bg.y>500)
  bg.y=200;
 //to prevent ironman to move out of canvas
  if(ironman.x<200){
    ironman.x=200;
  }
 //to prevent ironman to move out from top
  if(ironman.y<50){
    ironman.y=50;
  }
 //move up on up key
  if(keyDown("up")){
  ironman.y -= 5;
  }
 //move left on left key
  if(keyDown("left")){
  ironman.x=ironman.x -5;
  }
 //move right on right key
  if(keyDown("right")){
  ironman.x=ironman.x +5;
  }
 // move down on down key
  if(keyDown("down")){
    ironman.y=ironman.y +5;
}


  
//call the function to generate stones
  generateStones();
  for(var i = 0 ; i< (stoneGroup).length ;i++){
    var temp = (stoneGroup).get(i) ;
  
  if (ironman.isTouching(temp)) {
//make ironman step(collide) on ground
  ironman.collide(temp);
  
  }

}
//call the function to generate diamonds
 generateDiamonds();
  for(var i = 0 ; i<( diamondGroup).length ;i++){
  var temp = (diamondGroup).get(i) ;
  
  if (temp.isTouching(ironman)) {
//increase the score when diamond is caught 
  diamondScore++;
   // destroy the diamonds once caught 
  temp.destroy();
  temp=null;
  }
}
//call the function to generate spikes
generateSpikes();
for(var i = 0 ; i<( spikeGroup).length ;i++){
  var temp = (spikeGroup).get(i) ;
  
  if (temp.isTouching(ironman)) {
//reduce the score by 5 when spike is caught 
  diamondScore-=5;
  // destroy the spike once caught 
  temp.destroy();
  temp=null;
  }

}
}
if(diamondScore <= -10){
   gameState = "END";
}
if(ironman.y>610){
 gameState = "END";
}
//end of if gameState === "PLAY"
 else if (gameState ==="END"){
   bg.velocityY=0;
   ironman.velocity=0;
  // ironman.velocityY=0;
   spikeGroup.velocity(0);
   diamondGroup.velocity(0);
   stoneGroup.velocity(0);
   spikeGroup.lifetime(-1);
   diamondGroup.lifetime(-1);
   stoneGroup.lifetime(-1);
} 
//make ironman step(collide) on ground
  ironman.collide(ground);

    drawSprites();
    textSize(25);
  fill("yellow");
  text("Diamonds Collected: "+ diamondScore, 500,50);
}  
// function  definition of generate stones
function generateStones(){
  if (frameCount % 70 === 0) {
    var stone = createSprite(1200,120,40,10);
    // to generate random position of stone
    stone.x = random(100,650);
  stone.addImage(stoneImage);
    stone.scale = 0.5;
    stone.velocityY = +2;
 // to avoid memory leak     
    stone.lifetime =250;
    stoneGroup.add(stone);
}
}
// function  definition of generate diamonds
function generateDiamonds() {
  if (frameCount % 50 === 0) {
   var diamond = createSprite(1200,120,40,10);
   // to generate random position of diamond
   diamond.x = random(50,900);
   
  diamond.addImage(diamondImage);
    diamond.scale = 0.5;
    diamond.velocityY = +5;
 // to avoid memory leak     
    diamond.lifetime =1000;
  diamondGroup.add(diamond);
}
}
// function  definition of generate spikes
function generateSpikes() {
  if (frameCount % 60 === 0) {
   var spike = createSprite(1200,120,40,10);
   // to generate random position of spike
   spike.x = random(50,900);
  spike.addImage(spikeImage);
    spike.scale = 0.8;
    spike.velocityY = +5;
   // to avoid memory leak  
    spike.lifetime =1000;
  spikeGroup.add(spike);
}


}

