let snow = [];
let gravity;
let snowheight = 0;

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

	zOff += 0.01;

	push();
	fill(255);
	rect(-1, height-snowheight, width + 1, snowheight);
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