class Stack {
  static readonly MAX_SIZE: number = 10;
  items: Int32Array;
  top: number;

  constructor () {
    this.items = new Int32Array(Stack.MAX_SIZE);
    this.top = -1;
  }

  init(): void {
    this.items = new Int32Array(Stack.MAX_SIZE);
    this.top = -1;
  }

  isFull(): boolean {
    return this.top === Stack.MAX_SIZE - 1;
  }

  isEmpty(): boolean {
    return this.top === -1;
  }

  push(element: number): number | null {
    if (this.isFull()) return null;
    this.items[++this.top] = element;
    return element;
  }

  pop(): number | null {
    if (this.isEmpty()) return null;
    return this.items[this.top--];
  }
}

class Queue {
  static readonly MAX_SIZE: number = 8;
  items: Int32Array;
  front: number;
  rear: number;

  constructor () {
    this.items = new Int32Array(Queue.MAX_SIZE);
    this.front = -1;
    this.rear = -1;
  }

  init(): void {
    this.front = -1;
    this.rear = -1;
  }

  isFull(): boolean {
    return this.rear === Queue.MAX_SIZE - 1;
  }

  isEmpty(): boolean {
    return this.front === this.rear;
  }

  enqueue(element: number): number | null {
    if (this.isFull()) return null;
    return this.items[++this.rear] = element;
  }

  dequeue(): number | null {
    if (this.isEmpty()) return null;
    return this.items[++this.front];
  }
}

class LinkedList<T> {
  head: LinkedList.Node<T> | null = null;

  insert(pos: number, key: T): LinkedList.Node<T> | null {
    const newNode = new LinkedList.Node(key);

    if (this.head === null) {
      return this.head = newNode;
    }
    
    if (pos === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return newNode;
    }

    let cur = this.head;
    for (let i = 0; i < pos - 1; i++) {
      if (cur === null || cur.next === null) {
        return null; // 주어진 위치가 리스트의 길이를 초과하는 경우
      }
      cur = cur.next;
    }
  
    newNode.next = cur.next;
    cur.next = newNode;
    return newNode;
  }

  append(...keys: T[]): LinkedList.Node<T>[] | null {
    let len = this.length;
    let items: LinkedList.Node<T>[] = [];
    for (let key of keys) {
      let res = this.insert(len++, key);
      if (res !== null) items.push(res);
    }
    return items;
  }

  prepend(...keys: T[]): LinkedList.Node<T>[] | null {
    let items: LinkedList.Node<T>[] = [];
    for (let key of keys) {
      let res = this.insert(0, key);
      if (res !== null) items.push(res);
    }
    return items;
  }

  delete(key: T): void {
    if (this.head === null) {
      return;
    }

    if (this.head.key === key) {
      this.head = this.head.next;
      return;
    }

    let cur = this.head;
    while (cur.next !== null && cur.next.key !== key) {
      cur = cur.next;
    }

    if (cur.next !== null) {
      cur.next = cur.next.next;
    }
  }

  find(key: T): LinkedList.Node<T> | null {
    let currentNode = this.head;

    while (currentNode !== null && currentNode.key !== key) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  init(): void {
    this.head = null;
  }

  get length(): number {
    let len = 0;
    let cur = this.head

    while (cur !== null) {
      len++;
      cur = cur.next;
    }

    return len;
  }

  toString(): string {
    let cur = this.head
    let items: Array<T> = [];

    while (cur !== null) {
      items.push(cur.key);
      cur = cur.next;
    }

    return items.join(" -> ");
  }
}

namespace LinkedList {
  export class Node<T> {
    key: T;
    next: Node<T> | null = null;

    constructor(key: T) {
      this.key = key;
    }
  }
}

class ThreadBinaryTree<T> {
  root: ThreadBinaryTree.Node<T> | null = null;
  size: number = 0;

