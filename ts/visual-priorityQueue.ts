function initPriorityQueueMode() {
  let tree = new Heap();
  const canvas = document.querySelector(".canvas") as HTMLCanvasElement;

  canvas.className = "canvas pq-canvas";

  let insertButton = createButton("insert", () => {
    let key = Math.floor(Math.random() * 100) + 1
    runInsertPQ(tree, key);
  })
  
  let insertCustomButton = createButton("insert(n)", () => {
    let num: number = 0;

    while (num === 0) {
      num = Number(prompt("삽입할 노드의 키를 입력하세요 (1~)"));
    }

    runInsertPQ(tree, num);
  })

  let deleteButton = createButton("delete", () => {
    runDeletePQ(tree);
  })
  
  let initButton = createButton("init", () => {
    let i = 0;
    let size = tree.size;
    let loop = setInterval(() => {
      if (i >= size) {
        console.log(i);
        clearInterval(loop);
        tree.init();
      }
      
      runDeletePQ(tree);

      i++
    }, 20)
  })

  let commandListDiv = document.querySelector(".command-list") as HTMLDivElement;
  commandListDiv.append(insertButton, insertCustomButton, deleteButton, initButton);

  applyPriorityQueueView(tree);
}

function runInsertPQ(tree: Heap, key: number) {
  if (tree.size >= 31) {
    return;
  }
  let res = tree.insert(key);
  applyPriorityQueueView(tree);
}

function runDeletePQ(tree: Heap) {
  let res = tree.delete();
  applyPriorityQueueView(tree);

  return res;
}

function applyPriorityQueueView(tree: Heap) {
  const canvas = document.querySelector(".canvas") as HTMLDivElement;
  const backCanvas = document.querySelector(".back-canvas") as HTMLCanvasElement;
  const ctx = backCanvas.getContext("2d")!;
  clearCanvas();
  ctx.lineWidth = 4 * SCALE_SIZE;
  // ctx.strokeStyle = "black";

  removeAllChildNodes(canvas);
  
  let left: number = 0;
  let level: number = 0;
  let levelContainer: HTMLDivElement = document.createElement("div");
  levelContainer.className = "level-nodes-container level-" + level.toString();
  const levelContainers: HTMLDivElement[] = []
  
  for (let i = 1; i <= tree.size; i++) {
    const nodeContainer = document.createElement("div");
    nodeContainer.className = "node-container";
  
    const treeNode = document.createElement("img");
    treeNode.src = "../res/svgs/tree-node.svg";
  
    const keyElement = document.createElement("span");
    keyElement.className = "key";
    keyElement.innerText = tree.items[i].toString();
  
    nodeContainer.append(treeNode, keyElement);
    levelContainer.appendChild(nodeContainer);

    if (i * 2 <= tree.size) {
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
    if (i * 2 + 1 <= tree.size) {
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
