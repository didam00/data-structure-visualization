"use strict";
function initStackMode() {
    let stack = new Stack();
    let cnt = 0;
    let pushButton = document.createElement("button");
    pushButton.className = "push-button";
    pushButton.innerText = "push";
    pushButton.addEventListener("click", () => {
        showPushAnimation(stack, cnt++);
    });
    let popButton = document.createElement("button");
    popButton.className = "pop-button";
    popButton.innerText = "pop";
    popButton.addEventListener("click", () => {
        showPopAnimation(stack);
    });
    let initButton = document.createElement("button");
    initButton.className = "init-button";
    initButton.innerText = "init";
    initButton.addEventListener("click", () => {
        showInitAnimation(stack);
        cnt = 0;
    });
    let commandListDiv = document.querySelector(".command-list");
    commandListDiv.append(pushButton, popButton, initButton);
}
function showPushAnimation(stack, data) {
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
}
function showPopAnimation(stack) {
    let res = stack.pop();
    if (res !== null) {
        applyStackView(stack);
    }
}
function showInitAnimation(stack) {
    let res = stack.init();
    applyStackView(stack);
}
function applyStackView(stack) {
    const canvas = document.querySelector(".canvas");
    const stackContainers = [];
    canvas.innerHTML = "";
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
