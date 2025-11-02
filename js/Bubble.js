// Bubble class
class Bubble {

  // Constructor for one bubble
  constructor(w,h, maxHeight, img) {
    // set random x and y position
    this.x1 = random(w/10, w/1.1);
    this.y1 = random(0, h);
    this.h = h;
    // set random speed and scaling
    this.spd = random(0.1, 0.5) / (1000 / w);
    this.scale = random(0.1, 0.3) / (1000 / w);
    this.ratio = 1;
    this.a = random(200, 250);
    // set image source
    this.img = img;
  }

  // Update window ratio
  updateRatio(ratio) {
    this.ratio = ratio;
  }

  // Display bubble instance
  display(h) {
    // display bubble
    push();
      translate(this.x1 / this.ratio, this.y1 / this.ratio);
      tint(color(255,255,255,this.a));
      rotate(this.rotation);
      scale(this.scale / this.ratio);
      image(this.img, 0, 0);
    pop();

    // udpate y position and opacity
    this.y1 -= this.spd;
    this.a -= this.spd / 5;

    // reset y position if bubble leaves canvas
    if (this.y1 / this.ratio < 0) {
      this.a = random(200, 250);
      this.y1 = random(0, this.h);
    }
  }
  
}
