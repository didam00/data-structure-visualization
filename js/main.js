"use strict";
const SCALE_SIZE = 2;
let strucutreMode = "queue";
window.onload = () => {
    setStrcutureMode(strucutreMode, true);
    document.querySelector(".index.stack").onclick = () => {
        setStrcutureMode("stack");
    };
    document.querySelector(".index.queue").onclick = () => {
        setStrcutureMode("queue");
    };
    document.querySelector(".index.linkedList").onclick = () => {
        setStrcutureMode("linked-list");
    };
    document.querySelector(".index.thread-binary-tree").onclick = () => {
        setStrcutureMode("thread-binary-tree");
    };
    document.querySelector(".index.binary-search-tree").onclick = () => {
        setStrcutureMode("binary-search-tree");
    };
};
function setStrcutureMode(mode, force = false) {
    var _a, _b;
    if (strucutreMode === mode && !force)
        return;
    let canvas = document.querySelector(".canvas");
    removeAllChildNodes(canvas);
    let commandListDiv = document.querySelector(".command-list");
    removeAllChildNodes(commandListDiv);
    (_a = document.querySelector(`.index.${strucutreMode}`)) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
    (_b = document.querySelector(`.index.${mode}`)) === null || _b === void 0 ? void 0 : _b.classList.add("active");
    strucutreMode = mode;
    switch (mode) {
        case "stack":
            initStackMode();
            break;
        case "queue":
            initQueueMode();
            break;
        case "linked-list":
            initLinkedListMode();
            break;
        case "thread-binary-tree":
            initThreadBinaryTreeMode();
            break;
    }
    const backCanvas = document.querySelector(".back-canvas");
    const ctx = backCanvas.getContext("2d");
    ctx.clearRect(0, 0, 600 * SCALE_SIZE, 400 * SCALE_SIZE);
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    const backCanvas = document.querySelector(".back-canvas");
    const ctx = backCanvas.getContext("2d");
    ctx.clearRect(0, 0, 600 * SCALE_SIZE, 400 * SCALE_SIZE);
}
function createButton(text, onClick, className) {
    if (className === undefined)
        className = text + "-button";
    let button = document.createElement("button");
    button.className = className;
    button.innerText = text;
    button.addEventListener("click", onClick);
    return button;
}
