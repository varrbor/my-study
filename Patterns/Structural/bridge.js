class Circle {
    constructor(color) {
        this.color = color;
    }

    toString = function () {
        return `${this.color.getColorName()} Circle`;
    };
}

class Triangle {
    constructor(color) {
        this.color = color;
    }

    toString = function () {
        return `${this.color.getColorName()} Triangle`;
    };
}
class Rectangle {
    constructor(color) {
        this.color=color
    }

    toString = function (){
        return `${this.color.getColorName()} Rectangle`
    };
}
function Red() {
    this.getColorName = function () {
        return 'Red';
    }
}
function Green() {
    this.getColorName = function (){
        return 'Green'
    }
}
function Blue() {
    this.getColorName = function (){
        return 'Blue'
    }
}
const redColor = new Red();
const greenColor = new Green();
const blueColor = new Blue();
const redCircle = new Circle(redColor);
const greenCircle = new Circle(greenColor);
const blueRectangle = new Rectangle(blueColor);
console.log(redCircle.toString())
console.log(greenCircle.toString())
console.log(blueRectangle.toString())