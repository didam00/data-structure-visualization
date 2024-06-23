type StrucutreMode = "stack" | "queue" | "linkedList";
let strucutreMode: StrucutreMode = "stack";

window.onload = () => {
  setStrcutureMode(strucutreMode);

  (document.querySelector(".index.stack") as HTMLDivElement).onclick = () => {
    setStrcutureMode("stack");
  }
  (document.querySelector(".index.queue") as HTMLDivElement).onclick = () => {
    setStrcutureMode("queue");
  }
  (document.querySelector(".index.linkedList") as HTMLDivElement).onclick = () => {
    setStrcutureMode("linkedList");
  }
}

function setStrcutureMode(mode: StrucutreMode) {
  let canvas = document.querySelector(".canvas") as HTMLDivElement;
  removeAllChildNodes(canvas);
  let commandListDiv = document.querySelector(".command-list") as HTMLDivElement;
  removeAllChildNodes(commandListDiv);
  strucutreMode = mode;
  switch (mode) {
    case "stack" : initStackMode(); break;
    case "queue" : initQueueMode(); break;
    case "linkedList" : initLinkedListMode(); break;
  }
}

function removeAllChildNodes(parent: HTMLElement): void {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}