let head, ring, mouth, wing;
let eyes = [];
let balls = [];
let springs = [];
let fuzzes = [];
let particles1 = [];
let particles2 = [];
let brush = [];
let magmas = [];
function setup() {
  createCanvas(1680, 1680);

  push();
  head = new Head(width / 2, height / 2 - 500);
  ring = new Ring(width / 2, height / 2 - 650);
  eyes.push(new Eye(width / 2 - 70, height / 2 - 520));
  eyes.push(new Eye(width / 2 + 70, height / 2 - 520));
  mouth = new Mouth(width / 2, height / 2 - 450);
  wing = new Wing(width / 2, height / 2 - 350);
  pop();

  push();
  //heart
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, PI * 2);
    let x = width / 2 + cos(angle) * 80;
    let y = height / 2 - 230 + sin(angle) * 80;
    balls.push(new Ball(x, y, random(15, 20)));
  }
  for (let i = 0; i < balls.length - 1; i++) {
    let length = random(70, 80);
    springs[i] = new Spring(balls[i], balls[i + 1], length);
  }
  pop();

  //fuzz
  push();
  for (let i = -1; i <= 1; i++) {
    let x = width / 2 + 80 * i;
    let y = height / 2 - 80;
    fuzzes.push(new Fuzz(x, y));
  }

  for (let i = -2; i <= 1; i++) {
    let x = width / 2 + 80 * i + 40;
    let y = height / 2 + 0;
    fuzzes.push(new Fuzz(x, y));
  }

  for (let i = -1; i <= 0; i++) {
    let x = width / 2 + 80 + 160 * i;
    let y = height / 2 + 80;
    fuzzes.push(new Fuzz(x, y));
  }
  pop();
  //tail
  push();
  ball1 = new Ball1(width / 2 + 30, height / 2 + 100, 10);
  ball2 = new Ball1(width / 2 + 30, height / 2 + 400, 45);
  spring = new Spring1(ball1, ball2, 450);

  ball3 = new Ball1(width / 2, height / 2 + 100, 20);
  ball4 = new Ball1(width / 2 + 30, height / 2 + 400, 55);
  spring2 = new Spring1(ball3, ball4, 420);

  ball6 = new Ball1(width / 2 - 30, height / 2 + 400, 55);
  spring3 = new Spring1(ball3, ball6, 420);

  ball7 = new Ball1(width / 2 - 30, height / 2 + 100, 10);
  ball8 = new Ball1(width / 2 - 30, height / 2 + 400, 45);
  spring4 = new Spring1(ball7, ball8, 450);

  ball9 = new Ball1(width / 2, height / 2 + 400, 70);
  spring5 = new Spring1(ball3, ball9, 480);
  pop();
  
}

function mousePressed() {
  particles1.push(new Particle1(width / 2, height / 2));
  particles2.push(new Particle2(width / 2, height / 2 - 600));
  particles2.push(new Particle2(width / 2 - 70, height / 2 - 520));
  particles2.push(new Particle2(width / 2 + 70, height / 2 - 520));
}

