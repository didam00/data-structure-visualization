"use strict";
function initLinkedListMode() {
    let list = new LinkedList();
    let cnt = 1;
    let delCnt = 1;
    document.querySelector(".canvas").className = "canvas list-canvas";
    let appendButton = document.createElement("button");
    appendButton.className = "append-button";
    appendButton.innerText = "append";
    appendButton.addEventListener("click", () => {
        runAppend(list, cnt++);
    });
    let prependButton = document.createElement("button");
    prependButton.className = "prepend-button";
    prependButton.innerText = "prepend";
    prependButton.addEventListener("click", () => {
        runPrepend(list, cnt++);
    });
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", () => {
        runDelete(list, delCnt++);
    });
    let initButton = document.createElement("button");
    initButton.className = "init-button";
    initButton.innerText = "init";
    initButton.addEventListener("click", () => {
        runInitList(list);
        cnt = 1;
        delCnt = 1;
    });
    let commandListDiv = document.querySelector(".command-list");
    commandListDiv.append(prependButton, appendButton, deleteButton, initButton);
    applyLinkedListView(list);
}
function runAppend(list, key) {
    let res = list.append(key);
    applyLinkedListView(list);
}
function runPrepend(list, key) {
    let res = list.prepend(key);
    applyLinkedListView(list);
}
function runDelete(list, key) {
    let res = list.delete(key);
    applyLinkedListView(list);
}
function runInitList(list) {
    list.init();
    applyLinkedListView(list);
}
function applyLinkedListView(list) {
    const canvas = document.querySelector(".canvas");
    const listContainers = [];
    removeAllChildNodes(canvas);
    let cur = list.head;
    while (cur !== null) {
        const key = cur.key;
        const listContainer = document.createElement("div");
        listContainer.className = "list-container";
        const listNode = document.createElement("img");
        listNode.src = "../res/svgs/linked-list.svg";
        const keyElement = document.createElement("span");
        keyElement.className = "key";
        keyElement.innerText = key.toString();
        listContainer.append(listNode, keyElement);
        listContainers.push(listContainer);
        cur = cur.next;
    }
    const NullPointer = document.createElement("div");
    NullPointer.className = "null-pointer";
    NullPointer.innerHTML = "<span>null</span>";
    canvas.append(...listContainers, NullPointer);
}
