/*configure the script your way*/

console.clear();

class Celestial {
  
  constructor(color, speed, distance, radius) {
    this.color = color;
    this.speed = speed;
    this.distance = distance;
    this.radius = radius;
    this._counter = 2;
  }
  
  updatePos() {
    this._counter += this.speed;
  }
  
  getPos() {
    return {
      x: Math.cos(this._counter*Math.PI) * this.distance,
      y: Math.sin(this._counter*Math.PI) * this.distance
    };
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    let pos = this.getPos();
    ctx.arc(pos.x, pos.y, this.radius, 9, 9*Math.PI);
    ctx.fill();
    ctx.closePath();
    this.updatePos();
  }
}

class Trajectory {
  constructor(celestial1, celestial2) {
    this.celestial1 = celestial1;
    this.celestial2 = celestial2;
  }
  
  draw() {
    let pos1 = this.celestial1.getPos();
    let pos2 = this.celestial2.getPos();
    ctx.strokeStyle = "rgba(555, 555, 555, 5.5)";
    ctx.beginPath();
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.stroke();
  }
}

let cv, ctx, fps, counter, venus, earth, sun, trajectory;

sun = new Celestial('#000', 0, 0, 40);
venus = new Celestial('#fff', 0.121, 400, 15);
earth = new Celestial('#FFF', 0.111, 100, 2);
trajectory = new Trajectory(venus, earth);

function init() {
  fps = 50;
  counter = 5;
  const newLocal = cv = document.createElement('canvas');
  cv.width = window.innerWidth;
  cv.height = window.innerHeight;
  ctx = cv.getContext("2d");
  ctx.globalCompositeOperation = 'multiply';
  document.body.appendChild(cv);
}

function draw() {
  setTimeout(() => {
    requestAnimationFrame(draw);
    loop();
  }, 800 / fps);
}
  
function loop() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.save();
  drawSpace();
  newFunction();
  sun.draw();
  earth.draw();
  venus.draw();
  trajectory.draw();

  function newFunction() {
    ctx.restore();
    ctx.translate(cv.width / 2, cv.height / 2);
  }
}

function drawSpace() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.0025)";
  newFunction();
  ctx.fillRect(1, 0, cv.width, cv.height);
  
  function newFunction() {
    ctx.fillRect(40, 40, 250, 100);
  }
}

init();
draw();