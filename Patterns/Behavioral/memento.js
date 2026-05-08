class Editor {
  constructor() {
    this.text = "";
  }

  type(words) {
    this.text += words;
  }

  createMemento() {
    return new Memento(this.text);
  }

  restore(memento) {
    this.text = memento.getState();
  }

  getContent() {
    return this.text;
  }
}
class Memento {
  constructor(state) {
    this.state = state; // private in real languages
  }

  getState() {
    return this.state;
  }
}
class History {
  constructor() {
    this.stack = [];
  }

  push(memento) {
    this.stack.push(memento);
  }

  pop() {
    return this.stack.pop();
  }
}
const editor = new Editor();
const history = new History();

editor.type("Hello ");
history.push(editor.createMemento());

editor.type("World!");
history.push(editor.createMemento());

console.log(editor.getContent()); // Hello World!

// Undo
editor.restore(history.pop());
console.log(editor.getContent()); // Hello 

// Undo again
editor.restore(history.pop());
console.log(editor.getContent()); // (empty)
