let balls = [];
let springs = [];
let gui;
let ui = {
  radDist: 100,
  len: 100,
};

function setup() {
  createCanvas(600, 600);
  background(0);
  gui = new dat.GUI();
  gui.add(ui, "radDist", 10, 100, 1).onChange(clearBackground);
  gui.add(ui, "len", 30, 200, 10).onChange(clearBackground);

  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, PI * 2);
    let x = width / 2 + cos(angle) * ui.radDist;
    let y = height / 2 + sin(angle) * ui.radDist;
    balls.push(new Ball(x, y, 10));
  }

  for (let i = 0; i < balls.length - 1; i++) {
    springs[i] = new Spring(balls[i], balls[i + 1], ui.len);
  }
  springs.push(new Spring(balls[11], balls[0], ui.len));
}

function draw() {
  background(0);
  
  for (let s of springs) {
    s.updateBy(ui);
    s.update();
    //s.display();
  }
  
  fill(255);
  beginShape();
  for (let b of balls) {
    b.updatePosition();
    b.drag();
    //b.display();
    b.explode();
    b.colorChange();
    vertex(b.pos.x, b.pos.y);
  }
  endShape(CLOSE);
  
  push();
  let sinForRad = sin(frameCount * 0.1);
  let dia = map(sinForRad, -1, 1, 100, 150);
  fill(0, 255, 255);
  circle(width / 2, height / 2, dia);
  pop();
}

class Spring {
  constructor(b1, b2, len) {
    this.b1 = b1;
    this.b2 = b2;
    this.len = len;
    this.k = 0.05;
  }
  updateBy(params) {
    this.len = params.len;
  }
  update() {
    let force = p5.Vector.sub(this.b2.pos, this.b1.pos);
    let distance = force.mag();
    let stretch = distance - this.len;
    let mag = -1 * this.k * stretch;

    force.normalize();
    force.mult(mag);
    this.b2.applyForce(force);

    force.mult(-1);
    this.b1.applyForce(force);
  }
  display() {
    push();
    line(this.b1.pos.x, this.b1.pos.y, this.b2.pos.x, this.b2.pos.y);
    pop();
  }
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.b = 255;
    this.rad = r;
    this.mass = this.rad / 10;
    this.damping = 0.95;
  }
  applyForce(f) {
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
    this.vel.mult(this.damping);
  }
  drag() {
    let mouseVec = createVector(mouseX, mouseY);
    let distance = this.pos.dist(mouseVec);
    if (distance < this.rad && mouseIsPressed) {
      this.pos.x = mouseX;
      this.pos.y = mouseY;
    }
  }
  explode() {
    if (keyIsPressed) {
      if (keyCode === UP_ARROW) {
        this.vel.add(this.e);
        this.pos.add(this.vel);
      }
    }
  }
  colorChange() {
    this.b -= 1;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(225);
    fill(0, 0, this.b);
    circle(0, 0, this.rad * 2);
    pop();
  }
}

function clearBackground() {
  background(0);
}
