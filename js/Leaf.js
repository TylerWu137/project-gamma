// Leaf class
class Leaf {

  // Constructor for one leaf
  constructor(w,h, maxHeight, img) {
    // set random x and y position
    this.x1 = random(w/10, w/1.1);
    this.y1 = random(h/2, h/1.9);
    this.h = h;
    // set random speed and scaling and color/opacity
    this.spd = random(0.1, 0.5) / (1000 / w);
    this.scale = random(0.01, 0.05) / (1000 / w);
    this.ratio = 1;
    let r, g, b;
    const colorType = random(3); // 0=green, 1=blue, 2=purple
    if (colorType < 1) { // Greens
      r = random(0,100);
      g = random(100,180);
      b = random(80,120);
    } else if (colorType < 2) { // Blues
      r = random(0,80);
      g = random(80,120);
      b = random(150,200);
    } else { // Purples
      r = random(80,120);
      g = random(0,50);
      b = random(120,180);
    }
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = random(200, 250);
    // set image source
    this.img = img;
    // boolean set true when leaf falls on ground
    this.ground = false;
    // attributes for rotation
    this.rotation = random(0, 360);
    this.rotationSpd = random(0.5, 1.5);
    this.rotationDirection = random(0,1);
  }

  // Update window ratio
  updateRatio(ratio) {
    this.ratio = ratio;
  }

  // Display leaf instance
  display(h) {
    // display leaf
    push();
      translate(this.x1 / this.ratio, this.y1 / this.ratio);
      tint(color(this.r,this.g,this.b,this.a));
      rotate(this.rotation);
      scale(this.scale / this.ratio);
      image(this.img, 0, 0);
    pop();

    // udpate y position, rotation, and opacity
    if(!this.ground) {
      this.y1 += this.spd;
      if(this.rotationDirection < 0.5) {
        this.rotation += this.rotationSpd;
      } else {
        this.rotation -= this.rotationSpd;
      }
      
    }
    this.a -= this.spd * 2;

    // stop leaf from falling once it hits the ground
    if (this.y1 / this.ratio > h/1.5) {
      this.ground = true;
    }
    // reset y-position and opacity when opacity is 0
    if (this.a <= 0) {
      this.ground = false;
      this.a = random(200, 250);
      this.y1 = random(this.h/2, this.h/1.9);
    }
  }
  
}
