import { canvas, ctx, sprite } from "../main.js";
import { GameObject } from "../abstracts/gameobjects.js";
export class Bird extends GameObject {
    constructor() {
        super();
        this.sx = 260;
        this.sy = 0;
        this.sw = 90;
        this.sh = 100;
        this.x = 500;
        this.y = canvas.height - this.sh;
        this.w = 90;
        this.h = 100;
    }
    draw() {
        ctx.beginPath();
        ctx.drawImage(sprite, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
        ctx.closePath();
    }
    update() {
        return;
    }
}