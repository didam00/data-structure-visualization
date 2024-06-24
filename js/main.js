"use strict";
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
    document.querySelector(".index.priority-queue").onclick = () => {
        setStrcutureMode("priority-queue");
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
        case "binary-search-tree":
            initBinarySearchTreeMode();
            break;
        case "priority-queue":
            initPriorityQueueMode();
            break;
    }
    const backCanvas = document.querySelector(".back-canvas");
    const ctx = backCanvas.getContext("2d");
    ctx.clearRect(0, 0, 1100 * SCALE_SIZE, 500 * SCALE_SIZE);
}
function clearCanvas() {
    const backCanvas = document.querySelector(".back-canvas");
    const ctx = backCanvas.getContext("2d");
    ctx.clearRect(0, 0, backCanvas.width, backCanvas.height);
}
