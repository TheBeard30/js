class LinkedList{
    constructor(){
        this.count = 0;
        this.head = undefined;
    }

    push(element){
        const node = new Node(element);
        
        if(this.head == null){
            this.head = node;
        }else{
            let current = this.head;
            while(current.next != null){
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
}


class Node{
    constructor(element){
        this.element = element;
        this.next = undefined;
    }
}