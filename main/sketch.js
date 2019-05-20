var measuring_time = 15 * 1000; // milli seconds
var remaining_time;
var initial_time;
var time_base;
var time_elapsed = 0;
var is_stop = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(LEFT, CENTER);
  textSize(40);
  frameRate(5);
  remaining_time = measuring_time;
  initial_time = measuring_time;

  clear();
  dispTime();
}

function dispTime() {
  var t = Math.floor(remaining_time / 1000);
  var mm = parseInt(t / 60, 10);
  var ss = t % 60;

  var mm_2 = ('00' + mm).slice(-2);
  var ss_2 = ('00' + ss).slice(-2);
  
  if (ss_2 < 0) ss_2 = '00';
  text(mm_2 + ':' + ss_2, 100, 100);
}

function drawPreparation() {
  text('拍手の準備してください!', 200, 200);
}

function drawFinish() {
  text('拍手！！！！！！', 200, 200);
}

function draw() {
  if (is_stop === 1) return;

  clear();

  if (remaining_time <= 10 * 1000 && remaining_time > 0) {
    drawPreparation();
  }

  if (remaining_time <= 0) {
    is_stop = 1;
    drawFinish();
    return;
  }

  var time_now = new Date();
  time_elapsed = time_now.getTime() - time_base;
  remaining_time = measuring_time - time_elapsed;
  
  dispTime();
}

function keyTyped() {
  if (keyCode === 97) {
    startTimer();
    return;
  }
  
  if (keyCode === 122) {
    stopTimer();
    return;
  }
}

function startTimer() {
  if (is_stop != 1) return;

  var tmp = new Date();
  time_base = tmp.getTime();

  is_stop = 0;
}

function stopTimer() {
  if (is_stop != 0) return;

  var time_now = new Date();
  time_elapsed = time_now.getTime() - time_base;
  measuring_time = measuring_time - time_elapsed;

  is_stop = 1;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    secondAdd(1);
    return;
  }
  
  if (keyCode === DOWN_ARROW) {
    secondAdd(-1);
    return;
  }
}

function timerReset() {
  if (is_stop != 1)  return;

  measuring_time = initial_time;
  remaining_time = measuring_time;

  clear();
  dispTime();
}

function secondAdd(add_sec) {
  if (is_stop != 1)  return;

  initial_time += add_sec * 1000;
  timerReset();
}

function minuteAdd(add_min) {
  if (is_stop != 1) return;

  initial_time += add_min * 1000 * 60;
  timerReset();
}