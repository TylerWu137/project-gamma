var img;
var can, w, h, baseW, baseH;
var clouds = new Array(15);

// Load the image.
function preload() {
  img = loadImage('../../../images/p5js/cloud.png', 
    () => console.log('Image loaded'),
    () => console.error('Image failed to load')
  );
}

function setup() {
  // Create canvas matching image dimensions
  wrapper = document.getElementById('wrapper');
  baseW = wrapper.offsetWidth;
  w = baseW;
  baseH = wrapper.offsetHeight;
  h = baseH;
  var maxHeight = baseH/5;
  img = loadImage('../../../images/p5js/cloud.png', 
    () => console.log('Image loaded'),
    () => console.error('Image failed to load')
  );
  can = createCanvas(baseW, baseH).style('z-index', '4');
  can.style('width', '100%'); 
  can.style('height', 'auto');
  can.parent("clouds");
  can.style('pointer-events', 'none'); // Allow clicks through canvas
  can.style('z-index', 4);
  
  for(var i = 0; i < 15; i++) {
    clouds[i] = new Cloud(baseW,baseH,maxHeight, img);
  }
}

function draw() {
  clear();

  for(var i = 0; i < 15; i++) {
    clouds[i].updateRatio(baseW/wrapper.offsetWidth);
    clouds[i].display(w);
  }
}

function windowResized() {
  w = wrapper.offsetWidth;
  h = wrapper.offsetHeight;
  resizeCanvas(w, h);
}