function draw() {
 background(100);
  push();
  head.display();
  head.breath();
  ring.display();
  ring.breath();
  mouth.display();
  wing.display();
  wing.move();
  wing.rotate();
  for (let i = 0; i < eyes.length; i++) {
    let e = eyes[i];
    e.display();
  }
  pop();
  //heart
  push();
  for (let s of springs) {
    s.update();
  }
  noStroke();
  let r = noise(frameCount * 0.01) * 30 + 210;
  let g = cos(frameCount * 0.01) * 30 + 200;
  stroke(r, 0, 0);
  strokeWeight(5 + noise(frameCount * 0.1) * 5);
  fill(r, g, 100);
  beginShape();
  for (let b of balls) {
    b.updatePosition();
    b.drag();
    vertex(b.pos.x, b.pos.y);
  }
  endShape(CLOSE);
  pop();
  //tail
  push();
  spring.update();
  spring.display();
  spring.breath();
  spring2.update();
  spring2.display();
  spring2.breath();
  spring3.update();
  spring3.display();
  spring3.breath();
  spring4.update();
  spring4.display();
  spring4.breath();
  spring5.update();
  spring5.display();
  spring5.breath();
  pop();
  push();
  ball1.display();
  ball1.colorChange();
  ball3.display();
  ball3.colorChange();
  ball7.display();
  ball7.colorChange();
  pop();
  push();
  let gravity;
  gravity = p5.Vector.fromAngle(radians(45));
  ball2.applyForce(gravity);
  ball2.updatePosition();
  ball2.drag();
  ball2.display();
  ball2.colorChange();

  gravity = p5.Vector.fromAngle(radians(60));
  ball4.applyForce(gravity);
  ball4.updatePosition();
  ball4.drag();
  ball4.display();
  ball4.colorChange();

  gravity = p5.Vector.fromAngle(radians(120));
  ball6.applyForce(gravity);
  ball6.updatePosition();
  ball6.drag();
  ball6.display();
  ball6.colorChange();

  gravity = p5.Vector.fromAngle(radians(135));
  ball8.applyForce(gravity);
  ball8.updatePosition();
  ball8.drag();
  ball8.display();
  ball8.colorChange();

  gravity = p5.Vector.fromAngle(radians(90));
  ball9.applyForce(gravity);
  ball9.updatePosition();
  ball9.drag();
  ball9.display();
  ball9.colorChange();
  pop();
  
  //fuzz
  push();
  for (let i = 0; i < fuzzes.length; i++) {
    let f = fuzzes[i];
    f.display();
  }
  pop();
  push();
  for (const p1 of particles1) {
    p1.update();
    p1.display();
  }
  pop();
  push();
  for (const p2 of particles2) {
    p2.update();
    p2.display();
  }
  pop();

  if (mouseIsPressed) {
    brush.push(new Brush(mouseX, mouseY));
  }
  for (let i = 0; i < brush.length; i++) {
    let b = brush[i];

    let speed = b.vel.mag();
    let friction = p5.Vector.mult(b.vel, -1);
    friction.normalize();
    friction.mult(0.8);
    friction.limit(speed); // ***
    b.applyForce(friction);
    b.updatePosition();
    b.display();
  }
  
   for (let i = 0; i < magmas.length; i++) {
    let m = magmas[i];

    let fall = createVector(0, 5);
    fall.mult(m.mass);
    m.applyForce(fall);

    let wind = createVector(random(-5, 5), 0);
    m.applyForce(wind);
    m.updatePosition();
    m.display();
    
}
}

function keyPressed() {
  if (keyCode === ENTER) {
    for (let i = 0; i < random(500, 1000); i++) {
      let m1 = new Magma(random(width), random(0,200));
      magmas.push(m1);
    }
  }
}

class Head {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.noise = 0;
    this.sin = 0;
    this.color=224;
  }
  display() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(this.color);
    strokeWeight(5 + this.noise);
    beginShape();
    curveVertex(130, -55);
    curveVertex(130, -55);
    curveVertex(160, -100);
    curveVertex(135, -160);
    curveVertex(130, -120);
    curveVertex(100, -100);
    curveVertex(60, -90);
    curveVertex(30, -90);
    curveVertex(0, -65);
    curveVertex(-30, -90);
    curveVertex(-60, -90);
    curveVertex(-100, -100);
    curveVertex(-130, -120);
    curveVertex(-135, -160);
    curveVertex(-160, -100);
    curveVertex(-130, -55);
    curveVertex(-130, -55);
    endShape();
    pop();

    push();
    noFill();
    translate(this.x, this.y);
     stroke(this.color);
    strokeWeight(8 + this.sin);
    beginShape();
    curveVertex(-130, -55);
    curveVertex(-130, -55);
    curveVertex(-165, -20);
    curveVertex(-155, 15);
    curveVertex(-120, 35);
    curveVertex(-100, 80);
    curveVertex(-50, 125);
    curveVertex(0, 135);
    curveVertex(50, 125);
    curveVertex(100, 80);
    curveVertex(120, 35);
    curveVertex(155, 15);
    curveVertex(165, -20);
    curveVertex(130, -55);
    curveVertex(130, -55);
    endShape();
    pop();
  }
  breath() {
    this.noise = noise(frameCount * 0.06) * 5;
    this.sin = sin(frameCount * 0.05) * 4;
  }
}

