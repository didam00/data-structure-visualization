


function initLinkedListMode() {
  let list = new LinkedList<number>();
  let cnt = 1;
  let delCnt = 1;

  document.querySelector(".canvas")!.className = "canvas list-canvas";

  let appendButton = createButton("append", () => runAppend(list, cnt++));
  let prependButton = createButton("prepend", () => runPrepend(list, cnt++));
  let deleteButton = createButton("delete", () => runDelete(list, delCnt++));
  let initButton = createButton("init", () => () => {
    runInitList(list);
    cnt = 1;
    delCnt = 1;
  });

  let commandListDiv = document.querySelector(".command-list") as HTMLDivElement;
  commandListDiv.append(prependButton, appendButton, deleteButton, initButton);

  applyLinkedListView(list);
}

function runAppend(list: LinkedList<number>, key: number) {
  let res = list.append(key);
  applyLinkedListView(list);
}

function runPrepend(list: LinkedList<number>, key: number) {
  let res = list.prepend(key);
  applyLinkedListView(list);
}

function runDelete(list: LinkedList<number>, key: number) {
  let res = list.delete(key);
  applyLinkedListView(list);
}

function runInitList(list: LinkedList<number>) {
  list.init();
  applyLinkedListView(list);
}

function applyLinkedListView(list: LinkedList<number>) {
  const canvas = document.querySelector(".canvas") as HTMLDivElement;
  const listContainers: HTMLDivElement[] = []
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