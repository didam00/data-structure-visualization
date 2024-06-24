"use strict";
const NODE_SIZE = 64;
function initThreadBinaryTreeMode() {
    let tree = new ThreadBinaryTree();
    let cnt = 1;
    document.querySelector(".canvas").className = "canvas tbt-canvas";
    let insertButton = createButton("insert", () => {
        runInsertTBT(tree, cnt++);
    });
    let commandListDiv = document.querySelector(".command-list");
    commandListDiv.append(insertButton);
    applyThreadBinaryTreeView(tree);
}
function runInsertTBT(tree, key) {
    if (tree.size > 14) {
        return;
    }
    let res = tree.insert(key);
    applyThreadBinaryTreeView(tree);
}
function applyThreadBinaryTreeView(tree) {
    const canvas = document.querySelector(".canvas");
    const backCanvas = document.querySelector(".back-canvas");
    const ctx = backCanvas.getContext("2d");
    ctx.clearRect(0, 0, backCanvas.width, backCanvas.height);
    ctx.lineWidth = 4 * SCALE_SIZE;
    // ctx.strokeStyle = "black";
    removeAllChildNodes(canvas);
    const queue = [tree.root];
    let left = 1;
    let level = 0;
    let levelContainer = document.createElement("div");
    levelContainer.className = "level-nodes-container level-" + level.toString();
    const levelContainers = [];
    while (queue.length > 0) {
        const cur = queue.shift();
        if (cur === null)
            break;
        const nodeContainer = document.createElement("div");
        nodeContainer.className = "node-container";
        const treeNode = document.createElement("img");
        treeNode.src = "../res/svgs/tree-node.svg";
        const keyElement = document.createElement("span");
        keyElement.className = "key";
        keyElement.innerText = cur.key.toString();
        nodeContainer.append(treeNode, keyElement);
        levelContainer.appendChild(nodeContainer);
        if (cur.left) {
            queue.push(cur.left);
            let [x1, y1] = getNodeCoord(level, left);
            let [x2, y2] = getNodeCoord(level + 1, left * 2 - 1);
            ctx.strokeStyle = "#000000";
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(x1 * SCALE_SIZE, y1 * SCALE_SIZE);
            ctx.lineTo(x2 * SCALE_SIZE, y2 * SCALE_SIZE);
            ctx.stroke();
            ctx.closePath();
        }
        if (cur.right && !cur.isThread) {
            queue.push(cur.right);
            let [x1, y1] = getNodeCoord(level, left);
            let [x2, y2] = getNodeCoord(level + 1, left * 2);
            ctx.strokeStyle = "#000000";
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(x1 * SCALE_SIZE, y1 * SCALE_SIZE);
            ctx.lineTo(x2 * SCALE_SIZE, y2 * SCALE_SIZE);
            ctx.stroke();
            ctx.closePath();
        }
        if (cur.isThread && cur.right) {
            let [x1, y1] = getNodeCoord(level, left);
            let [level2, left2] = tree.getPos(cur.right.key);
            left2++;
            let [x2, y2] = getNodeCoord(level2, left2);
            let cx = x2;
            let cy = y1;
            ctx.beginPath();
            ctx.setLineDash([8, 4]);
            ctx.moveTo(x1 * SCALE_SIZE, y1 * SCALE_SIZE);
            ctx.quadraticCurveTo(cx * SCALE_SIZE, cy * SCALE_SIZE, x2 * SCALE_SIZE, y2 * SCALE_SIZE);
            ctx.stroke();
            ctx.closePath();
        }
        left++;
        // 각 레벨의 끝에서 level + 1
        if (left == 2 ** level + 1) {
            level++;
            left = 1;
            levelContainers.push(levelContainer);
            levelContainer = document.createElement("div");
            levelContainer.className = "level-nodes-container level-" + level.toString();
        }
    }
    if (!tree.isFull()) {
        for (let i = left; i <= 2 ** level; i++) {
            let noneNode = document.createElement("div");
            noneNode.className = "none-node";
            levelContainer.appendChild(noneNode);
        }
        levelContainers.push(levelContainer);
    }
    canvas.append(...levelContainers);
}
// let x1 = 600 / (2 ** (level + 1)) * (cnt * 2 - 1);
// let y1 = 96 * level + 32;
function getNodeCoord(level, left) {
    let x = 600 / (2 ** (level + 1)) * (left * 2 - 1);
    let y = 96 * level + 32;
    return [x, y];
}