class Ring {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sin = 0;
    this.color=224;
  }
  display() {
    push();
    noStroke();
    fill(this.color);
    translate(this.x, this.y);
    beginShape();
    curveVertex(-60, -30 + this.sin);
    curveVertex(-60, -30 + this.sin);
    curveVertex(-70, 25 + this.sin);
    curveVertex(0, 35 + this.sin);
    curveVertex(70, 25 + this.sin);
    curveVertex(60, -30 + this.sin);
    curveVertex(55, 20 + this.sin);
    curveVertex(0, 30 + this.sin);
    curveVertex(-55, 20 + this.sin);
    curveVertex(-60, -30 + this.sin);
    curveVertex(-60, -30 + this.sin);
    endShape();
    pop();

    push();
    noStroke();
    fill(this.color);
    translate(this.x, this.y);
    beginShape();
    curveVertex(-10, -16 + this.sin);
    curveVertex(-20, -16 + this.sin);
    curveVertex(-12.5, -4 + this.sin);
    curveVertex(0, 0 + this.sin);
    curveVertex(12.5, -4 + this.sin);
    curveVertex(10, -16 + this.sin);
    curveVertex(7.5, -5 + this.sin);
    curveVertex(0, -2.5 + this.sin);
    curveVertex(-7.5, -5 + this.sin);
    curveVertex(-10, -16 + this.sin);
    curveVertex(-10, -16 + this.sin);
    endShape();
    pop();

    push();
    noStroke();
    fill(this.color);
    translate(this.x, this.y);
    beginShape();
    curveVertex(-25, -65 + this.sin);
    curveVertex(-25, -65 + this.sin);
    curveVertex(-33, -50 + this.sin);
    curveVertex(-10, -30 + this.sin);
    curveVertex(-25, -50 + this.sin);
    curveVertex(-25, -65 + this.sin);
    curveVertex(-25, -65 + this.sin);
    endShape();
    pop();

    push();
    noStroke();
    fill(this.color);
    translate(this.x, this.y);
    beginShape();
    curveVertex(5, 17 + this.sin);
    curveVertex(5, 17 + this.sin);
    curveVertex(20, 8 + this.sin);
    curveVertex(25, -10 + this.sin);
    curveVertex(25, 12.5 + this.sin);
    curveVertex(12.5, 17 + this.sin);
    curveVertex(5, 17 + this.sin);
    curveVertex(5, 17 + this.sin);
    endShape();
    pop();
  }
  breath() {
    this.sin = 0 + sin(frameCount * 0.02) * 10;
  }
}

class Eye {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  display() {
    push();
    let freq = frameCount * 0.05;
    let sinRadDist = sin(freq);
    let dia = map(sinRadDist, -1, 1, 60, 70);
    translate(this.x, this.y);
    fill(255, 0, 0, 100);
    stroke(255, 0, 0);
    strokeWeight(3);
    circle(0, 0, dia);
    pop();

    push();
    translate(this.x, this.y);
    for (let deg = 0; deg < 360; deg += 60) {
      let angleRad = radians(deg);
      let x = cos(angleRad) * dia * 0.38;
      let y = sin(angleRad) * dia * 0.38;
      stroke(200);
      circle(x, y, 9);
    }
    pop();

    push();
    translate(this.x, this.y);
    noStroke();
    fill(255, 255, 0);
    bezier(0, 15, -9, 0, -3, 0, 0, -15);
    bezier(0, 15, 9, 0, 3, 0, 0, -15);
    pop();
  }
}

class Mouth {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color=224;
  }
  display() {
    push();
    noFill();
     stroke(this.color);
    strokeWeight(5);
    translate(this.x, this.y);
    beginShape();
    curveVertex(-15, 50);
    curveVertex(-15, 50);
    curveVertex(-40, 6);
    curveVertex(-80, -9);
    curveVertex(-50, -21);
    curveVertex(50, -21);
    curveVertex(80, -9);
    curveVertex(40, 6);
    curveVertex(20, 50);
    curveVertex(0, 60);
    curveVertex(-15, 50);
    curveVertex(-15, 50);
    endShape();
    pop();

    push();
    noStroke();
    fill(this.color);
    translate(this.x, this.y);
    bezier(-50, -7, -40, -13, -37, -13, -23, -9);
    bezier(50, -7, 40, -13, 37, -13, 23, -9);
    bezier(-20, -21, -13, -19, -14, -14, -12, -10);
    bezier(20, -21, 13, -19, 14, -14, 12, -10);
    pop();

    push();
    translate(this.x, this.y);
    noFill();
    stroke(this.color);
    strokeWeight(3);
    circle(-28, 6, 14);
    circle(28, 6, 14);
    pop();
  }
}

class Spring {
  constructor(b1, b2, len) {
    this.b1 = b1;
    this.b2 = b2;
    this.len = len;
    this.k = 0.1;
    this.weight = 2;
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
    strokeWeight(this.weight);
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
    this.mass = this.rad;
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
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(225);
    fill(220, 223, 177);
    circle(0, 0, this.rad * 2);
    pop();
  }
}

