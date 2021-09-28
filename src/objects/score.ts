import { ctx } from "../main.js";
import { GameText } from "../abstracts/gametexts.js";

export class Score extends GameText {
    text: string;
    x: number;
    y: number;
    align: string;
    color: string;
    size: number;


    constructor(text, x, y, align, color, size) {
        super(text, x, y, align, color, size);
    }
    
}