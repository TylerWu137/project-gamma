var cloudImg, mouseBlurImg, leafImg, bubbleImg; // images
var can; // canvas variable
var w, h, baseW, baseH; // window width/height and base width/height
// Rain: count, array, true if present
var rainCount = 300;
var raindrops = new Array(rainCount);
var rainBool = false;
// Clouds: count, array, true if present
var cloudCount = 15;
var clouds = new Array(cloudCount);
var cloudsBool = false;
// Mouse Blur: object, true if present
var mouseBlur;
var mouseBlurBool = false;
// Leaves: count, array, true if present
var leafCount = 25;
var leaves = new Array(leafCount);
var leavesBool = false;
// Bubbles: count, array, true if present
var bubbleCount = 100;
var bubbles = new Array(bubbleCount);
var bubblesBool = false;


// Load images
function preload() {
  // load cloud image
  cloudImg = loadImage('../../../images/p5js/cloud.png', 
    () => console.log('Image loaded'),
    () => console.error('Image failed to load')
  );
  // load mouse blur image (if present, set bool to true)
  mouseBlurImg = loadImage('../../../images/p5js/mouseBlur.png', 
    () => {
      console.log('Image loaded');
      mouseBlurBool = true;
    },
    () => console.error('Image failed to load')
  );
  // load leaf image (if present, set bool to true)
  leafImg = loadImage('../../../images/p5js/leaf.png', 
    () => {
      console.log('Image loaded');
      leavesBool = true;
    },
    () => console.error('Image failed to load')
  );
  // load bubble image (if present, set bool to true)
  bubbleImg = loadImage('../../../images/p5js/bubble.png', 
    () => {
      console.log('Image loaded');
      bubblesBool = true;
    },
    () => console.error('Image failed to load')
  );
}

// Reset objects once wrapper size has ben finalized
document.addEventListener('DOMContentLoaded', () => {
  resizeWrapper();
  for(var i = 0; i < cloudCount; i++) {
    clouds[i] = new Cloud(w,h,h/5, cloudImg);
  }
  for(var i = 0; i < leafCount; i++) {
    leaves[i] = new Leaf(w,h,h/1.5, leafImg);
  }
  for(var i = 0; i < bubbleCount; i++) {
    bubbles[i] = new Bubble(w,h,h, bubbleImg);
  }
});

