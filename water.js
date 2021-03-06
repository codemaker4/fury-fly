let waterSpeed = 0

class Water {
    constructor(y) {
        this.y = y;
    }

    get halfSize() {
        return this.size.copy().div(2);
    }

    draw() {
        this.y = this.y - waterSpeed
        push();
        translate(Math.sin(Date.now()/500)*50, 0);
        image(
            getSprite("water"),
            0, // x
            this.y, // y
            world.size.x, // width
            world.size.y, // height
        )
        image(
            getSprite("water"),
            -world.size.x, // x
            this.y, // y
            world.size.x, // width
            world.size.y, // height
        )
        image(
            getSprite("water"),
            +world.size.x, // x
            this.y, // y
            world.size.x, // width
            world.size.y, // height
        )

        pop();
    }
}