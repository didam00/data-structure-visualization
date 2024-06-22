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
