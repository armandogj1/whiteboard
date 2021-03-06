'use strict';

// grab canvas and create a 2d context
const whiteboard = document.getElementById('whiteboard');
const ctx = whiteboard.getContext('2d');

// initialize global variables
let isMouseDown = false;
ctx.lineWidth = 5;
let startX;
let startY;

// set the whiteboard to fill the window
whiteboard.height = window.innerHeight;
whiteboard.width = window.innerWidth;

// event handler on mouse down
function handleDrawStart(e) {
  isMouseDown = true;
  // get cursor position and set the ctx starting position
  startX = e.clientX;
  startY = e.clientY;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
}

function handleDraw(e) {
  if (!isMouseDown) return;

  // update the position
  startX = e.clientX;
  startY = e.clientY;
  ctx.lineTo(startX, startY);
  ctx.strokeStyle = '#000';
  ctx.stroke();
}

function handleDrawStop(e) {
  isMouseDown = false;
  ctx.closePath();
}

document.body.addEventListener('mousedown', handleDrawStart);
document.body.addEventListener('mousemove', handleDraw);
document.body.addEventListener('mouseup', handleDrawStop);
