class Shape {
  accept(visitor) {
    throw new Error("accept() must be implemented");
  }
}
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  accept(visitor) {
    visitor.visitCircle(this);
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  accept(visitor) {
    visitor.visitRectangle(this);
  }
}
class Visitor {
  visitCircle(circle) {}
  visitRectangle(rectangle) {}
}
class AreaVisitor extends Visitor {
  visitCircle(circle) {
    console.log("Circle area:", Math.PI * circle.radius ** 2);
  }

  visitRectangle(rectangle) {
    console.log("Rectangle area:", rectangle.width * rectangle.height);
  }
}
class JsonVisitor extends Visitor {
  visitCircle(circle) {
    console.log(JSON.stringify({ type: "circle", radius: circle.radius }));
  }

  visitRectangle(rectangle) {
    console.log(JSON.stringify({
      type: "rectangle",
      width: rectangle.width,
      height: rectangle.height
    }));
  }
}
const shapes = [
  new Circle(5),
  new Rectangle(4, 6)
];

const areaVisitor = new AreaVisitor();
const jsonVisitor = new JsonVisitor();

shapes.forEach(shape => shape.accept(areaVisitor));
shapes.forEach(shape => shape.accept(jsonVisitor));
