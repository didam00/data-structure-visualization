"use strict";
class Stack {
    constructor() {
        this.items = new Int32Array(Stack.MAX_SIZE);
        this.top = -1;
    }
    init() {
        this.items = new Int32Array(Stack.MAX_SIZE);
        this.top = -1;
    }
    isFull() {
        return this.top === Stack.MAX_SIZE - 1;
    }
    isEmpty() {
        return this.top === -1;
    }
    push(element) {
        if (this.isFull())
            return null;
        this.items[++this.top] = element;
        return element;
    }
    pop() {
        if (this.isEmpty())
            return null;
        return this.items[this.top--];
    }
}
Stack.MAX_SIZE = 8;
class Queue {
    constructor() {
        this.items = new Int32Array(Queue.MAX_SIZE);
        this.front = -1;
        this.rear = -1;
    }
    init() {
        this.front = -1;
        this.rear = -1;
    }
    isFull() {
        return this.rear === Queue.MAX_SIZE - 1;
    }
    isEmpty() {
        return this.front === this.rear;
    }
    enqueue(element) {
        if (this.isFull())
            return null;
        return this.items[++this.rear] = element;
    }
    dequeue() {
        if (this.isEmpty())
            return null;
        return this.items[++this.front];
    }
}
Queue.MAX_SIZE = 8;
class LinkedList {
    constructor() {
        this.head = null;
    }
    insert(pos, key) {
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
    append(...keys) {
        let len = this.length;
        let items = [];
        for (let key of keys) {
            let res = this.insert(len++, key);
            if (res !== null)
                items.push(res);
        }
        return items;
    }
    prepend(...keys) {
        let items = [];
        for (let key of keys) {
            let res = this.insert(0, key);
            if (res !== null)
                items.push(res);
        }
        return items;
    }
    delete(key) {
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
    find(key) {
        let currentNode = this.head;
        while (currentNode !== null && currentNode.key !== key) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
    init() {
        this.head = null;
    }
    get length() {
        let len = 0;
        let cur = this.head;
        while (cur !== null) {
            len++;
            cur = cur.next;
        }
        return len;
    }
    toString() {
        let cur = this.head;
        let items = [];
        while (cur !== null) {
            items.push(cur.key);
            cur = cur.next;
        }
        return items.join(" -> ");
    }
}
(function (LinkedList) {
    class Node {
        constructor(key) {
            this.next = null;
            this.key = key;
        }
    }
    LinkedList.Node = Node;
})(LinkedList || (LinkedList = {}));
