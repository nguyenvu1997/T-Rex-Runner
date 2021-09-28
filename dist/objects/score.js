import { GameText } from "../abstracts/gametexts.js";
export class Score extends GameText {
    constructor(text, x, y, align, color, size) {
        super(text, x, y, align, color, size);
    }
}
