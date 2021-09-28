import { Player, Castus, Cloud, Bird, Score } from "./objects/export.js"
import { handleInput } from "./ux/export.js"


const canvas = document.querySelector('#t-rex-runner') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let player: any;
let gravity: number;
let keys = {};
let scoreText: any;
let score: number;
let castus: any;
let cloud: any;
let clouds = [];
let bird: any;
let obstacles = [];
let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

let sprite = new Image();
sprite.src = './img/200-offline-sprite.png';

console.log(sprite)

function RandomIntInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function SpawnCloud() {
    cloud = new Cloud();
    clouds.push(cloud);
}

function SpawnObstacle() {
    let type = RandomIntInRange(0, 2);

    castus = new Castus();
    bird = new Bird();

    if (type == 1) {
        obstacles.push(castus);
    } else {
        obstacles.push(bird);
    }
}

handleInput();

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();
    score++;
    scoreText.text = "Score: " + score;
    scoreText.draw();

    // Draw ground
    ctx.drawImage(sprite, 0, 100, sprite.width, sprite.height, 0, canvas.height - 32, sprite.width, sprite.height);

    // Spawn Cloud
    spawnTimer--;
    if (spawnTimer <= 0) {
        SpawnCloud();
        SpawnObstacle();
        console.log(clouds);
        console.log(obstacles);
        spawnTimer = initialSpawnTimer - 12;

        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    for (let i = 0; i < clouds.length; i++) {
        let c = clouds[i];
        c.update();
    }

    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];
        if (player.x < o.x + o.w && player.x + player.w > o.x &&
            player.y < o.y + o.h && player.y + player.h > o.y) 
        {
            obstacles = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
        }
        o.update();
    }

    requestAnimationFrame(update);
}

function start() {
    gravity = 1
    score = 0;

    player = new Player();
    scoreText = new Score("Score: " + score, 25, 25, "left", "black", "20");

    requestAnimationFrame(update);
}

start()


export { canvas, ctx, sprite, gravity, keys, cloud, clouds }