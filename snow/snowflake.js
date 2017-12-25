function getRandomSize() {

    let r = pow(random(0, 1), 3);
    return constrain(r * 32, 2, 32);

}

class Snowflake {
    constructor(sx, sy, img) {
        let x = sx || random(width);
        let y = sy || random(-100, -10);
        this.img = img;
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.angle = random(TWO_PI);
        this.dir = random(1) > 0.5 ? 1 : -1;
        this.xOff = 0;
        this.r = getRandomSize();
    }

    applyForce(force) {
        let f = force.copy();
        f.mult(this.r);

        this.acc.add(f);
    }

    randomize() {
        let x = random(width);
        let y = random(-100, -10);
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.r = getRandomSize();
    }

    update() {

        this.xOff = sin(this.angle) * this.r * 1.5;

        this.vel.add(this.acc);
        this.vel.limit(this.r * 0.2);

        if(this.vel.mag() < 1) {
            this.vel.normalize();
        }

        this.pos.add(this.vel);
        this.acc.mult(0);

        if(this.pos.y > height + this.r) {
            this.randomize();
            if(snowheight !== 40) {
                snowheight += 0.05
            }
        }

        if(this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if(this.pos.x > width + this.r) {
            this.pos.x = -this.r
        }
    }

    render() {
        push();
        translate(this.pos.x + this.xOff, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.img, 0, 0, this.r, this.r);
        pop();

        this.angle += this.dir * this.vel.mag() / 200;
    }
    
}