class State {
  lock(context) {}
  unlock(context) {}
  open(context) {}
  close(context) {}
}
class LockedState extends State {
  lock() {
    console.log("Door is already locked");
  }

  unlock(context) {
    console.log("Unlocking the door");
    context.setState(new UnlockedState());
  }

  open() {
    console.log("Can't open, door is locked");
  }

  close() {
    console.log("Door is already closed");
  }
}
class UnlockedState extends State {
  lock(context) {
    console.log("Locking the door");
    context.setState(new LockedState());
  }

  unlock() {
    console.log("Door is already unlocked");
  }

  open(context) {
    console.log("Opening the door");
    context.setState(new OpenState());
  }

  close() {
    console.log("Door is closed but unlocked");
  }
}
class OpenState extends State {
  lock() {
    console.log("Can't lock an open door");
  }

  unlock() {
    console.log("Door is already unlocked");
  }

  open() {
    console.log("Door is already open");
  }

  close(context) {
    console.log("Closing the door");
    context.setState(new UnlockedState());
  }
}
class Door {
  constructor() {
    this.state = new LockedState();
  }

  setState(state) {
    this.state = state;
  }

  lock() {
    this.state.lock(this);
  }

  unlock() {
    this.state.unlock(this);
  }

  open() {
    this.state.open(this);
  }

  close() {
    this.state.close(this);
  }
}
const door = new Door();

door.unlock(); // Unlocking the door
door.open();   // Opening the door
door.close();  // Closing the door
door.lock();   // Locking the door
