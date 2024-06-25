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
Stack.MAX_SIZE = 13;
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
Queue.MAX_SIZE = 16;
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
            return false;
        }
        if (this.head.key === key) {
            this.head = this.head.next;
            return true;
        }
        let cur = this.head;
        while (cur.next !== null && cur.next.key !== key) {
            cur = cur.next;
        }
        if (cur.next !== null) {
            cur.next = cur.next.next;
            return true;
        }
        return false;
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
    init() {
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
    order(showThread = false) {
        let node = this.root;
        let result = [];
        if (node == null)
            return result;
        // 가장 왼쪽 노드로 이동
        while (node.left != null)
            node = node.left;
        do {
            result.push(node);
            if (node.isThread && showThread) {
                result.push(new ThreadBinaryTree.Node("🧵"));
            }
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
            if (left == Math.pow(2, level)) {
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
class BinarySearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }
    init() {
        this.root = null;
        this.size = 0;
    }
    __insertNode(node, key) {
        if (node === null) {
            this.size++;
            let newNode = new BinarySearchTree.Node(key);
            return newNode;
        }
        if (node.key > key) {
            node.left = this.__insertNode(node.left, key);
        }
        else if (node.key < key) {
            node.right = this.__insertNode(node.right, key);
        }
        else {
            // 중복 데이터
        }
        return node;
    }
    insert(key) {
        let bfSize = this.size;
        this.root = this.__insertNode(this.root, key);
        return !(bfSize === this.size);
    }
    inserts(...keys) {
        for (let key of keys) {
            this.insert(key);
        }
    }
    delete(key, node = this.root) {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            node.left = this.delete(key, node.left);
        }
        else if (key > node.key) {
            node.right = this.delete(key, node.right);
        }
        else {
            if (node.left === null) {
                return node.right;
            }
            else if (node.right === null) {
                return node.left;
            }
            // 두 개의 자식이 있는 경우
            node.key = this.minKey(node.right);
            node.right = this.delete(node.key, node.right);
        }
        return node;
    }
    minKey(node) {
        let minv = node.key;
        while (node.left !== null) {
            minv = node.left.key;
            node = node.left;
        }
        return minv;
    }
    isFull() {
        return Math.log2(this.size + 1) % 1 == 0;
    }
    getPos(key) {
        if (this.root === null)
            return [-1, -1];
        let node = this.root;
        let level = 0;
        let left = 0;
        // 이진 탐색 트리이기에 탐색하며 레벨을 한 칸씩 높이고, (왼쪽, 오른쪽 = +0, +1) 이 성립된다.
        while (node !== null) {
            if (key === node.key) {
                return [level, left];
            }
            if (key < node.key) {
                node = node.left;
                level++;
                left = left * 2;
                continue;
            }
            if (key > node.key) {
                node = node.right;
                level++;
                left = left * 2 + 1;
                continue;
            }
        }
        return [-1, -1];
    }
    getHeight(node = this.root) {
        if (node === null) {
            return 0;
        }
        const leftHeight = this.getHeight(node.left);
        const rightHeight = this.getHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
}
(function (BinarySearchTree) {
    class Node {
        constructor(key) {
            this.left = null;
            this.right = null;
            this.key = key;
        }
    }
    BinarySearchTree.Node = Node;
})(BinarySearchTree || (BinarySearchTree = {}));
/** Min Heap */
class Heap {
    constructor() {
        this.items = new Array(Heap.MAX_SIZE + 1).fill(0);
        this.size = 0;
    }
    init() {
        this.items = new Array(Heap.MAX_SIZE + 1).fill(0);
        this.size = 0;
    }
    insert(key) {
        if (this.size === Heap.MAX_SIZE)
            return false;
        this.size++;
        let cur = this.size; // 마지막 위치
        this.items[cur] = key;
        let par = Math.floor(cur / 2);
        while (cur > 1 && this.items[par] > this.items[cur]) {
            [this.items[par], this.items[cur]] = [this.items[cur], this.items[par]];
            cur = par;
            par = Math.floor(par / 2);
        }
        return true;
    }
    inserts(...keys) {
        for (let key of keys) {
            this.insert(key);
        }
    }
    delete() {
        if (this.size <= 0)
            return -1;
        const min = this.items[1];
        this.items[1] = this.items[this.size];
        this.size--;
        this.heapify(1);
        return min;
    }
    heapify(pos) {
        const left = 2 * pos;
        const right = 2 * pos + 1;
        let min = pos;
        if (left <= this.size && this.items[left] < this.items[min]) {
            min = left;
        }
        if (right <= this.size && this.items[right] < this.items[min]) {
            min = right;
        }
        // 현재 노드가 자식 노드보다 크면 위치를 바꿈
        if (min !== pos) {
            [this.items[pos], this.items[min]] = [this.items[min], this.items[pos]];
            this.heapify(min);
        }
    }
    isFull() {
        return Math.log2(this.size + 1) % 1 == 0;
    }
}
Heap.MAX_SIZE = 31;
