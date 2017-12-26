const Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies;

let engine,
	world,
	ground,
	snow = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	engine = Engine.create();
	world = engine.world
	Engine.run(engine);
	ground = Bodies.rectangle(width / 2, height, width, 10, {
		isStatic: true
	});
	World.add(world, ground);
	for(let i = 0; i < 200; i++) {
		let x = random(width);
		let y = random(height);
		snow.push(new Snowflake(x, y, true));
	}
}

function draw() {
	background(51);
	for(flake of snow) {
		flake.render();
	}
	stroke(170);
	strokeWeight(4);
	rectMode(CENTER);
	rect(width / 2, height, width, 10);
}