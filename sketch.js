let Star, 
    stars = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
  
  //define Star constructor
  Star = function(radius) {
    this.getCoordinates = function() {
        this.x = random(0, width);
        this.y = random(0, height);
    }

    this.r = radius;
    this.pulse ={
      rate: random(-0.1, 0.1),
      range: random(0, 2)
    }
    this.color = {
      r: random(180, 200),
      g: random(180, 200),
      b: random(180, 200)
    };
    
    //draw star
    this.display = function() {
      noStroke();
      fill(this.color.r, this.color.g, this.color.b);
      ellipse(this.x, this.y, this.r);
    }
    
    //make star pulsate
    this.pulsate = function() {
      this.r += this.pulse.rate;

      if (this.r >= radius + this.pulse.range || this.r <= radius) {
        this.pulse.rate *= -1;
      }
    }
  } //end Star constructor
  
  //create Stars with loop
  for (i=0; i < (windowWidth * windowHeight / 500); i++) {
    //determine size frequency with random Gaussian
    stars[i] = new Star(
      Math.abs(randomGaussian(1, 1))
    );

    stars[i].getCoordinates();
  }

}

function draw() {
  background(0);
  
  //show all Stars
  for (i=0; i < stars.length; i++) {
    stars[i].display();
    if (stars[i].r > 2) {
        stars[i].pulsate();
    }
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    for (i=0; i < (windowWidth * windowHeight / 500); i++) {
        stars[i].getCoordinates();
    }
}