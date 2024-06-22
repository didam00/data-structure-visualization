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
    isFull() {
        return this.top === Stack.MAX_SIZE - 1;
    }
    isEmpty() {
        return this.top === -1;
    }
}
Stack.MAX_SIZE = 8;
