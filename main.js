let thisPlayerName1 = `player#${Math.floor(Math.random()*10000)}`;
let thisPlayerName2 = `player#${Math.floor(Math.random()*10000)}`;

let sounds = {};

let lastBoinkTime = Date.now();

let world;
let water;

const countdown = 30
let remainingtime = countdown
// const updateFrames = 60

function setup() {
    createCanvas(innerWidth, innerHeight);

    sounds.boink2 = loadSound("static/assets/boink.mp3");
    sounds.boink = loadSound("static/assets/sound/boink.mp3");

    world = new World();
    water = new Water(world.size.y * 2);

    world.platforms = [
        new Platform(createVector(world.size.x/2, world.size.y), createVector(1000, 32), getSprite("platform-1")),
        new Platform(createVector(250, 500), createVector(200, 32), getSprite("platform-1")),
        new Platform(createVector(850, 300), createVector(186/2, 32), getSprite("drawer")),
        new Platform(createVector(500, 550), createVector(186/2, 32), getSprite("drawer")),
        new Platform(createVector(400, 350), createVector(200, 32), getSprite("platform-1")),
        new Platform(createVector(750, 450), createVector(200, 32), getSprite("platform-1")),
        new Platform(createVector(world.size.x/2, 150), createVector(186/2, 32), getSprite("drawer"))
    ];

    world.players.push(new Player(1, thisPlayerName1, world.size.x/3, 500, 0, 0));
    world.players.push(new Player(2, thisPlayerName2, world.size.x/3 *2, 500, 0, 0));
}

const KEY_CODES1 = {
    87: "up",
    83: "down",
    65: "left",
    68: "right",
    32: "space"
}

const KEY_CODES2 = {
    38: "up",
    40: "down",
    37: "left",
    39: "right"
}

function keyPressed() {
    let player1 = world.getPlayer(thisPlayerName1);
    let player2 = world.getPlayer(thisPlayerName2);

    if (player1 && player2) {
        if (KEY_CODES1[keyCode]) {
            player1.buttonDown(KEY_CODES1[keyCode]);
        } else if (KEY_CODES2[keyCode]) {
            player2.buttonDown(KEY_CODES2[keyCode]);
        }
    }
}

function keyReleased() {
    let player1 = world.getPlayer(thisPlayerName1);
    let player2 = world.getPlayer(thisPlayerName2);

    if (player1 && player2) {
        if (KEY_CODES1[keyCode]) {
            player1.buttonUp(KEY_CODES1[keyCode]);
        } else if (KEY_CODES2[keyCode]) {
            player2.buttonUp(KEY_CODES2[keyCode]);
        }
    }
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
    redraw();
}

function draw() {
    background("#030B17");
    image(getSprite("background"), 0,0, width, height);
    translate(width/2, height/2);
    scale(Math.min(width/world.size.x, height/world.size.y) * 0.8);
    translate(-world.size.x/2, -world.size.y/2)
    
    image(getSprite("potion-yellow"), 800, 400, 32, 32)
    image(getSprite("potion-blue"), 400, 300, 32, 32)
    // image(getSprite("boeken-1"), 250, 400, 32, 32)

    // if(frameCount % updateFrames == 0){
    //     doPlayerUpdate(JSON.stringify(world.getPlayer(thisPlayerName1)))
    // }

    if(frameCount % 60 == 0 && countdown - frameCount / 60 >=0){
        remainingtime = countdown - frameCount / 60
        
    }
    if(countdown - 20 - frameCount / 60 <0){
        waterSpeed = 1
    }
    world.tick();
    world.draw();
    water.draw();


    image(getSprite("shit"), world.size.x/2 - 32, 75, 64, 64)

    textSize(32);
    fill(200, 200, 200)
    stroke(0, 127, 0, 127);
    strokeWeight(4);
    textAlign(CENTER)
    text(remainingtime, world.size.x/2, 50)

  }