// Setup canvas
function setup() {
  // Create canvas using wrapper width and height
  wrapper = document.getElementById('wrapper');
  baseW = wrapper.offsetWidth;
  w = baseW;
  baseH = wrapper.offsetHeight;
  h = baseH;
  // For rain
  if(document.getElementById('rain')) {
    rainBool = true;
    var maxHeight = h / 1.3; // rain stops short
    can = createCanvas(baseW, baseH);
    can.style('width', '100%'); 
    can.style('height', 'auto');
    angleMode(DEGREES);
    can.parent("rain");
    // add 500 raindrops
    for(var i = 0; i < rainCount; i++) {
      raindrops[i] = new Raindrop(baseW,maxHeight);
    }
  } else {
    rainBool = false;
  }
  // For clouds
  if(document.getElementById("clouds")) {
    cloudsBool = true;
    var maxHeight = baseH/5; // clouds hover above
    cloudImg = loadImage('../../../images/p5js/cloud.png', 
      () => console.log('Image loaded'),
      () => console.error('Image failed to load')
    );
    can = createCanvas(baseW, baseH);
    can.style('width', '100%'); 
    can.style('height', 'auto');
    can.parent("clouds");
    // add clouds
    for(var i = 0; i < cloudCount; i++) {
      clouds[i] = new Cloud(baseW,baseH,maxHeight, cloudImg);
    }
  } else {
    cloudsBool = false;
  }
  // For Mouse Blur
  if(mouseBlurBool) {
    wrapper.insertAdjacentHTML("beforeEnd", `<div id=mouse-blur></div>`); // add HTML element at end of <wrapper>
    can = createCanvas(baseW, baseH);
    can.style('width', '100%'); 
    can.style('height', 'auto');
    can.parent("mouse-blur");
    mouseBlur = new MouseBlur(baseW, mouseBlurImg);
  }  
  // For Leaves
  if(document.getElementById("leaves")) {
    leavesBool = true;
    var maxHeight = baseH/1.5; // leaves fall short
    cloudImg = loadImage('../../../images/p5js/leaf.png', 
      () => console.log('Image loaded'),
      () => console.error('Image failed to load')
    );
    can = createCanvas(baseW, baseH);
    can.style('width', '100%'); 
    can.style('height', 'auto');
    can.parent("leaves");
    angleMode(DEGREES);
    imageMode(CENTER);
    // add leaves
    for(var i = 0; i < leafCount; i++) {
      leaves[i] = new Leaf(baseW,baseH,maxHeight, cloudImg);
    }
  } else {
    leavesBool = false;
  }
  // For bubbles
  if(document.getElementById("bubbles")) {
    bubblesBool = true;
    var maxHeight = baseH;
    bubbleImg = loadImage('../../../images/p5js/bubble.png', 
      () => console.log('Image loaded'),
      () => console.error('Image failed to load')
    );
    can = createCanvas(baseW, baseH);
    can.style('width', '100%'); 
    can.style('height', 'auto');
    can.parent("bubbles");
    imageMode(CENTER);
    // add bubbles
    for(var i = 0; i < bubbleCount; i++) {
      bubbles[i] = new Bubble(baseW,baseH,maxHeight, bubbleImg);
    }
  } else {
    bubblesBool = false;
  }
}

// Draw animations
function draw() {
  var maxHeight = h / 1.3;
  var ratio = baseW/wrapper.offsetWidth;
  // clear canvas
  clear();

  // display raindrops and update window ratio
  if(rainBool) {
    for(var i = 0; i < rainCount; i++) {
      raindrops[i].updateRatio(ratio);
      raindrops[i].display(w, maxHeight);
    }
  }

  // display clouds and update window ratio
  if(cloudsBool) {
    for(var i = 0; i < cloudCount; i++) {
      clouds[i].updateRatio(ratio);
      clouds[i].display(w);
    }
  }

  // mouse blur
  if(mouseBlurBool) {
    mouseBlur.updateRatio(ratio);
    mouseBlur.display(w);
  }

  // display leaves and update window ratio
  if(leavesBool) {
    for(var i = 0; i < leafCount; i++) {
      leaves[i].updateRatio(ratio);
      leaves[i].display(h);
    }
  }

  // display bubbles and update window ratio
  if(bubblesBool) {
    for(var i = 0; i < bubbleCount; i++) {
      bubbles[i].updateRatio(ratio);
      bubbles[i].display(h);
    }
  }
}

// Resize canvas when window/wrapper resizes
function windowResized() {
  w = wrapper.offsetWidth;
  h = wrapper.offsetHeight;
  resizeCanvas(w, h);
}

// MouseBlru Class
class MouseBlur {
  // Create mouse blur instance
  constructor(w,img) {
    // set x and y positions as mouse positions
    this.x1 = mouseX;
    this.y1 = mouseY;
    // set image scaling and window ratio
    this.scale = 0.4 / (1000 / baseW);
    this.ratio = 1;
    // set color (opacity = lighter)
    this.c = color(255,255,255, 150);
    // set image source
    this.img = img;
  }

  // Update window ratio
  updateRatio(ratio) {
    this.ratio = ratio;
  }

  // Display mouse blur instance
  display(w) {
    // display mouse blur
    push();
    imageMode(CENTER);
      translate((this.x1), 
        (this.y1));
      tint(this.c);
      scale(this.scale / this.ratio);
      image(this.img, 0, 0);
    pop();

    // udpate x and y positions
    this.x1 = mouseX;
    this.y1 = mouseY;
  }
}