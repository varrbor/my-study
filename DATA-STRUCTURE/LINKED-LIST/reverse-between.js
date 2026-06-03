class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}
 
class LinkedList {
    constructor(value) {
        const newNode = new Node(value);
        this.head = newNode;
        this.length = 1;
    }

    printList() {
        let temp = this.head;
        let output = "";
        if (temp === null) {
            console.log("empty");
            return;
        }
        while (temp !== null) {
            output += String(temp.value);
            temp = temp.next;
            if (temp !== null) {
                output += " -> ";
            }
        }
        console.log(output);
    }

    getHead() {
        if (this.head === null) {
            console.log("Head: null");
        } else {
            console.log("Head: " + this.head.value);
        }
    }

    getLength() {
        console.log("Length: " + this.length);
    }

    makeEmpty() {
        this.head = null;
        this.length = 0;
    }
 
	push(value) {
		const newNode = new Node(value);
		if (!this.head) {
			this.head = newNode;
		} else {
			let current = this.head;
			while (current.next !== null) {
				current = current.next;
			}
			current.next = newNode;
		}
		this.length++;
	}
	
	reverseBetween(m, n) {
    if (!this.head) return;

    let dummy = new Node(0);
    dummy.next = this.head;
    let prev = dummy;

    // move prev to node just before position m
    for (let i = 0; i < m; i++) {
        prev = prev.next;
    }

    // reverse n - m times
    let current = prev.next;
    for (let i = 0; i < n - m; i++) {
        let next = current.next;
        current.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }

    this.head = dummy.next;
}

}



let myLinkedList = new LinkedList(1);
myLinkedList.push(2);
myLinkedList.push(3);
myLinkedList.push(4);
myLinkedList.push(5);

console.log("Original list:");
myLinkedList.printList();
console.log("----------------");

const m = 2;
const n = 4;
myLinkedList.reverseBetween(m, n);

console.log(`\nList after reversing between indexes of ${m} and ${n}:`);
myLinkedList.printList();

/*
    EXPECTED OUTPUT:
    ----------------
    Original list:
    1 -> 2 -> 3 -> 4 -> 5
    List after reversing between indexes of 2 and 4:
    1 -> 2 -> 5 -> 4 -> 3
*/
