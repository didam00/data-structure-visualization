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
Stack.MAX_SIZE = 10;
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
class ThreadBinaryTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }
    // 완전 이진 트리를 유지하며 삽입
    insert(key) {
        const newNode = new ThreadBinaryTree.Node(key);
        this.size++;
        if (this.root === null) {
            this.root = newNode;
            newNode.isThread = false;
            return;
        }
        const queue = [this.root];
        while (queue.length > 0) {
            let cur = queue.shift();
            if (cur.left === null) {
                cur.left = newNode;
                // cur.right = null;
                // 왼쪽 자식은 스레드를 부모 노드를 가리킨다
                newNode.right = cur;
                return;
            }
            else {
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
            }
            else {
                queue.push(cur.right);
            }
        }
    }
    inserts(...keys) {
        for (let key of keys) {
            this.insert(key);
        }
    }
    // 어차피 완전 이진 트리라 좌측으로만 내려가도 됨
    getHeight() {
        const findMaxDepth = (node) => {
            if (node == null) {
                return 0;
            }
            return 1 + findMaxDepth(node.left || null);
        };
        return findMaxDepth(this.root);
    }
    isFull() {
        return Math.log2(this.size + 1) % 1 == 0;
    }
    findSuccessor(node) {
        let right = node.right;
        if (right === null || node.isThread)
            return right;
        while (right.left != null)
            right = right.left;
        return right;
    }
    order() {
        let node = this.root;
        let result = [];
        if (node == null)
            return result;
        // 가장 왼쪽 노드로 이동
        while (node.left != null)
            node = node.left;
        do {
            result.push(node);
            node = this.findSuccessor(node);
        } while (node != null);
        return result;
    }
    getPos(key) {
        let level = 0;
        let left = -1;
        if (this.root === null)
            return [-1, -1];
        const queue = [this.root];
        while (queue.length > 0) {
            left++;
            if (left == 2 ** level) {
                level++;
                left = 0;
            }
            let cur = queue.shift();
            if (cur.key === key)
                return [level, left];
            if (cur.left != null) {
                queue.push(cur.left);
            }
            if (!cur.isThread && cur.right != null) {
                queue.push(cur.right);
            }
        }
        return [-1, -1];
    }
}
(function (ThreadBinaryTree) {
    class Node {
        constructor(key) {
            this.left = null;
            this.right = null;
            this.key = key;
            this.isThread = true;
        }
    }
    ThreadBinaryTree.Node = Node;
})(ThreadBinaryTree || (ThreadBinaryTree = {}));
// class BinarySearchTree<T> {
//   root: ThreadBinaryTree.Node<T> | null = null;
//   size: number = 0;
//   insert() {
//   }
// }
// namespace BinarySearchTree {
//   export class Node<T> {
//     key: T;
//     left: Node<T> | null = null;
//     right: Node<T> | null = null;
//     constructor (key: T) {
//       this.key = key;
//     }
//   }
// }
