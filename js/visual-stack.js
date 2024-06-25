"use strict";
function initStackMode() {
    let stack = new Stack();
    let cnt = 0;
    document.querySelector(".canvas").className = "canvas stack-canvas";
    let pushButton = document.createElement("button");
    pushButton.className = "push-button";
    pushButton.innerText = "push";
    pushButton.addEventListener("click", () => {
        cnt = runPush(stack, cnt) !== null ? cnt + 1 : cnt;
    });
    let popButton = document.createElement("button");
    popButton.className = "pop-button";
    popButton.innerText = "pop";
    popButton.addEventListener("click", () => {
        runPop(stack);
    });
    let initButton = document.createElement("button");
    initButton.className = "init-button";
    initButton.innerText = "init";
    initButton.addEventListener("click", () => {
        runInitStack(stack);
        cnt = 0;
    });
    let commandListDiv = document.querySelector(".command-list");
    commandListDiv.append(pushButton, popButton, initButton);
}
function runPush(stack, data) {
    let res = stack.push(data % 100 + 1);
    if (res !== null) {
        applyStackView(stack);
        const canvas = document.querySelector(".canvas");
        const newElement = canvas.querySelector(".stack-container:last-child");
        const keyframes = {
            translate: ["-2rem 0", "0 0"]
        };
        const options = {
            duration: 150,
            easing: "ease-out"
        };
        newElement.animate(keyframes, options);
    }
    return res;
}
function runPop(stack) {
    const DURATION = 150;
    if (!stack.isEmpty()) {
        applyStackView(stack);
        const canvas = document.querySelector(".canvas");
        const newElement = canvas.querySelector(".stack-container:last-child");
        const keyframes = {
            translate: ["0 0", "0 -2rem"]
        };
        const options = {
            duration: DURATION,
            easing: "ease-out"
        };
        newElement.animate(keyframes, options);
    }
    setTimeout(() => {
        let res = stack.pop();
        if (res !== null) {
            applyStackView(stack);
        }
    }, DURATION);
}
function runInitStack(stack) {
    let res = stack.init();
    let stacks = document.querySelectorAll(".stack-canvas > .stack-container");
    let len = stacks.length;
    for (let s of stacks) {
        s.animate({
            translate: ["0 0", "0 -2rem"]
        }, {
            duration: 150
        });
    }
    setTimeout(() => {
        applyStackView(stack);
    }, 150);
}
function applyStackView(stack) {
    const canvas = document.querySelector(".canvas");
    const stackContainers = [];
    removeAllChildNodes(canvas);
    for (let i = 0; i < stack.top + 1; i++) {
        const key = stack.items[i];
        const stackContainer = document.createElement("div");
        stackContainer.className = "stack-container";
        const stackNode = document.createElement("img");
        stackNode.src = "../res/svgs/stack.svg";
        const keyElement = document.createElement("span");
        keyElement.className = "key";
        keyElement.innerText = key.toString();
        stackContainer.append(stackNode, keyElement);
        stackContainers.push(stackContainer);
    }
    canvas.append(...stackContainers);
}
