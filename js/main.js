"use strict";
let strucutreMode = "stack";
window.onload = () => {
    setStrcutureMode(strucutreMode);
    document.querySelector(".index.stack").onclick = () => {
        setStrcutureMode("stack");
    };
    document.querySelector(".index.queue").onclick = () => {
        setStrcutureMode("queue");
    };
    document.querySelector(".index.linkedList").onclick = () => {
        setStrcutureMode("linkedList");
    };
};
function setStrcutureMode(mode) {
    let canvas = document.querySelector(".canvas");
    removeAllChildNodes(canvas);
    let commandListDiv = document.querySelector(".command-list");
    removeAllChildNodes(commandListDiv);
    strucutreMode = mode;
    switch (mode) {
        case "stack":
            initStackMode();
            break;
        case "queue":
            initQueueMode();
            break;
    }
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
