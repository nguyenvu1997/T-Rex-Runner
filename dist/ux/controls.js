import { keys } from "../main.js";
let cloud;
let clouds = [];
export function handleInput() {
    document.addEventListener('keydown', function (evt) {
        keys[evt.code] = true;
    });
    document.addEventListener('keyup', function (evt) {
        keys[evt.code] = false;
    });
}
