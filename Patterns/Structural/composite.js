// Component
class FileSystemItem {
  getSize() {}
  display(indent = 0) {}
}

// Leaf
class File extends FileSystemItem {
  constructor(name, size) {
    super();
    this.name = name;
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  display(indent = 0) {
    console.log(`${" ".repeat(indent)}📄 ${this.name} (${this.size} KB)`);
  }
}

// Composite
class Folder extends FileSystemItem {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }

  add(item) {
    this.children.push(item);
  }

  getSize() {
    return this.children.reduce((sum, item) => sum + item.getSize(), 0);
  }

  display(indent = 0) {
    console.log(`${" ".repeat(indent)}📁 ${this.name}`);
    this.children.forEach(child => child.display(indent + 2));
  }
}
const img = new File("photo.png", 120);
const doc = new File("resume.pdf", 80);

const images = new Folder("Images");
images.add(img);

const documents = new Folder("Documents");
documents.add(doc);

const root = new Folder("Root");
root.add(images);
root.add(documents);

root.display();
console.log("Total size:", root.getSize(), "KB");
