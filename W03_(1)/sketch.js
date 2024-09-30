let p;
let r;
let drops = [];
function setup() {
  createCanvas(500, 500);

  drops.push(new Drop(mouseX, 0));
  p = new Person();
  r = new Room();
}

function draw() {
  background(0);
  for (let i = 0; i < drops.length; i++) {
    let d = drops[i];
    d.display();
    d.updatePos();
    d.adjustVel();
    d.pool();
    
let gravity = createVector(0, 1);
    gravity.mult(d.mass); 
    d.applyForce(gravity);
    
  }
  
  while (drops.length > 500) {
    drops.splice(0, 1); // (index, howMany)
  }

  //window
  push();
  fill(50, 100, 255);
  beginShape();
  stroke(255);
  strokeWeight(3);
  vertex(30, 100);
  vertex(60, 70);
  vertex(60, 170);
  vertex(30, 200);
  vertex(30, 100);
  endShape();
  pop();

  push();
  stroke(255);
  line(45, 85, 45, 185);
  line(30, 150, 60, 120);
  pop();

  r.display();
  p.display();
}

class Person {
  constructure() {
    this.rad = 10;
  }
  display() {
    circle(370, 350, 40);
    push();
    noFill();
    stroke(255);
    strokeWeight(3);
    bezier(370, 350, 394, 397, 405, 390, 416, 440);
    bezier(416, 440, 365, 380, 381, 380, 356, 440);
    bezier(390, 386, 356, 395, 365, 386, 366, 418);
    pop();
  }
}

class Room {
  constructure() {
    this.c = 0;
  }
  display() {
    push();
    stroke(100);
    strokeWeight(2);
    line(100, 0, 100, 400);
    line(100, 400, 0, 500);
    line(100, 400, 500, 400);
    pop();
  }
}

class Drop {
  constructor(x, y) {
    this.rad = 2;
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = random(1, 4);
    this.rad = this.mass;
    this.top = -this.rad;
  }
  applyForce(f) {
    
    if (this.mass <1){
      this.mass = 1;
    }
    
    
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force);
  }
  updatePos() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
  adjustVel(amount) {
    this.vel.mult(1 + amount);
  }
  pool() {
    if (this.pos.y > 450) {
      this.pos.y = 450;
      this.vel.y = 0;
      this.acc.y = 0;
      this.rad += 1;
      this.top += 1;
    }
    if(this.rad> 4 || this.top >0){
      this.rad = 4;
      this.top = 0;
    }
    
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(0, 0, 255);
    noStroke();
    circle(0, 0, this.rad * 2);
    triangle(this.rad, 0, -this.rad, 0, 0, this.top * 2);
    pop();
  }
}

//function mousePressed() {
//console.log(mouseX, mouseY);
//}
