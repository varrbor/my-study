class Conveyor {
    setBody(){
        console.log('Body set');
    }
    setEngine(){
        console.log('Engine set');
    }
    setInterior(){
        console.log('interior set');
    }
    paint(){
        console.log('car painted!');
    }
}
class ConveyorFasade {
    constructor(car) {
        this.car=car;
    }
    assembleCar(){
        this.car.setBody();
        this.car.setEngine();
        this.car.setInterior();
        this.car.paint();
    }
}
const conveyor = new ConveyorFasade(new Conveyor());
const car =conveyor.assembleCar();
console.log(car)