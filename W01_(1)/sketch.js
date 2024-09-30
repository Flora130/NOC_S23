

function setup() {
  createCanvas(500, 500);
  background(0);
  
  let r=random(255);
  let g=255;
  let b=random(255);
  
  push();
  fill(g,b,r);
  bezier(300, 278, 301, 230, 360, 266, 313, 128);
  bezier(296, 278, 284, 198, 284, 185, 313, 128);
  bezier(296, 278, 304, 229, 332, 242, 313, 128);

  bezier(200, 278, 196, 230, 140, 266, 187, 128);
  bezier(204, 278, 216, 198, 216, 185, 187, 128);
  bezier(204, 278, 196, 229, 168, 242, 187, 128);
  pop();
  
  push();
  fill(r,g,b);
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
  translate(width/2,height/2)
  fill(0);
  strokeWeight(2)
  line(0, 128, 0, 140);
  pop();
  
  
}

function draw() {
  

  push();
  translate(width / 2, height / 2);
  fill(255,0,0)
  circle(40, 85, 18);
  circle(-40, 85, 18);
  fill(255)
  circle(38,83,5);
  circle(-38,83,5);
  noStroke()
  fill(color("brown"))
  triangle(-10, 110, 0, 130, 10, 110);
  pop();
  
}


//function mousePressed() {
 // console.log("vertex(" + mouseX + "," + mouseY + ")");
//}
