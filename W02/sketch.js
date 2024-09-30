let r;

function setup() {
  createCanvas(500, 500);
  // background(225);
  r = new Rabbit();
}

function draw() {
  background(225);
  r.display();
  r.blowWind();
  r.earBack();
  r.eyesBlink();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    let westWind1 = createVector(-0.2, -0.04);
    let westWind2 = createVector(-0.3, -0.06);
    r.levelUp1(westWind1);
    r.levelUp2(westWind2);
  }
  if (keyCode === RIGHT_ARROW) {
    let eastWind1 = createVector(0.2, 0.04);
    let eastWind2 = createVector(0.3, 0.06);
    r.levelUp1(eastWind1);
    r.levelUp2(eastWind2);
  }
}

class Rabbit {
  constructor() {
    this.pos1 = createVector(304, 229);
    this.pos2 = createVector(360, 266);
    this.pos11 = createVector(284, 198);
    this.pos21 = createVector(284, 185);
    this.pos22 = createVector(332, 242);
    this.pos3 = createVector(313, 135);
    this.pos4 = createVector(196, 230);
    this.pos41 = createVector(216, 198);
    this.pos5 = createVector(140, 266);
    this.pos51 = createVector(216, 185);
    this.pos52 = createVector(168, 242);
    this.pos6 = createVector(187, 135);

    this.vel1 = createVector(0.2, 0.04);
    this.vel2 = createVector(0.3, 0.06);
    this.acc1 = createVector();
    this.acc2 = createVector();

    this.rad1 = 18;
    this.rad2 = 5;
  }
  display() {
    push();
    if (this.pos3.x > 313) {
      textSize(25);
      text("Wind Direction:East", 50, 90);
      let n = map(this.pos3.x, 313, 372, 1, 8);
      n = n.toFixed(1);
      textSize(25);
      text("Wind Level:" + n, 50, 50);
    }
    if (this.pos3.x < 313) {
      textSize(25);
      text("Wind Direction:West", 50, 90);
      let n = map(this.pos6.x, 187, 128, 1, 8);
      n = n.toFixed(1);
      textSize(25);
      text("Wind Level:" + n, 50, 50);
    }
    pop();
    
    push();
  textSize(15);
  fill(255,0,0);
  text('Bunny will tie its ears when the wind is too strong',50,480);
pop();
    
    
    push();
    fill(100, 100, 255);
    bezier(
      300,
      300,
      this.pos1.x,
      this.pos1.y,
      this.pos2.x,
      this.pos2.y,
      this.pos3.x,
      this.pos3.y
    );
    bezier(
      296,
      300,
      this.pos11.x,
      this.pos11.y,
      this.pos21.x,
      this.pos21.y,
      this.pos3.x,
      this.pos3.y
    );
    bezier(
      296,
      300,
      this.pos1.x,
      this.pos1.y,
      this.pos22.x,
      this.pos22.y,
      this.pos3.x,
      this.pos3.y
    );
    //right
    bezier(
      200,
      300,
      this.pos4.x,
      this.pos4.y,
      this.pos5.x,
      this.pos5.y,
      this.pos6.x,
      this.pos6.y
    );
    bezier(
      204,
      300,
      this.pos41.x,
      this.pos41.y,
      this.pos51.x,
      this.pos51.y,
      this.pos6.x,
      this.pos6.y
    );
    bezier(
      204,
      300,
      this.pos4.x,
      this.pos4.y,
      this.pos52.x,
      this.pos52.y,
      this.pos6.x,
      this.pos6.y
    );
    //left
    pop();

    push();
    fill(100, 100, 255);
    beginShape();
    vertex(250, 292);
    vertex(196, 260);
    vertex(157, 337);
    vertex(222, 394);
    vertex(250, 390);
    endShape();
    beginShape();
    vertex(250, 292);
    vertex(304, 260);
    vertex(343, 337);
    vertex(278, 394);
    vertex(250, 390);
    endShape();
    pop();

    push();
    translate(width / 2, height / 2);
    fill(255, 0, 0);
    circle(40, 85, this.rad1);
    circle(-40, 85, this.rad1);
    fill(255);
    circle(38, 83, this.rad2);
    circle(-38, 83, this.rad2);
    noStroke();
    fill(color("brown"));
    triangle(-10, 110, 0, 130, 10, 110);
    pop();

    push();
    translate(width / 2, height / 2);
    fill(0);
    strokeWeight(2);
    line(0, 128, 0, 140);
    pop();
  }
  blowWind() {
    this.pos1.add(this.vel1);
    this.pos11.add(this.vel1);
    this.pos2.add(this.vel1);
    this.pos21.add(this.vel1);
    this.pos22.add(this.vel1);
    this.pos3.add(this.vel1);

    this.pos4.add(this.vel1);
    this.pos41.add(this.vel1);
    this.pos5.add(this.vel1);
    this.pos51.add(this.vel1);
    this.pos52.add(this.vel1);
    this.pos6.add(this.vel2);
  }

  levelUp1(level1) {
    this.acc1.add(level1);
    this.vel1.add(this.acc1);
    this.acc1.mult(0);
  }
  levelUp2(level2) {
    this.acc2.add(level2);
    this.vel2.add(this.acc2);
    this.acc2.mult(0);
  }
  earBack() {
    if (this.pos3.x > 372) {
      let back1 = createVector(-1.2, -0.24);
      let back2 = createVector(-1.8, -0.36);
      this.vel1.add(back1);
      this.vel2.add(back2);
    }
    if (this.pos6.x < 128) {
      let back3 = createVector(1.2, 0.24);
      let back4 = createVector(1.8, 0.36);
      this.vel1.add(back3);
      this.vel2.add(back4);
    }
  }
  eyesBlink() {
    if (this.pos3.x > 313) {
      this.rad1 = map(this.pos3.x, 313, 372, 18, 25);
      this.rad2 = map(this.pos3.x, 313, 372, 5, 12);
    }
    if (this.pos3.x < 313) {
      this.rad1 = map(this.pos6.x, 187, 128, 18, 25);
      this.rad2 = map(this.pos6.x, 187, 128, 5, 12);
    }
  }
}

//function mousePressed() {
// console.log("vertex(" + mouseX + "," + mouseY + ")");
//}
