//RESPONSIVE
let frameW = document.getElementById("p5").offsetWidth;
let frameH = document.getElementById("p5").offsetHeight;

//Parameters
let xoff, yoff;
let mode = false;
let frq = 199; //frequency of big shapes, every frq frames
const size = 50;
const inc = 0.05;
const density = 10;
function setup() {
  createCanvas(frameW, frameH);
  pixelDensity(displayDensity());
  background(color("#121212"));
  rectMode(CENTER);
  xoff = random(1);
  yoff = random(1);
}

function draw_tissue(auto) {
  noFill();
  strokeWeight(1);
  xoff += (inc - .02) * auto;
  for (let i = 0; i < density; i++)
  {
    push();
    let _x = noise(xoff)*width;
    let _y = noise(yoff)*height;
    if(!auto)
    {
        _x = mouseX;
        _y = mouseY;
    }
    let _r = random(7-4*(frameCount%frq==0)); //if big shape time, make it fair chances to get any shape 
    let _hyp = sqrt(pow(width/2, 2) + pow(height/2, 2));
    let _d = map(dist(_x, _y, width/2, height/2), 1, _hyp, 0, 1);
    //only first shape gets bold on drums
    if(i == 0 && frameCount%frq==0)
    {
      _s = size + random(75,250);
      stroke(255 - mode*237, mode*10+random(25));
    }
    else
    { 
      _s = size + random(-20,20);
      stroke(255 - mode*237, (5+15*mode)*_d);
    }
    //circle
    if (_r < 1)
      rect(_x, _y, _s, _s); 
    //square
    else if(_r < 2)
      circle(_x, _y, _s); 
    //triangle
    else
    {
      //use triangle inside a circle
      let _angle = random(0, 2*PI);
      let _angle2 = random(0, 2*PI);
      let _angle3 = random(0, 2*PI);
      triangle(_x+_s*cos(_angle), _y+_s*sin(_angle), _x+_s*cos(_angle2), _y+_s*sin(_angle2), _x+_s*cos(_angle3), _y+_s*sin(_angle3))
    }
    pop();
  }
  yoff += inc*auto;
}

function draw()
{
    if(pmouseX!=mouseX || pmouseY!=mouseY)
    {
      draw_tissue(false);
    }
    draw_tissue(true);
}

function windowResized() {
    frameW = document.getElementById("p5").offsetWidth;
    frameH = document.getElementById("p5").offsetHeight;
    resizeCanvas(frameW, frameH);
    background(color("#121212"));
}