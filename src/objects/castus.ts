import { canvas, ctx, sprite, gravity, keys } from "../main.js";
import { GameObject } from "../abstracts/gameobjects.js";

export class Castus extends GameObject {
    sx: number;
    sy: number;
    sw: number;
    sh: number;
    x: number;
    y: number;
    w: number;
    h: number;
    dy: number;

    constructor() {
        super();
        this.sx = 850;
        this.sy = 0;
        this.sw = 53;
        this.sh = 100;
        this.x = 1500;
        this.y = canvas.height - this.sh - 6;
        this.w = 52;
        this.h = 100;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(sprite, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
        ctx.closePath();
    }

    update(){
        this.draw();
        this.x -= 5;
    }
}