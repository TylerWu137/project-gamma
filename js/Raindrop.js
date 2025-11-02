var length = 5; // slope of raindrop lines

// Raindrop class
class Raindrop {

  // Constructor for one raindrop
  constructor(w,maxHeight) {
    // random x2 position
    this.x2 = random(0, w);
    this.baseX2 = this.x2;
    // random y1 position
    this.y1 = random(0, maxHeight);
    this.baseY1 = this.y1;
    // random length -> determine x1 and y2
    var randDX = random(1,5) / (1000 / w);
    this.x1 = this.x2 - randDX;
    this.baseX1 = this.x1;
    this.y2 = (randDX * length) + this.y1;
    this.baseY2 = this.y2;
    // random speed
    this.s = random(1, 3) / (1000 / w);
    // prepare rain (appear outside of canvas first)
    this.y1 -= maxHeight;
    this.y2 -= maxHeight;
    // random color (blues/greens)
    this.c = color(random(120, 160), random(131, 211), random(202, 242), random(50, 150));
    // random width of raindrops
    this.weight = random(0.5,2.5) / (1000 / w);
    this.ratio = 1;
  }


  // Update window ratio
  updateRatio(ratio) {
    this.ratio = ratio;
  }

  // Display one raindrop
  display(w, maxHeight) {
    // set stroke color and weight and scaling and display line
    push();
      scale(1/this.ratio);
      stroke(this.c);
      strokeWeight(this.weight);
      line(this.x1, this.y1, this.x2, this.y2);
    pop();
    // update position
    this.x1 += this.s;
    this.x2 += this.s;
    this.y1 += this.s * length;
    this.y2 += this.s * length;
    // if outside of canvas, reset position
    if(this.y2 / this.ratio >= maxHeight) {
      this.y1 -= maxHeight * this.ratio;
      this.y2 -= maxHeight * this.ratio;
      this.x1 = this.baseX1;
      this.x2 = this.baseX2;
    } else if(this.x2 / this.ratio >= w) {
      this.y1 -= maxHeight * this.ratio;
      this.y2 -= maxHeight * this.ratio;
      this.x1 = this.baseX1;
      this.x2 = this.baseX2;
    }
  }
  
}
