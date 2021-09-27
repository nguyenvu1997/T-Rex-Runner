const canvas = document.querySelector('#t-rex-runner') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let player: any;
let gravity: number;
let keys = {};
let scoreText: any;
let score: number;


document.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});

let sprite = new Image();
sprite.src = './img/200-offline-sprite.png';

class Player {
    t_rex = new Image();
    sx: number;
    sy: number;
    sw: number;
    sh: number;
    x: number;
    y: number;
    w: number;
    h: number;
    dy: number;

    jumpDistance: number;
    grounded: boolean;
    jumpTimer: number;

    constructor() {
        this.sx = 75;
        this.sy = 0;
        this.sw = 85;
        this.sh = 100;
        this.x = 30;
        this.y = canvas.height - this.sh;
        this.w = 85;
        this.h = 100;

        this.dy = 0;
        this.jumpDistance = 15;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Draw() {
        ctx.beginPath();
        ctx.drawImage(sprite, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
        ctx.closePath();
    }

    Jump() {
        ctx.clearRect(this.x, this.y, this.w, this.h);
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpDistance;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpDistance - (this.jumpTimer / 50);
        }
    }

    Animate() {
        // Jump
        ctx.clearRect(this.x, this.y, this.w, this.h);
        if (keys['Space'] || keys['KeyW']) {
            this.Jump();
        } else {
            this.jumpTimer = 0;
        }

        this.y += this.dy;

        // Gravity
        if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }

        this.Draw();
    }

}

class Score {
    text: string;
    x: number;
    y: number;
    align: string;
    color: string;
    size: number;


    constructor(text, x, y, align, color, size) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.align = align;
        this.color = color;
        this.size = size;
    }

    Draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = this.size + "px sans-serif";
        ctx.textAlign = this.align as CanvasTextAlign;
        ctx.fillText(this.text, this.x, this.y);
        ctx.closePath();
    }
}

function Update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.Animate();
    score++;
    scoreText.text = "Score: " + score;
    scoreText.Draw();

    ctx.drawImage(sprite, 0, 100, sprite.width, sprite.height, 0, canvas.height - 32, sprite.width, sprite.height);

    requestAnimationFrame(Update);
}

function Start() {
    gravity = 1
    score = 0;
    player = new Player();
    scoreText = new Score("Score: " + score, 25, 25, "left", "black", "20");
    requestAnimationFrame(Update);
}

Start()