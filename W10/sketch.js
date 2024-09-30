let branches = [];

function setup() {
  createCanvas(600, 600);
  background(100);
  push();
  noFill();
  stroke(255);
  allGenerate(width/2,height/2);
}

function draw() {
  background(100);
push();
  for (let b of branches) {
    b.display();
  }
}

function allGenerate(x,y){
  for (let i=0; i<=10;i++){
generateBranch (x,y,0+36*i,80);
  
}}


function generateBranch(x, y, deg, len, gen = 0) {
  let angle = radians(deg);
  let targetX = x + cos(angle) * len;
  let targetY = y + sin(angle) * len;

  let sw = map(len, 150, 1, 8, 0);

  branches.push(new Branch(x, y, targetX, targetY, sw, gen));

  if (gen <= 5) {
    gen++;
    generateBranch(
      targetX,
      targetY,
      deg - random(30, 60),
      len * random(0.5, 0.8),
      gen
    );
    generateBranch(
      targetX,
      targetY,
      deg + random(30, 60),
      len * random(0.5, 0.8),
      gen
    );
  }
}

class Branch {
  constructor(x, y, tx, ty, sw, gen) {
    this.x = x;
    this.y = y;
    this.tx = tx;
    this.ty = ty;
    this.thickness = sw;
    this.gen = gen;
  }
  display() {


    stroke(255);
    strokeWeight(this.thickness);
    line(this.x, this.y, this.tx, this.ty);

    noStroke();
    fill(255, 0, 0);

    
    if (this.gen >= 3) {
      noStroke();
      fill(255, 0, 0);
      circle(this.tx, this.ty, 5);
    }
    
  }
}
