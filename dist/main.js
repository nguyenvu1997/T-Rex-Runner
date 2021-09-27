const canvas = document.querySelector('#t-rex-runner');
const ctx = canvas.getContext('2d');
let player;
let gravity;
let keys = {};
let scoreText;
let score;
// Event Listeners
document.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});
let sprite = new Image();
sprite.src = './img/200-offline-sprite.png';
class Player {
    constructor() {
        this.t_rex = new Image();
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
        this.originalHeight = 43;
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
        }
        else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpDistance - (this.jumpTimer / 50);
        }
    }
    Animate() {
        ctx.clearRect(this.x, this.y, this.w, this.h);
        if (keys['Space'] || keys['KeyW']) {
            this.Jump();
        }
        else {
            this.jumpTimer = 0;
        }
        this.y += this.dy;
        // Gravity
        if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        }
        else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }
        this.Draw();
    }
}
class Score {
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
        ctx.textAlign = this.align;
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
    gravity = 1;
    score = 0;
    player = new Player();
    scoreText = new Score("Score: " + score, 25, 25, "left", "black", "20");
    requestAnimationFrame(Update);
}
// sprite.onload = function () {
//     ctx.drawImage(sprite, 0, 100, sprite.width, sprite.height, 0, canvas.height - 32, sprite.width, sprite.height);
// };
Start();