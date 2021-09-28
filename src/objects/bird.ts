import { canvas, ctx, sprite, gravity, keys } from "../main.js";
import { GameObject } from "../abstracts/gameobjects.js";

export class Bird extends GameObject {
    sx: number;
    sy: number;
    sw: number;
    sh: number;
    x: number;
    y: number;
    w: number;
    h: number;
    dy: number;
    drawBirdTimer = 0;

    constructor() {
        super();
        this.sx = 260;
        this.sy = 0;
        this.sw = 90;
        this.sh = 100;
        this.x = 1500;
        this.y = canvas.height - this.sh;
        this.w = 90;
        this.h = 100;
    }

    draw() {
        ctx.beginPath();
        if (this.drawBirdTimer <= 10) {
            ctx.drawImage(sprite, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
        } else if (this.drawBirdTimer <= 20) {
            ctx.drawImage(sprite, this.sx + 88, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
        } else {
            this.drawBirdTimer = 0;
        }
        this.drawBirdTimer++;
        ctx.closePath();
    }

    update(){
        this.draw();
        this.x -= 5
    }
}