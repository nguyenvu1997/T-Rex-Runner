import { keys} from "../main.js"
import { Cloud } from "../objects/export.js"

let cloud: any;
let clouds = [];

export function handleInput(){
    document.addEventListener('keydown', function (evt) {
        keys[evt.code] = true;
    });
    document.addEventListener('keyup', function (evt) {
        keys[evt.code] = false;
    });
}