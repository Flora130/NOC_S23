let n;

let treeLeft, treeRight, flow;

const RESOLUTION = 30;
const FREQ_POS = 0.0055;
const FREQ_TIME = 0.05;

let rows, cols;
let angles = [];
let vehicles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#C0C0C0");

  n = width / 2;

  cols = ceil(width / RESOLUTION);
  rows = ceil(height / RESOLUTION);

  for (let i = 0; i < 200; i++) {
    vehicles.push(
      new Vehicle(random(0, windowWidth / 4), windowHeight, "white")
    );
    vehicles.push(new Vehicle(0, random(0, windowHeight), "#E0E0E0"));
    vehicles.push(
      new Vehicle(
        random(windowWidth * 0.75, windowWidth),
        windowHeight,
        "black"
      )
    );
    vehicles.push(new Vehicle(windowWidth, random(0, windowHeight), "#A0A0A0"));
  }

  treeLeft = createGraphics(windowWidth, windowHeight);
  treeRight = createGraphics(windowWidth, windowHeight);
  flow = createGraphics(windowWidth, windowHeight);

  // left
  drawBranch(treeLeft, windowWidth / 2, windowHeight, 270, 150, 0, -0.5, 255);
  drawBranch(treeLeft, windowWidth / 2, windowHeight, 270, 150, 0, -1.2, 255);

  // right
  drawBranch(
    treeRight,
    windowWidth / 2,
    windowHeight,
    270,
    150,
    0,
    +0.5,
    "black"
  );
  drawBranch(
    treeRight,
    windowWidth / 2,
    windowHeight,
    270,
    150,
    0,
    +1.2,
    "black"
  );

  imageMode(CENTER);
}

function draw() {
  background("#C0C0C0");

  angles = [];

  // draw and update the flow field;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = c * RESOLUTION;
      let y = r * RESOLUTION;

      // angle from noise
      let gridCenter = createVector(x + RESOLUTION / 2, y + RESOLUTION / 2);
      let mouse = createVector(mouseX, mouseY);
      let vectorToMouse = p5.Vector.sub(mouse, gridCenter);

      let rotateAngle = map(sin(frameCount * 0.05), -1, 1, 30, 45);
      vectorToMouse.rotate(radians(rotateAngle));
      let angleFromMouse = vectorToMouse.heading();

      // angle from noise
      let xFrq = x * FREQ_POS + frameCount * FREQ_TIME;
      let yFrq = y * FREQ_POS + frameCount * FREQ_TIME;
      let noiseValue = noise(xFrq, yFrq); // 0 to 1
      let angleFromNoise = map(noiseValue, 0, 1, PI / 8, 0); // ***

      let angle = angleFromMouse;
      angles.push(angle);
    }
  }

  // vehicles
  for (let v of vehicles) {
    let c = floor(v.pos.x / RESOLUTION);
    let r = floor(v.pos.y / RESOLUTION);
    let index = c + r * cols;
    let angle = angles[index];
    v.flow(angle);
    v.update();
    v.reappear();
    v.displayPoint();
  }

  if (start == true) {
    n -= 0.8;
    if (n < 0) {
      n = 0;
    }
  }

  image(flow, windowWidth / 2, windowHeight / 2);
  image(treeLeft, windowWidth / 2 + n, windowHeight / 2);
  image(treeRight, windowWidth / 2 - n, windowHeight / 2);
}

let start = false;
function mousePressed() {
  if(start === false){
    start = true
  }else{
    start = false
  }
}

class Vehicle {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.col = col;
    //
    this.mass = 1;
    this.size = 20;
    //
    this.angle = 0;
    //
    this.maxSpeed = 1;
    this.maxSteerForce = 0.08;
  }
  attractedTo(target) {
    let vector = p5.Vector.sub(target, this.pos);
    vector.mult(0.05);
    this.applyForce(vector);
    //
    this.vel.mult(0.95);
  }
  flow(angle) {
    let desiredVel = p5.Vector.fromAngle(angle); // direction
    desiredVel.mult(this.maxSpeed); // desire

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
  }
  seek(target) {
    let desiredVel = p5.Vector.sub(target, this.pos);
    desiredVel.normalize(); // direction
    desiredVel.mult(this.maxSpeed); // desire

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    //
    this.angle = this.vel.heading();
  }
  applyForce(f) {
    if (this.mass <= 0) {
      console.log("Wrong mass");
      return;
    }
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  reappear() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  displayPoint() {
    flow.push();
    flow.stroke(this.col);
    flow.strokeWeight(1);
    flow.point(this.pos.x, this.pos.y);
    flow.pop();
  }
}
function drawBranch(pg, x, y, deg, len, gen, dir, col) {
  let angle = radians(deg);
  let targetX = x + cos(angle) * len;
  let targetY = y + sin(angle) * len;
  push();
  let sw = map(len, 150, 1, 15, 0);
  pg.stroke(col);
  blendMode(LIGHTEST);
  pg.strokeWeight(sw);
  pg.line(x, y, targetX, targetY);
  pop();

  // gen > 4
  // push particles

  if (gen <= 6) {
    gen++;
    if (gen == 1) {
      drawBranch(
        pg,
        targetX,
        targetY,
        deg + random(20, 35) * dir,
        len * random(0.75, 0.8),
        gen,
        dir,
        col
      );
    } else {
      drawBranch(
        pg,
        targetX,
        targetY,
        deg - random(20, 35),
        len * random(0.75, 0.8),
        gen,
        dir,
        col
      );
      drawBranch(
        pg,
        targetX,
        targetY,
        deg + random(20, 35),
        len * random(0.6, 0.75),
        gen,
        dir,
        col
      );
    }
  }
}
