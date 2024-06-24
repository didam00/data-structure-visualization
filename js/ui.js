"use strict";
function createButton(text, onClick, className) {
    if (className === undefined)
        className = text + "-button";
    let button = document.createElement("button");
    button.className = className;
    button.innerText = text;
    button.addEventListener("click", onClick);
    return button;
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    const backCanvas = document.querySelector(".back-canvas");
    const ctx = backCanvas.getContext("2d");
    ctx.clearRect(0, 0, 1100 * SCALE_SIZE, 500 * SCALE_SIZE);
}
function getNodeCoord(level, left) {
    let x = 1100 / (Math.pow(2, (level + 1))) * (left * 2 + 1);
    let y = 96 * level + 32;
    return [x, y];
}
