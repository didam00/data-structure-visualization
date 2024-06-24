type StrucutreMode
  = "stack" 
  | "queue" 
  | "linked-list" 
  | "thread-binary-tree" 
  | "binary-search-tree"
  | "priority-queue";
  
let strucutreMode: StrucutreMode = "queue";

window.onload = () => {
  setStrcutureMode(strucutreMode, true);

  (document.querySelector(".index.stack") as HTMLDivElement).onclick = () => {
    setStrcutureMode("stack");
  }
  (document.querySelector(".index.queue") as HTMLDivElement).onclick = () => {
    setStrcutureMode("queue");
  }
  (document.querySelector(".index.linkedList") as HTMLDivElement).onclick = () => {
    setStrcutureMode("linked-list");
  }
  (document.querySelector(".index.thread-binary-tree") as HTMLDivElement).onclick = () => {
    setStrcutureMode("thread-binary-tree");
  }
  (document.querySelector(".index.binary-search-tree") as HTMLDivElement).onclick = () => {
    setStrcutureMode("binary-search-tree");
  }
  (document.querySelector(".index.priority-queue") as HTMLDivElement).onclick = () => {
    setStrcutureMode("priority-queue");
  }
}

function setStrcutureMode(mode: StrucutreMode, force: boolean = false) {
  if (strucutreMode === mode && !force) return;

  let canvas = document.querySelector(".canvas") as HTMLDivElement;
  removeAllChildNodes(canvas);
  let commandListDiv = document.querySelector(".command-list") as HTMLDivElement;
  removeAllChildNodes(commandListDiv);

  document.querySelector(`.index.${strucutreMode}`)?.classList.remove("active");
  document.querySelector(`.index.${mode}`)?.classList.add("active");

  strucutreMode = mode;

  switch (mode) {
    case "stack" : initStackMode(); break;
    case "queue" : initQueueMode(); break;
    case "linked-list" : initLinkedListMode(); break;
    case "thread-binary-tree" : initThreadBinaryTreeMode(); break;
    case "binary-search-tree" : initBinarySearchTreeMode(); break;
    case "priority-queue" : initPriorityQueueMode(); break;
  }

  const backCanvas = document.querySelector(".back-canvas") as HTMLCanvasElement;
  const ctx = backCanvas.getContext("2d")!;
  ctx.clearRect(0, 0, 1100 * SCALE_SIZE, 500 * SCALE_SIZE);
}

function clearCanvas() {
  const backCanvas = document.querySelector(".back-canvas") as HTMLCanvasElement;
  const ctx = backCanvas.getContext("2d")!;
  ctx.clearRect(0, 0, backCanvas.width, backCanvas.height);
}