class Stack {
  static readonly MAX_SIZE: number = 8;
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