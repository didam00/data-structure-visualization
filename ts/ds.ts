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

  push(element: number): number | null {
    if (this.isFull()) return null;
    this.items[++this.top] = element;
    return element;
  }

  pop(): number | null {
    if (this.isEmpty()) return null;
    return this.items[this.top--];
  }

  isFull(): boolean {
    return this.top === Stack.MAX_SIZE - 1;
  }

  isEmpty(): boolean {
    return this.top === -1;
  }
}