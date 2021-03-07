'use strict';

console.log('hello');

chrome.runtime.onMessage.addListener(createCanvas);
let lineWeight = 5;

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
    ctx.lineWidth = 1;
    let startX;
    let startY;

    // add the menu
    const menu = createMenu(ctx);

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
      console.log(ctx.lineWidth);
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
    document.body.append(menu);
    whiteboard.addEventListener('mousedown', handleDrawStart);
    whiteboard.addEventListener('mousemove', handleDraw);
    whiteboard.addEventListener('mouseup', handleDrawStop);
  } else {
    console.log('else triggered');
    const canvas = document.getElementById('whiteboard');
    canvas.remove();
  }
}

function createMenu(ctx) {
  const menu = document.createElement('div');
  menu.id = 'menu';
  const buttons = Array(3)
    .fill(1)
    .forEach((el, i) => {
      const btn = document.createElement('button');
      btn.dataset.size = (i + 1) * (i + 1);
      btn.innerText = `${i + 1}`;
      menu.append(btn);
    });

  // TODO: dataset is in a string form
  menu.addEventListener('click', (e) => {
    const size = e.target.dataset.size;

    if (size) {
      ctx.lineWidth = +size;
    }
  });

  return menu;
}
