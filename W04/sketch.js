let planet, splanet;
let meteorolites = [];
let stars = [];
function setup() {
  createCanvas(500, 500);
   planet = new Ball(150,150, 40,50,40,142);
  splanet = new Ball(50,50, 20,203,203,37);
  
 for(let i = 0; i<50; i++){
   let x= random(width);
   let y = random(height);
stars.push(new Star(x,y));
 }
}

function mousePressed(){
  if(mouseIsPressed){
    let rad = random(2, 8);
    meteorolites.push(new Meteorolite(mouseX,mouseY, rad));
  }
}



function draw() {
  background(0);
  
  for(let i = 0; i<stars.length;i++){
    let s = stars[i];
    s.display();
}
  
   for(let i = 0; i< meteorolites.length; i++){
      let m = meteorolites[i];
      m.display();
      m.attractedTo(splanet);
      m.updatePosition();
      m.adjustVelocity(-0.01);
    }
  
   planet.display();
  splanet.attractedTo(planet);
  splanet.updatePosition();
  splanet.display();
  
  push();
  translate(150,150)
  fill(101,176,131);
  rotate(frameCount*-0.03);
  stroke(77,144,104)
  quad(-10,-27,-31,-6,-22,15,-1,-4);
  quad(3,16,-2,29,17,23,25,2);
  triangle(8,-31,15,-6,27,-12);
  pop();
  
  push();
  fill(255);
  textStyle(ITALIC);
  text('click to make more meteorolites',300,480);
  
  pop();

}

class Ball {
  constructor(x, y, r,R,G,B) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 10);
    this.acc = createVector();
    this.rad = r;
    this.mass = this.rad / 2; 
    this.r = R;
    this.g = G;
    this.b = B;
    
  }
  attractedTo(target) {
    let vector = p5.Vector.sub(target.pos, this.pos);
    vector.mult(0.01);
    this.applyForce(vector);
  }
  applyForce(f) {
    if (this.mass < 0) return;
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force); 
  }
  adjustVelocity(amount) {
    this.vel.mult(1 + amount);
  }
  updatePosition() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); 
  }
  
  display() {
    push();
    fill(this.r,this.g,this.b);
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.rad * 2);
    pop();
  }
}


class Meteorolite{
constructor(x,y,r){
  this.pos = createVector(x,y);
  this.vel = createVector(0,10);
  this.acc = createVector();
  this.rad = r;
  this.mass = this.rad / 5;
}
  attractedTo(target) {
    let vector = p5.Vector.sub(target.pos, this.pos);
    vector.mult(0.1);
    this.applyForce(vector);
  }
  applyForce(f) {
    if (this.mass < 0) return;
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force); 
  }
  adjustVelocity(amount) {
    this.vel.mult(1 + amount);
  }
  updatePosition() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); 
  }
  
  display() {
    push();
    fill(128,128,128);
    noStroke();
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.rad * 2);
    pop();
  }
  
}

class Star{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.color = 255;
    this.freq= frameCount*0.1;
  }
  display(){
    push();
    translate(this.x,this.y);
    quad(0,-5,5,0,0,10,-5,0);
    fill(this.color);
    pop();
  }
}




//function mousePressed() {
 //console.log("vertex(" + mouseX + "," + mouseY + ")");
//}


