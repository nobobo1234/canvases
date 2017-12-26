function getRandomSmallSize() {
    return random(2, 10)
}
function getRandomBigSize() {
    return random(10, 32)
}

class Snowflake {
    constructor(sx, sy, big) {
        let x = sx || random(width);
        let y = sy || random(-100, -10);
        this.big = big;
        if(this.big) this.r = getRandomBigSize();
        else this.r = getRandomSmallSize();
        this.body = Matter.Bodies.circle(x, y, this.r);
        World.add(world, this.body);
    }

    render() {
        push();
        noStroke();
        fill(255);
        this.pos = this.body.position;
        translate(this.pos.x, this.pos.y);
        // rotate(this.body.angle);
        ellipse(0, 0, this.body.circleRadius, this.body.circleRadius);
        pop();
    }
    
}
