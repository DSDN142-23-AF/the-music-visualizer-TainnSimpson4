let lightColor = [255, 255, 100, 0];
let projectorColor = [255, 255, 100, 150];  
let strobeColor = [255, 255, 100];
let speakerCol = [2, 48, 71];

let colID = 0; 
let strColID = 0; 
let canSwitchColor = false; 
let canChangeStrobe = true; 
let thing;

var lightDistance = 0; 

var speakerX = 550; 
var speakerY = 600; 
var speakerSize = 150; 

var rand = 2; 
var newRand = 2; 

var fade = 175; 

var loaded = false; 




// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  if(loaded == false)
  {
    thing = loadImage('thief.webp');
    loaded = true; 
  }

  let skyGradient = drawingContext.createLinearGradient(0, 0, 0, height);
  skyGradient.addColorStop(0, color(39, 125, 161));
  skyGradient.addColorStop(0.5, color(249, 132, 74));
  drawingContext.fillStyle = skyGradient;

  background(20);
  rect(width/2,height/2,width,height);

  let groundGradient = drawingContext.createLinearGradient(0, 0, 0, height);
  groundGradient.addColorStop(0, color(67, 170, 139));
  groundGradient.addColorStop(1, color(88, 81, 35));

  drawingContext.fillStyle = groundGradient;



  //fill(200,200,200);
  rect(width/2, height * 0.8, width, height * 0.4);
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);






   //THIS IS THE DRUMS COLOR PICKER

   if(drum < 70){canSwitchColor = true;}
   if(drum > 80 && canSwitchColor)
   {  
    canSwitchColor = false;
    colID = colID + 1; 
    if(colID == 5)
    {
      colID = 0; 
    } 
    switch(colID)
    {
      case 0: 
        //orange
        lightColor = [225,125,75, 20 ];
        projectorColor = [225,125,75, 150];
        break;
      case 1: 
        //yellow
        lightColor = [225, 200, 100, 20 ];
        projectorColor = [225, 200, 100, 150];
        break;
      case 2:
        //blue
        lightColor = [75,175,200, 15];
        projectorColor = [75,175,200, 150];
        break;
      case 3: 
        //red
        lightColor = [180, 50, 50, 10];
        projectorColor = [180, 50, 50, 150];
        break;
      case 4: 
        //green
        lightColor = [100, 200, 100, 10];
        projectorColor = [100, 200, 100, 150];
        break; 
    }
   }

   if (fade > 0){fade = fade - 1; }
   if(vocal < 70){canChangeStrobe = true;}
    if(vocal > 80 && canChangeStrobe)
    {
      fade = 175;
      canChangeStrobe = false; 
      changeRand();
      strColID = strColID + 1;
      if(strColID == 3){strColID = 0;}
      switch(strColID)
      {
        case 0: 
          //orange
          strobeColor = [255, 255, 100];
          break;
        case 1: 
          //yellow
          strobeColor = [255, 0, 0];
          break;
        case 2:
          //blue
          strobeColor = [0, 0, 255];
          break;
      }
    }


    if(newRand < rand)
    {
      rand = rand - 0.5; 
    }
    if(newRand > rand){
      rand = rand + 0.5;
    }
   drawDrumStuff(drum);
   drawBassStuff(bass);

    drawWordStuff(words);
    drawStrobelights();

   // display "words"

}

function drawDrumStuff(drum)
{
  for(var i = 1; i < 3; i++){
    var xpos = 200*i + ((width-700 ) * (i - 1)) + 40 ; //FIX THIS CODE

    //DRAWS CIRCLE ON GROUND AND LIGHT SOURCE
    fill(lightColor)
    for(var j = 0; j < 20; j++) {ellipse(xpos, 840, j * drum/2 , j * drum/5);}


    fill(speakerCol);
    for(var j = 0; j < 40; j++) {rect(xpos, 800 + (j/6), 80 - (j * 2), 80);}

    xpos = xpos - 40; 
    var drumWidth = map(drum/2, 0, 60, 0, 250);

    //COLORS
    fill(lightColor);
    stroke(lightColor); 

    //SHAPE OF LIGHT SOURCE
    for(var j = 0; j < 20; j++){
      ellipse(xpos + 40, 760, 80, 20)
      var increaseX = j * 5; 
      beginShape();
      vertex(xpos, 760);
      vertex(xpos + 80, 760);
      vertex((xpos + 80) + drumWidth + increaseX, 0);
      vertex((xpos - drumWidth) - increaseX, 0);
      endShape(CLOSE);  

    }
   }
}

function drawBassStuff(bass)
{
  var bassSize = map(bass, 0, 90, 30, speakerSize - 30);
  var smallBassSize = map(bass, 0, 90, 10, speakerSize - 60);
  var pX = speakerX;
  var pY = speakerY;
  speakers(pX, pY, bassSize, smallBassSize);
  fill(speakerCol);
  speakers(width - pX, pY, bassSize, smallBassSize);
}

function drawWordStuff(words)
{
  var centW = width/2;
  var centH = height/2; 
  var size = 600; 

  fill(speakerCol);
  rect(centW, centH - size/7, size + 15, size/1.5 + 15);
  fill(200, 200, 200)
  rect(centW, centH - size/7, size, size/1.5);

  fill(lightColor);

  for(var i = 0; i < 4; i++)
  {
    beginShape();
    vertex(centW - size/2 + 15/2 + i * 5, centH + size/5 - 15);
    vertex(centW + size/2 - 15/2 - i * 5, centH + size/5 - 15);
    vertex(centW + size/10 - i * 3, height);
    vertex(centW - size/10 + i * 3,height);
    endShape(CLOSE);  

  }


  tint(projectorColor);
  image(thing, centW - size/2 + 5, centH - size/7 - size/3 + 5, size - 10,size/1.5 -10);


  fill(255, 255, 255);

  textAlign(CENTER);
  textSize(30);
  text(words, centW, centH - size/7);
}

function drawStrobelights()
{ 
  //rand = round(rand); 
  posY = (height/2) * 1.7; 
  posX = width/4 - 100;
  for(var j = 0; j < 2; j++)
  {
    if(j == 1)
    {
      posX = width - posX;
    }
    strSize = 80;
    fill(0,0,0); 
    strokeWeight(10);
  
    var round = 200; 
    var increments = (round)/8 * rand;
    var distance = -increments * 8;

    
    stroke(strobeColor[0], strobeColor[1], strobeColor[2], fade)

    
    for(var i = 0; i < 8; i++)
    {
      posX = posX + strSize/8;
      line(posX , posY, posX  + distance/2 + (increments * (i)) + increments/2 , posY - height  );
    }
  
  
    strokeWeight(1);
    stroke(0,0,0,0);
    fill(speakerCol);
    rect(posX - strSize/2 + 5,posY + strSize/2, strSize,strSize);
  
  }
  

  //
}

function changeRand()
{
  while(rand == newRand)
  {
    newRand = Math.round(random(2, 9));
  }
}

function speakers(x, y, size, smallSize)
{
  fill(speakerCol);
  rect(x,y,speakerSize,speakerSize*2);
  
  fill(39, 125, 161);
  ellipse(x,y - speakerSize/2,smallSize,smallSize);
  ellipse(x,y + speakerSize/3 ,size,size);
}



function changeImage()
{
  thing = loadImage('image.png');
}