
var bird;
var pipes;
var parallax = 0.8;
var score = 0;
var maxScore = 0;
var birdSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver = false;

var touched = false;
var prevTouched = touched;


function preload() {
  pipeBodySprite = loadImage('graphics/pipes.png');
  pipePeakSprite = loadImage('graphics/pipes.png');
  birdSprite = loadImage('graphics/flappy bird.png');
  bgImg = loadImage('graphics/background.png');
}

function setup() {
  createCanvas(800, 600);
  reset();
}

function draw() {
  background(0);
  // Draw our background image, then move it at the same speed as the pipes
  image(bgImg, bgX, 0, bgImg.width, height);
  bgX -= pipes[0].speed * parallax;

  
  if (bgX <= -bgImg.width + width) {
    image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
    if (bgX <= -bgImg.width) {
      bgX = 0;
    }
  }

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].pass(bird)) {
      score++;
    }

    if (pipes[i].hits(bird)) {
      gameover();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if ((frameCount - gameoverFrame) % 200 == 0) {
    pipes.push(new Pipe());
  }

  showScores();

  
  touched = (touches.length > 0);

  if (touched && !prevTouched) {
    bird.up();
  }

  // updates prevTouched
  prevTouched = touched;


}

function showScores() {
  fill("crimson");
  textSize(15);
  text('Score: ' + score, 1, 30);
  text('Record: ' + maxScore, 1, 50);
  text('Press "SPACE" to jump',1,70);
}

function gameover() {
  textSize(20);
  textAlign(CENTER, CENTER);
  text('Gameover! Try Again', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;
  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  loop();
}

function keyPressed() {
  if (key === ' ') {
    bird.up();
    if (isOver) reset(); 
  }
}

function touchStarted() {
  if (isOver) reset();
}