  // 완전 이진 트리를 유지하며 삽입
  insert(key: T) {
    const newNode = new ThreadBinaryTree.Node(key);
    this.size++;

    if (this.root === null) {
      this.root = newNode;
      newNode.isThread = false;
      return;
    }

    const queue: Array<ThreadBinaryTree.Node<T>> = [this.root];

    while (queue.length > 0) {
      let cur = queue.shift()!;

      if (cur.left === null) {
        cur.left = newNode;
        // cur.right = null;
        // 왼쪽 자식은 스레드를 부모 노드를 가리킨다
        newNode.right = cur;

        return;
      } else {
        queue.push(cur.left);
      }

      // 오른쪽이 스레드이거나 null이라면 단말노드
      if (cur.isThread || cur.right === null) {
        // 이땐 스레드가 가리키는 것을 newNode가 받고 스레드 제거
        newNode.right = cur.right;
        // 만약 부모노드가 isThread가 false였다 = 가장 우측 노드
        // 그 노드의 오른쪽 자식이다 = 마찬가지로 가장 우측 노드
        newNode.isThread = cur.isThread;
        cur.isThread = false;
        cur.right = newNode;

        return;
      } else {
        queue.push(cur.right);
      }
    }
  }

  inserts(...keys: T[]) {
    for (let key of keys) {
      this.insert(key);
    }
  }

  // 어차피 완전 이진 트리라 좌측으로만 내려가도 됨
  getHeight(): number {
    const findMaxDepth = (node: ThreadBinaryTree.Node<T> | null): number => {
      if (node == null) {
        return 0;
      }
      return 1 + findMaxDepth(node.left || null);
    }

    return findMaxDepth(this.root);
  }

  isFull(): boolean {
    return Math.log2(this.size + 1) % 1 == 0;
  }

  findSuccessor(node: ThreadBinaryTree.Node<T>) {
    let right = node.right;
    if (right === null || node.isThread) return right;
    while (right.left != null) right = right.left;

    return right;
  }

  order(): ThreadBinaryTree.Node<T>[] {
    let node = this.root;
    let result: ThreadBinaryTree.Node<T>[] = [];
    if (node == null) return result;

    // 가장 왼쪽 노드로 이동
    while (node.left != null) node = node.left;

    do {
      result.push(node);
      node = this.findSuccessor(node);
    } while (node != null);

    return result;
  }

  getPos(key: number): [number, number] {
    let level = 0;
    let left = -1;

    if (this.root === null) return [-1, -1];

    const queue: Array<ThreadBinaryTree.Node<T>> = [this.root];
    
    while (queue.length > 0) {
      left++;

      if (left == 2 ** level) {
        level++;
        left = 0;
      }

      let cur = queue.shift()!;
      if (cur.key === key) return [level, left];


      if (cur.left != null) {
        queue.push(cur.left);
      }

      if (!cur.isThread && cur.right != null) {
        queue.push(cur.right!);
      }
    }
    
    return [-1, -1];
  }
}

namespace ThreadBinaryTree {
  export class Node<T> {
    key: T;
    left: Node<T> | null = null;
    right: Node<T> | null = null;
    isThread: boolean;

    constructor (key: T) {
      this.key = key;
      this.isThread = true;
    }
  }
}

class BinarySearchTree {
  root: BinarySearchTree.Node | null = null;
  size: number = 0;

  private __insertNode(node: BinarySearchTree.Node | null, key: number): BinarySearchTree.Node | null {
    if (node === null) {
      let newNode = new BinarySearchTree.Node(key);
      return newNode
    }
    if (node.key > key) {
      node.left = this.__insertNode(node.left, key);
    } else if (node.key < key) {
      node.right = this.__insertNode(node.right, key);
    } else {
      // 중복 데이터
    }
    return node;
  }

  insert(key: number) {
    this.root = this.__insertNode(this.root, key);
  }
}

namespace BinarySearchTree {
  export class Node {
    key: number;
    left: Node | null = null;
    right: Node | null = null;

    constructor (key: number) {
      this.key = key;
    }
  }
}