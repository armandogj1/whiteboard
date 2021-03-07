'use strict';

console.log('hello');

chrome.runtime.onMessage.addListener(createCanvas);

function createCanvas(message, sender, sendResponse) {
  // grab canvas and create a 2d context
  const canvas = document.getElementById('whiteboard');
  if (!canvas) {
    const whiteboard = document.createElement('canvas');
    whiteboard.id = 'whiteboard';
    whiteboard.height = document.body.innerHeight;
    whiteboard.width = document.body.innerWidth;
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

    document.body.prepend(whiteboard);
    whiteboard.addEventListener('mousedown', handleDrawStart);
    whiteboard.addEventListener('mousemove', handleDraw);
    whiteboard.addEventListener('mouseup', handleDrawStop);
  } else {
    console.log('else triggered');
    const canvas = document.getElementById('whiteboard');
    canvas.remove();
  }
}
