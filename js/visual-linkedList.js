"use strict";
function initLinkedListMode() {
    let list = new LinkedList();
    let cnt = 1;
    let delCnt = 1;
    document.querySelector(".canvas").className = "canvas list-canvas";
    let appendButton = createButton("append", () => {
        if (list.length < 48)
            runAppend(list, cnt++);
        else
            alert("최대 크기 입니다.");
    });
    let prependButton = createButton("prepend", () => {
        if (list.length < 48)
            runPrepend(list, cnt++);
        else
            alert("최대 크기 입니다.");
    });
    let deleteButton = createButton("delete", () => {
        let res = list.delete(delCnt);
        if (res)
            delCnt++;
        applyLinkedListView(list);
    });
    let initButton = createButton("init", () => {
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
    if (res !== null) {
        applyLinkedListView(list);
        const canvas = document.querySelector(".canvas");
        const newElement = canvas.querySelectorAll(`.list-container`)[list.length - 1];
        const keyframes = {
            translate: ["0 2rem", "0 0"]
        };
        const options = {
            duration: 150,
            easing: "ease-out"
        };
        newElement.animate(keyframes, options);
    }
}
function runPrepend(list, key) {
    let res = list.prepend(key);
    if (res !== null) {
        applyLinkedListView(list);
        const canvas = document.querySelector(".canvas");
        const newElement = canvas.querySelectorAll(`.list-container`)[0];
        const keyframes = {
            translate: ["0 -2rem", "0 0"]
        };
        const options = {
            duration: 150,
            easing: "ease-out"
        };
        newElement.animate(keyframes, options);
    }
}
function runInitList(list) {
    let i = list.length - 1;
    let nodes = document.querySelectorAll(".list-nodes-container > .list-container");
    let loop = setInterval(() => {
        if (i < 0) {
            clearInterval(loop);
        }
        nodes[i--].style.display = "none";
        console.log(nodes[i].innerText);
    }, 20);
    setTimeout(() => {
        list.init();
        applyLinkedListView(list);
    }, list.length * 20);
}
function applyLinkedListView(list) {
    const canvas = document.querySelector(".canvas");
    const listNodesContainer = document.createElement("div");
    listNodesContainer.className = "list-nodes-container";
    const listContainers = [];
    removeAllChildNodes(canvas);
    let cur = list.head;
    while (cur !== null) {
        const key = cur.key;
        const listContainer = document.createElement("div");
        listContainer.className = "list-container";
        const listNode = document.createElement("img");
        listNode.src = "res/svgs/linked-list.svg";
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
    listNodesContainer.append(...listContainers, NullPointer);
    canvas.append(listNodesContainer);
}
