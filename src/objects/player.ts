import { canvas, ctx, sprite, gravity, keys } from "../main.js";
import { GameObject } from "../abstracts/gameobjects.js";

export class Player extends GameObject{
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
        super();
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

    draw() {
        ctx.beginPath();
        ctx.drawImage(sprite, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
        ctx.closePath();
    }

    jump() {
        ctx.clearRect(this.x, this.y, this.w, this.h);
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpDistance;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpDistance - (this.jumpTimer / 50);
        }
    }

    update() {
        // Jump
        if (keys['Space'] || keys['KeyW']) {
            this.jump();
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

        this.draw();
    }
}