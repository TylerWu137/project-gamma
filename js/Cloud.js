// Cloud class
class Cloud {

  // Create cloud instance
  constructor(w,h, maxHeight, img) {
    // set random x and y position
    this.x1 = random(-img.width, w);
    this.y1 = random(0, maxHeight);
    // set random speed and scaling and color/opacity
    this.spd = random(0.1, 0.5) / (1000 / w);
    this.scale = random(0.1, 0.5) / (1000 / w);
    this.ratio = 1;
    let r, g, b;
    const colorType = random(3); // 0=green, 1=blue, 2=purple
    if (colorType < 1) { // Greens
      r = random(230,240);
      g = random(245,253);
      b = random(235,245);
    } else if (colorType < 2) { // Blues
      r = random(220,230);
      g = random(240,250);
      b = random(245,255);
    } else { // Purples
      r = random(240,248);
      g = random(225,235);
      b = random(245,253);
    }
    this.c = color(r, g, b, random(50, 250));
    // set image source
    this.img = img;
  }

  // Update window ratio
  updateRatio(ratio) {
    this.ratio = ratio;
  }

  // Display cloud instance
  display(w) {
    // display cloud
    push();
      translate(this.x1 / this.ratio, this.y1 / this.ratio);
      tint(this.c);
      scale(this.scale / this.ratio);
      image(this.img, 0, 0);
    pop();

    // udpate x position
    this.x1 += this.spd;
    // reset x position if it is outside of canvas
    if (this.x1 / this.ratio > w) {
      this.x1 = -this.img.width * this.scale;
    }
  }
}
