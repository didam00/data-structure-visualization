function initThreadBinaryTreeMode() {
  let tree = new ThreadBinaryTree<number>();
  let cnt = 1;
  const canvas = document.querySelector(".canvas") as HTMLCanvasElement;

  canvas.className = "canvas tbt-canvas";

  let insertButton = createButton("insert", () => {
    runInsertTBT(tree, cnt++);
  })
  let orderButton = createButton("order", () => {
    alert(tree.order(true).map(n => n.key).join(" → "));
  })
  let initButton = createButton("init", () => {
    clearCanvas();
    removeAllChildNodes(canvas);
    tree.init();
  })
  let insertCustomButton = createButton("insert(n)", () => {
    let num: number = 0;

    while (num === 0) {
      num = Number(prompt("삽입할 노드의 키를 입력하세요 (1~)"));
    }

    runInsertTBT(tree, num);
  })

  let commandListDiv = document.querySelector(".command-list") as HTMLDivElement;
  commandListDiv.append(insertButton, insertCustomButton, orderButton, initButton);

  applyThreadBinaryTreeView(tree);
}

function runInsertTBT(tree: ThreadBinaryTree<number>, key: number) {
  if (tree.size >= 31) {
    return;
  }
  let res = tree.insert(key);
  applyThreadBinaryTreeView(tree);
}

function applyThreadBinaryTreeView(tree: ThreadBinaryTree<number>) {
  const canvas = document.querySelector(".canvas") as HTMLDivElement;
  const backCanvas = document.querySelector(".back-canvas") as HTMLCanvasElement;
  const ctx = backCanvas.getContext("2d")!;
  clearCanvas();
  ctx.lineWidth = 4 * SCALE_SIZE;
  // ctx.strokeStyle = "black";

  removeAllChildNodes(canvas);
  
  const queue: Array<ThreadBinaryTree.Node<number> | null> = [tree.root];
  let left: number = 0;
  let level: number = 0;
  let levelContainer: HTMLDivElement = document.createElement("div");
  levelContainer.className = "level-nodes-container level-" + level.toString();
  const levelContainers: HTMLDivElement[] = []
  
  while (queue.length > 0) {
    const cur = queue.shift()!;
    if (cur === null) break;

    const nodeContainer = document.createElement("div");
    nodeContainer.className = "node-container";
  
    const treeNode = document.createElement("img");
    treeNode.src = "res/svgs/tree-node.svg";
  
    const keyElement = document.createElement("span");
    keyElement.className = "key";
    keyElement.innerText = cur.key.toString();
  
    nodeContainer.append(treeNode, keyElement);
    levelContainer.appendChild(nodeContainer);

    if (cur.left) {
      queue.push(cur.left);
      let [x1, y1] = getNodeCoord(level, left);
      let [x2, y2] = getNodeCoord(level+1, left*2);

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
      let [x2, y2] = getNodeCoord(level+1, left*2+1);

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
    if (left == 2 ** level) {
      level++;
      left = 0;
      levelContainers.push(levelContainer);

      levelContainer = document.createElement("div");
      levelContainer.className = "level-nodes-container level-" + level.toString();
    }
  }
  if (!tree.isFull()) {
    for (let i = left; i < 2 ** level; i++) {
      let noneNode = document.createElement("div")!;
      noneNode.className = "none-node";
      levelContainer.appendChild(noneNode);
    }
    levelContainers.push(levelContainer);
  }

  canvas.append(...levelContainers);
}