class Wing {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.weight = 4;
    this.angle1 = 0;
    this.angle2 = 0;
    this.color=224;
  }
  display() {
    push();
    translate(this.x, this.y);
    noFill();
     stroke(this.color);
    strokeWeight(this.weight);
    rotate(this.angle1);
    beginShape();
    curveVertex(150, 0);
    curveVertex(150, 0);
    curveVertex(240, -100);
    curveVertex(270, -220);
    curveVertex(410, -290);
    curveVertex(490, -240);
    curveVertex(490, -240);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    noFill();
     stroke(this.color);
    strokeWeight(this.weight);
    rotate(-this.angle1);
    beginShape();
    curveVertex(-150, 0);
    curveVertex(-150, 0);
    curveVertex(-240, -100);
    curveVertex(-270, -220);
    curveVertex(-410, -290);
    curveVertex(-490, -240);
    curveVertex(-490, -240);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    noFill();
     stroke(this.color);
    rotate(this.angle2);
    strokeWeight(this.weight / 2);
    beginShape();
    curveVertex(205, -70);
    curveVertex(205, -70);
    curveVertex(230, -115);
    curveVertex(225, -180);
    curveVertex(225, -180);
    endShape();
    pop();
    push();
    translate(this.x, this.y);
    noFill();
     stroke(this.color);
    rotate(-this.angle2);
    strokeWeight(this.weight / 2);
    beginShape();
    curveVertex(-205, -70);
    curveVertex(-205, -70);
    curveVertex(-230, -115);
    curveVertex(-225, -180);
    curveVertex(-225, -180);
    endShape();
    pop();
  }
  move() {
    this.weight = 1 + noise(frameCount * 0.02) * 10;
  }
  rotate() {
    this.angle1 = map(noise(frameCount * 0.01), -1, 1, 0, PI / 9);
    this.angle2 = map(noise(frameCount * 0.02), -1, 1, 0, PI / 12);
  }
}

class Fuzz {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(0);
    beginShape();
    vertex(5, -20);
    bezierVertex(30, -10, 30, 27, 5, 27);
    bezierVertex(15, 30, 35, 2, 5, -20);
    endShape();

    beginShape();
    vertex(-5, -20);
    bezierVertex(-30, -10, -30, 27, -5, 27);
    bezierVertex(-15, 30, -35, 2, -5, -20);
    endShape();

    beginShape();
    vertex(5, -50);
    bezierVertex(45, 0, 45, 35, 5, 60);
    bezierVertex(45, 50, 55, -15, 5, -50);
    endShape();

    beginShape();
    vertex(-5, -50);
    bezierVertex(-45, 0, -45, 35, -5, 60);
    bezierVertex(-45, 50, -55, -15, -5, -50);
    endShape();

    beginShape();
    vertex(-5, -15);
    bezierVertex(-5, -10, -15, 8, -5, 25);
    bezierVertex(-5, 25, -20, 8, -5, -15);
    endShape();

    beginShape();
    vertex(5, -15);
    bezierVertex(5, -10, 15, 8, 5, 25);
    bezierVertex(5, 25, 20, 8, 5, -15);
    endShape();

    pop();
  }
}

class Spring1 {
  constructor(b1, b2, len) {
    this.b1 = b1;
    this.b2 = b2;
    this.len = len;
    this.k = 0.02;
    this.weight = 3;
    this.color=224;
  }
  update() {
    let force = p5.Vector.sub(this.b2.pos, this.b1.pos);
    let distance = force.mag();
    let stretch = distance - this.len;
    let mag = -1 * this.k * stretch;
    force.normalize();
    force.mult(mag);
    this.b2.applyForce(force);
  }
  display() {
    push();
     stroke(this.color);
    strokeWeight(this.weight);
    line(this.b1.pos.x, this.b1.pos.y, this.b2.pos.x, this.b2.pos.y);
    line(
      this.b1.pos.x - this.b1.rad,
      this.b1.pos.y,
      this.b2.pos.x - this.b2.rad,
      this.b2.pos.y
    );
    line(
      this.b1.pos.x + this.b1.rad,
      this.b1.pos.y,
      this.b2.pos.x + this.b2.rad,
      this.b2.pos.y
    );
    pop();
  }
  breath() {
    this.weight = 3 + noise(frameCount * 0.08) * 2;
  }
}

class Ball1 {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.rad = r;
    this.mass = this.rad / 10;
    this.r = 230;
    this.g = 200;
    this.damping = 0.9;
  }
  applyForce(f) {
    if (this.mass <= 0) {
      console.log("Wrong mass!");
      return;
    }
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
      distance = constrain(distance, 50, 100);
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.r, this.g, 50);
    stroke(this.g, this.r, 50);
    strokeWeight(3);
    circle(0, 0, this.rad * 2);
    pop();
  }
  colorChange() {
    this.r = map(sin(frameCount * 0.05), -1, 1, 230, 255);
    this.g = map(noise(frameCount * 0.05), -1, 1, 200, 255);
  }
}

