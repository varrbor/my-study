class MyCollection {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  createIterator() {
    return new MyIterator(this.items);
  }
}

class MyIterator {
  constructor(items) {
    this.items = items;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.items.length;
  }

  next() {
    return this.items[this.index++];
  }
}

// Usage
const collection = new MyCollection();
collection.add("Apple");
collection.add("Banana");
collection.add("Cherry");

const iterator = collection.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}
