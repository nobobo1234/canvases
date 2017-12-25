let snow = [];
let gravity;
let snowheight = 30;
let circleGlowOffset = 0;

let zOff = 0;

let spritesheet;
let textures = [];

function preload() {
	spritesheet = loadImage('img/snowflake.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	gravity = createVector(0, 0.3);
	
	for(let x = 0; x < spritesheet.width; x += 32) {
		for(let y = 0; y < spritesheet.height; y += 32) {
			let img = spritesheet.get(x, y, 32, 32);
			textures.push(img);

		}
	}
	
	for(let i = 0; i < 400; i++) {
		let x = random(width);
		let y = random(height);
		let design = random(textures);
		snow.push(new Snowflake(x, y, design));
	}
}

function draw() {
	background(0);

	if(circleGlowOffset === -10) circleIsGlowing = true;
	if(circleGlowOffset === 0) circleIsGlowing = false;
	if(circleIsGlowing) circleGlowOffset += 0.25;
	if(!circleIsGlowing) circleGlowOffset -= 0.25;
	zOff += 0.01;

	push();
	fill(255);
	rect(-1, height-snowheight, width + 1, snowheight);
	pop();

	push();
	translate(width/2, height);
	fill(139, 69, 19);
	stroke(0);
	for(let i = 0; i <= 6; i++) {
		rect(0, -120+(i*20), 300, 20);
	}
	for(let i = 0; i <= 6; i++) {
		rect(0, -240+(i*20), (i*50), 20)
	}

	fill(255, 255, 0, 50);
	noStroke();
	ellipseMode(CENTER)
	ellipse(75, -62.5, 100 + circleGlowOffset, 120 + circleGlowOffset);
	ellipse(175, -62.5, 100 + circleGlowOffset, 120 + circleGlowOffset);
	fill(255, 255, 0);
	rect(50, -100, 50, 75);
	rect(150, -100, 50, 75);
	pop();

	push();
	translate(width/2, height/2-200);
	noStroke();
	fill(255, 255, 0);
	rotate(-PI / 2);
	arc(100, -200, 150, 150, 0, PI * 4);
	fill(0);
	arc(120, -180, 150, 150, 0, PI * 4);
	pop();

	for(flake of snow) {
		let xOff = flake.pos.x / width;
		let yOff = flake.pos.y / height;
		let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
		let wind = p5.Vector.fromAngle(wAngle);
		wind.mult(0.1);
		flake.applyForce(gravity);
		flake.applyForce(wind);
		flake.update();
		flake.render();
	}
}