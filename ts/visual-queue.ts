function initQueueMode() {
  let queue = new Queue();
  let cnt = 0;

  document.querySelector(".canvas")!.className = "canvas queue-canvas";

  let enqueueButton = document.createElement("button");
  enqueueButton.className = "enqueue-button";
  enqueueButton.innerText = "enqueue";
  enqueueButton.addEventListener("click", () => {
    cnt = runEnqueue(queue, cnt) !== null ? cnt + 1 : cnt;
  })

  let dequeueButton = document.createElement("button");
  dequeueButton.className = "dequeue-button";
  dequeueButton.innerText = "dequeue";
  dequeueButton.addEventListener("click", () => {
    runDequeue(queue);
  })

  let initButton = document.createElement("button");
  initButton.className = "init-button";
  initButton.innerText = "init";
  initButton.addEventListener("click", () => {
    runInitQueue(queue);
  })

  let commandListDiv = document.querySelector(".command-list") as HTMLDivElement;
  commandListDiv.append(enqueueButton, dequeueButton, initButton);

  const queueNodesContainer = document.createElement("img");
  queueNodesContainer.src = "res/svgs/queue-container.svg";
  queueNodesContainer.className = "queue_nodes-container";

  (document.querySelector(".canvas") as HTMLDivElement).appendChild(queueNodesContainer);
}

function runEnqueue(queue: Queue, data: number) {
  let res = queue.enqueue(data % 100 + 1);
  if (res !== null) {
    applyQueueView(queue);
    const canvas = document.querySelector(".canvas") as HTMLDivElement;
    const newElement = canvas.querySelectorAll(`.queue-container`)[queue.rear] as HTMLDivElement;

    const keyframes: PropertyIndexedKeyframes = {
      translate: ["2rem 0", "0 0"]
    }
    const options: KeyframeAnimationOptions = {
      duration: 150,
      easing: "ease-out"
    }
    newElement.animate(keyframes, options)
  }
  return res;
}

function runDequeue(queue: Queue): void {
  if (!queue.isEmpty()) {
    const canvas = document.querySelector(".canvas") as HTMLDivElement;
    const newElement = canvas.querySelectorAll(`.queue-container`)[queue.front + 1] as HTMLDivElement;

    const keyframes: PropertyIndexedKeyframes = {
      translate: ["0 0", "-2rem 0"]
    }
    const options: KeyframeAnimationOptions = {
      duration: 150,
      easing: "ease-in"
    }
    newElement.animate(keyframes, options);
  }
  setTimeout(() => {
    let res = queue.dequeue();
    if (res !== null) {
      applyQueueView(queue);
    }
  }, 150);
}

function runInitQueue(queue: Queue): void {
  let res = queue.init();
  applyQueueView(queue);
  let box = document.querySelector(".queue_nodes-container") as HTMLElement;
  box.style.display = "none";
  setTimeout(() => {
    box.style.display = "block";
  }, 150);
}

function applyQueueView(queue: Queue) {
  const canvas = document.querySelector(".canvas") as HTMLDivElement;
  const queueContainers: HTMLDivElement[] = [];
  
  removeAllChildNodes(canvas);

  const queueNodesContainer = document.createElement("img");
  queueNodesContainer.src = "res/svgs/queue-container.svg";
  queueNodesContainer.className = "queue_nodes-container";

  for (let i = 0; i < Queue.MAX_SIZE; i++) {
    const key = queue.items[i];

    const stackContainer = document.createElement("div");
    stackContainer.className = "queue-container";
  
    
    if (queue.front < i && i <= queue.rear) {
      const stackNode = document.createElement("img");
      stackNode.src = "res/svgs/queue.svg";
      
      const keyElement = document.createElement("span");
      keyElement.className = "key";
      keyElement.innerText = key.toString();
      
      stackContainer.append(stackNode, keyElement);
    } else {
      const stackNode = document.createElement("div");
      stackNode.className = "none-node";
    
      stackContainer.appendChild(stackNode);
    }

    queueContainers.push(stackContainer);
  }

  canvas.append(queueNodesContainer, ...queueContainers);
}