class Particle1 {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.weight = 10;
    this.acc = createVector();
    this.mass = this.rad / 10;
    this.lifespan = 0.8;
    this.lifeReduction = random(0.005, 0.015);
    this.isDone = false;
    return this;
  }
  update() {
    this.updateLifespan();
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255 * this.lifespan, 255 * this.lifespan, 0);
    strokeWeight(this.weight * this.lifespan);
    beginShape();
    curveVertex(-490, -450);
    curveVertex(-490, -450);
    curveVertex(-450, -325);
    curveVertex(-550, 250);
    curveVertex(-525, 100);
    curveVertex(-525, 100);
    endShape();
    beginShape();
    curveVertex(490, -450);
    curveVertex(490, -450);
    curveVertex(450, -325);
    curveVertex(550, 250);
    curveVertex(525, 100);
    curveVertex(525, 100);
    endShape();
    beginShape();
    curveVertex(-375, -450);
    curveVertex(-375, -450);
    curveVertex(-400, -250);
    curveVertex(-350, -100);
    curveVertex(-350, 60);
    curveVertex(-350, 60);
    endShape();
    beginShape();
    curveVertex(375, -450);
    curveVertex(375, -450);
    curveVertex(400, -250);
    curveVertex(350, -100);
    curveVertex(350, 60);
    curveVertex(350, 60);
    endShape();
    beginShape();
    curveVertex(-250, -300);
    curveVertex(-250, -300);
    curveVertex(-250, -200);
    curveVertex(-200, -50);
    curveVertex(-200, -50);
    endShape();
    beginShape();
    curveVertex(250, -300);
    curveVertex(250, -300);
    curveVertex(250, -200);
    curveVertex(200, -50);
    curveVertex(200, -50);
    endShape();
    pop();
  }
  updateLifespan() {
    this.lifespan -= this.lifeReduction;
    if (this.lifespan < 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  applyForce(f) {
    if (this.mass <= 0) {
      return;
    }
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force);
  }

  adjustVelocity(amount) {
    this.vel.mult(1 + amount);
  }
}

class Particle2 {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1) * 1, random(-1.5, 1.0) * 1);
    this.rad = 50;
    this.acc = createVector();
    this.mass = this.rad / 10;
    this.lifespan = 0.8;
    this.lifeReduction = random(0.005, 0.015);
    this.isDone = false;

    return this;
  }
  update() {
    this.updateLifespan();
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255 * this.lifespan, 255 * this.lifespan, 0);
    strokeWeight(3 * this.lifespan);
    noFill();
    circle(0, 0, this.rad);
    circle(0, 0, this.rad * 0.8);
    circle(0, 0, this.rad * 0.5);
    circle(0, 0, this.rad * 0.2);
    pop();
  }
  updateLifespan() {
    this.lifespan -= this.lifeReduction;
    if (this.lifespan < 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }

  applyForce(f) {
    if (this.mass <= 0) {
      console.log("Wrong mass!");
      return;
    }
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force);
  }
  adjustVelocity(amount) {
    this.vel.mult(1 + amount);
  }
}

class Brush {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 3));
    this.acc = createVector();
    this.mass = random(5, 10);
    this.rad = this.mass;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    //circle(0, 0, this.rad * 2);
    blendMode(ADD);
    fill(200, 180, 60, 70);
    let xAdj, yAdj;
    xAdj = cos(frameCount * 0.1) * 2;
    yAdj = sin(frameCount * 0.1) * 2;
    circle(xAdj, yAdj, this.rad * 2);

    xAdj = cos(frameCount * 0.11) * 2;
    yAdj = sin(frameCount * 0.11) * 2;
    circle(xAdj, yAdj, this.rad * 2);

    xAdj = cos(frameCount * 0.09) * 2;
    yAdj = sin(frameCount * 0.09) * 2;
    circle(xAdj, yAdj, this.rad * 2);
    pop();
  }
  applyForce(f) {
    if (this.mass < 1) {
      this.mass = 1;
    }
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force);
  }
  updatePosition() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  adjustVelocity(amount) {
    this.vel.mult(1 + amount);
  }
}

class Magma {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = random(1, 10);
    this.rad = this.mass * 2;
  }
  applyForce(f) {
    if (this.mass < 1) {
      this.mass = 1;
    }
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force);
  }
  updatePosition() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255, 0, 0, 200);
    fill(255, 0, 0, 100);
    ellipse(0, 0, this.rad, this.rad * 2);
    pop();
  }
}
