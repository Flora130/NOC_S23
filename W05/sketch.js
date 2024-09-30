let gui;

let ui = {
  x: 250,
  y: 250,
  dia: 5,
  smile: true,
  crazy: false,
  number: 1,
  radMin: 100,
  radMax: 200,
  angleVel: 0.04,
  amp: 180,
  mouthAmp: 100,
};

function setup() {
  createCanvas(500, 500);
  background(0);
  gui = new dat.GUI();

  let smileFolder = gui.addFolder("SMILE");
  smileFolder.add(ui, "number", 1, 12, 2).onChange(clearBackground);
  smileFolder.add(ui, "angleVel", 0.04, 0.1, 0.01).onChange(clearBackground);
  smileFolder.add(ui, "smile").onChange(clearBackground);
  smileFolder.open();

  let crazyFolder = gui.addFolder("CRAZY");
  crazyFolder.add(ui, "crazy").onChange(clearBackground);
  crazyFolder.add(ui, "amp", 150, 200);
  crazyFolder.add(ui, "mouthAmp", 80, 200);
  crazyFolder.open();
}

function draw() {
  if (ui.smile) {
    push();
    translate(width / 2, height / 2);
    let angle = frameCount * ui.angleVel;
    let radDist = map(sin(angle * ui.number), -1, 1, 150, 200);
    let freq = frameCount * 0.05;
    let amp = 30;
    let sinValue = sin(angle) * amp;

    let x = cos(angle) * radDist;
    let y = sin(angle) * radDist;
    fill(0, 255, 0);
    noStroke();
    circle(x, y, 20);

    circle(-80, -30 + sinValue, 15);
    circle(80, -30 + sinValue, 15);
    arc(0, 60, 100, 80, 0, PI, OPEN);
    pop();
  } else {
  }

  if (ui.crazy) {
    let freq = frameCount * 0.05;
    let amp2 = 50;
    let sinValue1 = sin(freq) * ui.amp;
    let cosValue1 = cos(freq) * ui.amp;
    let noiseValue = noise(freq) * ui.mouthAmp;
    let sinValue2 = sin(freq) * amp2;

    let x1 = noiseValue + sinValue1;
    let y1 = noiseValue + cosValue1;
    fill(255, 0, 0);
    push();
    stroke(255);
    circle(x1, y1, 15);
    circle(x1 + width, y1 + height, 15);
    circle(x1, y1 + height, 15);
    circle(x1 + width, y1, 15);
    pop();

    push();
    translate(150, 200);
    let angleDeg = 45;
    let angleRag = radians(angleDeg);
    rotate(angleRag);
    stroke(255);
    circle(0, sinValue2, 10);
    circle(sinValue2, 0, 10);
    pop();

    push();
    translate(350, 200);
    rotate(angleRag);
    stroke(255);
    circle(0, sinValue2, 10);
    circle(sinValue2, 0, 10);
    pop();

    push();
    for (let x = 0; x < width; x++) {
      let freq = x * 0.05 + frameCount * 0.05;
      let amp = 100;
      let noiseValue = noise(freq) * amp;
      let y = noiseValue + 270;
      circle(x, y, 15);
    }
    pop();
  } else {
  }
}

function clearBackground() {
  background(0);
}
