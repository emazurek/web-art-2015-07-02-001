(function() {
  'use strict';

  var params = {
    'canvasSize': {
      'fixed': false
    },
    'preload': {
      'font': '80px Open Sans',
      'color': '#000000'
    }
  };

  var canvasContainer = document.getElementById('artContainer');
  var canvas = document.getElementById('myCanvas');
  var stage, container, obj = new Array(),
    i = 0, queue;
  var preloadText = '',
    currentPct = 0;
  var tw = canvas.width,
    th = canvas.height;
  var colorArray = ['rgb(0,0,0)', 'rgb(255,255,255)'];

  window.addEventListener('resize', resize, false);
  canvas.addEventListener('click', handleClick);

  function init() {
    if(params.overflow === true) {
      document.body.style.overflow = 'hidden';
    }
    stage = new createjs.Stage('myCanvas');
    container = new createjs.Container();
    queue = new createjs.LoadQueue(true, 'assets/');
    queue.installPlugin(createjs.Sound);
    queue.on('progress', handleOverallProgress);
    var soundObjects = [];
    soundObjects.push({
      id: 'sound0',
      src: 'a-gone-sax-comp.mp3'
    });
    queue.loadManifest(soundObjects);
    queue.addEventListener('complete', handleComplete);
    resize();
  }

  function drawOne() {
    obj[i] = new createjs.Shape();
    obj[i].mycolor = 'rgb(0,255,0)';
    obj[i].graphics.beginFill(obj[i].mycolor).drawRect(0, 0, tw, th).endFill();
    container.addChild(obj[i]);
    i++;
  }

  function resize() {
    // Resize the canvas element
    stage.canvas.width = canvasContainer.clientWidth;
    console.log(canvasContainer.clientHeight);
    stage.canvas.height = 500;
    tw = stage.canvas.width;
    th = stage.canvas.height;
    container.scaleX = container.scaleY = stage.canvas.width / 500;
  }

  function handleClick(event) {
    drawOne();
  }

  function handleComplete(event) {
    resize();
    stage.addChild(container);
    drawOne();
    createjs.Ticker.addEventListener('tick', tick);
  }

  function tick(event) {
    stage.update();
  }

  function handleOverallProgress(event) {
    currentPct = Math.floor(queue.progress * 100);
    stage.removeChild(preloadText);
    drawPreloadText();
    stage.update();
  }

  function drawPreloadText() {
    preloadText = new createjs.Text(currentPct + '%', params.preload.font, params.preload.color);
    preloadText.textAlign = 'center';
    var b = preloadText.getBounds();
    preloadText.x = (tw) / 2;
    preloadText.y = 0 + b.height;
    preloadText.textBaseline = 'alphabetic';
    stage.addChild(preloadText);
  }

function randomColor(i) {
    var newArray = colorArray;
    if (i !== 0) {
      var n = container.children.length;
      var lastColor = container.children[n - 1].mycolor;
      newArray = newArray.filter(function(el) {
        return el !== lastColor;
      });
    }
    var j = Math.floor(Math.random() * newArray.length);
    return newArray[j];
  }
  window.onload = init();
}());
