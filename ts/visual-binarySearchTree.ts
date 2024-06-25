function initBinarySearchTreeMode() {
  let tree = new BinarySearchTree();
  const canvas = document.querySelector(".canvas") as HTMLCanvasElement;

  canvas.className = "canvas bst-canvas";

  let insertButton = createButton("insert", () => {
    runInsertBST(tree);
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

    runInsertBST(tree, num);
  })

  let commandListDiv = document.querySelector(".command-list") as HTMLDivElement;
  commandListDiv.append(insertButton, insertCustomButton, initButton);

  applyBinarySearchTreeView(tree);
}

function runInsertBST(tree: BinarySearchTree, num?: number) {
  if (num != undefined) {
    tree.insert(num);
    applyBinarySearchTreeView(tree);
    return;
  }

  let onLoop: boolean = true;
  let count: number = 0;
  let allowFloat: number = 1;
  
  while (onLoop && count < 2000) {
    let key = Math.floor(Math.random()*99 * allowFloat) / allowFloat + 1;
    let notCollapse = tree.insert(key);

    if (tree.getHeight() >= 6) {
      tree.delete(key);
    } else if (notCollapse) {
      onLoop = false;
    }

    count++;

    if (count == 100) allowFloat *= 10;
  }

  if (count >= 1000) alert("더 이상 넣을 수 있는 노드가 없습니다.")
  applyBinarySearchTreeView(tree);
}

function applyBinarySearchTreeView(tree: BinarySearchTree) {
  const canvas = document.querySelector(".canvas") as HTMLDivElement;
  const backCanvas = document.querySelector(".back-canvas") as HTMLCanvasElement;
  const ctx = backCanvas.getContext("2d")!;
  ctx.clearRect(0, 0, backCanvas.width, backCanvas.height);
  ctx.lineWidth = 4 * SCALE_SIZE;
  // ctx.strokeStyle = "black";

  removeAllChildNodes(canvas);
  
  const queue: Array<BinarySearchTree.Node | null> = [tree.root];
  
  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur === null || cur === undefined) break;

    const [level, left] = tree.getPos(cur.key);

    const nodeContainer = document.createElement("div");
    nodeContainer.className = "node-container";
  
    const treeNode = document.createElement("img");
    treeNode.src = "res/svgs/tree-node.svg";
  
    const keyElement = document.createElement("span");
    keyElement.className = "key";
    keyElement.innerText = cur.key.toString();
  
    nodeContainer.append(treeNode, keyElement);
    const [nodeX, nodeY] = getNodeCoord(level, left);
    
    nodeContainer.style.top = (nodeY - 32) + "px"
    nodeContainer.style.left = (nodeX - 32) + "px";
    canvas.appendChild(nodeContainer);

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
    if (cur.right) {
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
  }
}
