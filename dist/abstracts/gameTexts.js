import { ctx } from "../main.js";
export class GameText {
    constructor(text, x, y, align, color, size) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.align = align;
        this.color = color;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = this.size + "px sans-serif";
        ctx.textAlign = this.align;
        ctx.fillText(this.text, this.x, this.y);
        ctx.closePath();
    }
}
