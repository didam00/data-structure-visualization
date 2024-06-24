const SCALE_SIZE = 2;

type StrucutreMode
  = "stack" 
  | "queue" 
  | "linked-list" 
  | "thread-binary-tree" 
  | "binary-search-tree";
  
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
    // case "binary-search-tree" : initThreadBinaryTreeMode(); break;
  }

  const backCanvas = document.querySelector(".back-canvas") as HTMLCanvasElement;
  const ctx = backCanvas.getContext("2d")!;
  ctx.clearRect(0, 0, 600 * SCALE_SIZE, 400 * SCALE_SIZE);
}

function removeAllChildNodes(parent: HTMLElement): void {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  const backCanvas = document.querySelector(".back-canvas") as HTMLCanvasElement;
  const ctx = backCanvas.getContext("2d")!;
  ctx.clearRect(0, 0, 600 * SCALE_SIZE, 400 * SCALE_SIZE);
}

function createButton(text: string, onClick: () => void, className?: string): HTMLButtonElement {
  if (className === undefined) className = text + "-button";

  let button = document.createElement("button");
  button.className = className;
  button.innerText = text;
  button.addEventListener("click", onClick);
  return button;
}