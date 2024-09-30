let r;

function setup() {
  createCanvas(500, 500);
  r = new Rabbit(random(width), random(height));
}

function draw() {
  background(220);
  r.display();
  r.colorChange();
  r.eyeMovement();
  r.earMove();
}

class Rabbit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia1 = 20;
    this.dia2 = 5;
    this.r = 255;
    this.g = 255;
    this.b = random(255);
  }

  display() {
    fill(this.r, this.g, this.b);
    bezier(
      this.x + 50,
      this.y + 28,
      this.x + 51,
      this.y - 20,
      this.x + 110,
      this.y + 16,
      this.x + 63,
      this.y - 122
    );
    bezier(
      this.x + 46,
      this.y + 28,
      this.x + 34,
      this.y - 52,
      this.x + 34,
      this.y - 65,
      this.x + 63,
      this.y - 122
    );
    bezier(
      this.x + 46,
      this.y + 28,
      this.x + 54,
      this.y - 21,
      this.x + 82,
      this.y - 8,
      this.x + 63,
      this.y - 122
    );
    bezier(
      this.x - 50,
      this.y + 28,
      this.x - 54,
      this.y - 20,
      this.x - 110,
      this.y + 16,
      this.x - 63,
      this.y - 122
    );
    bezier(
      this.x - 46,
      this.y + 28,
      this.x - 34,
      this.y - 52,
      this.x - 34,
      this.y - 65,
      this.x - 63,
      this.y - 122
    );
    bezier(
      this.x - 46,
      this.y + 28,
      this.x - 54,
      this.y - 21,
      this.x - 82,
      this.y - 8,
      this.x - 63,
      this.y - 122
    );

    push();
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
    fill(0);
    strokeWeight(2);
    line(0, 128, 0, 140);
    pop();
    push();
    translate(width / 2, height / 2);
    fill(255, 0, 0);
    circle(40, 85, this.dia1);
    circle(-40, 85, this.dia1);
    fill(255);
    circle(38, 83, this.dia2);
    circle(-38, 83, this.dia2);
    noStroke();
    fill(color("brown"));
    triangle(-10, 110, 0, 130, 10, 110);
    pop();
  }

  colorChange() {
    this.r = map(this.x, 0, width, 0, 255);
    this.g = map(this.y, 0, height, 0, 255);
  }

  eyeMovement() {
    this.dia1 = this.dia1 - sin(frameCount * 0.1);
    this.dia1 = constrain(this.dia1, 15, 25);
  }

  earMove() {
    if (mouseIsPressed) {
      if (this.x > width / 2) {
        this.x--;
      } else {
        this.x++;
      }

      if (this.y > height / 2) {
        this.y--;
      } else {
        this.y++;
      }
    }
  }
}
