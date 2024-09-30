let Leaves = [];
let l;
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(149, 195, 222);
  push();
  text("click mouse for more leaves",width-200,20);
  text("click space for fall",width-200,35);
  text("click --> for wind",width-200,50);
  
  pop();
  push();
  let freq = frameCount * 0.05;
  let sinVal = sin(freq);
  let rad = map(sinVal, -1, 1, 100, 150);
  let rad1 = map(sinVal, -1, 1, 120, 180);
  let t = map(sinVal, -1, 1, 0, 100);
  translate(width / 2, height / 2);
  fill(255, 255, 255, t);
  noStroke();
  circle(0, 0, rad);
  circle(0, 0, rad1);
  pop();
  push();
  noStroke();
  fill(0, 153, 76, 30);
  circle(0, height, 150);
  circle(20, height, 150);
  circle(0, 40, 150);
  circle(40, 0, 150);
  circle(100, 0, 180);
  circle(width, height, 100);
  circle(width, height - 50, 120);
  circle(width - 30, height, 100);
  pop();

  if (mouseIsPressed) {
    Leaves.push(new Leaf(mouseX, mouseY));
  }

  for (let i = 0; i < Leaves.length; i++) {
    let l = Leaves[i];
    if (keyIsPressed) {
      if (keyCode === RIGHT_ARROW) {
        let wind = createVector(1, 0);
        l.applyForce(wind);
      }
    }
    if (keyIsPressed) {
      if (key == " ") {
        let gravity1 = createVector(2, 1);
        gravity1.mult(l.mass);
        l.applyForce1(gravity1);

        let gravity2 = createVector(1 / 3, 1 / 3);
        gravity2.mult(l.mass);
        l.applyForce2(gravity2);
      }
    }
    l.display();
    l.updatePos();
    l.adjustVel();
    l.bottom();
  }
}

class Leaf {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.length = random(5, 20);
    this.mass = this.length;
    this.pos1 = createVector(this.length * 2, this.length);
    this.pos2 = createVector(this.length / 3, this.length / 3);
    this.vel1 = createVector();
    this.vel2 = createVector();
    this.acc1 = createVector();
    this.acc2 = createVector();
    this.vel = createVector();
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(0, 102, 51, 180);
    ellipse(0, 0, this.pos1.x, this.pos1.y);
    stroke(0, 255, 0);
    strokeWeight(3);
    pop();

    push();
    translate(this.pos.x, this.pos.y);
    stroke(0, 0, 51);
    strokeWeight(3);
    line(-this.pos1.x * 0.8, 0, this.pos1.x * 0.5, 0);
    line(0, 0, this.pos2.x, -this.pos2.y);
    line(0, 0, this.pos2.x, this.pos2.y);
    line(-this.pos2.x, 0, 0, -this.pos2.y);
    line(-this.pos2.x, 0, 0, this.pos2.y);
    pop();
  }
  bottom() {
    this.pos1.x = constrain(this.pos1.x, 0, this.mass * 12);
    this.pos1.y = constrain(this.pos1.y, 0, this.mass * 6);
    this.pos2.x = constrain(this.pos2.x, 0, this.mass * 2);
    this.pos2.y = constrain(this.pos2.y, 0, this.mass * 2);
  }
  applyForce(f) {
    let force = p5.Vector.div(f, this.mass);
    this.vel.add(force);
  }
  applyForce1(f) {
    let force1 = p5.Vector.div(f, this.mass);
    this.acc1.add(force1);
  }
  applyForce2(f) {
    let force2 = p5.Vector.div(f, this.mass);
    this.acc2.add(force2);
  }

  updatePos() {
    this.vel1.add(this.acc1);
    this.vel2.add(this.acc2);

    this.pos1.add(this.vel1);
    this.pos2.add(this.vel2);

    this.acc1.mult(0);
    this.acc2.mult(0);

    this.pos.add(this.vel);
  }
  adjustVel(amount) {
    this.vel1.mult(1 + amount);
    this.vel2.mult(1 + amount);
  }
}
