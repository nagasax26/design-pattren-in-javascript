interface IListNodeIterable {
     getIterator():ListNodeIterator<ListNode>;
}

interface ListNodeIterator<T> {
    hasNext():boolean;
    next():void;
    getCurrent(): T | null;
}

class ListNodeIterable implements ListNodeIterator<ListNode | null>{
    constructor(private listNode: ListNode | null) {}
    getCurrent(): ListNode | null {
        return this.listNode;
    }

    next(){
        if(this.hasNext()){
            this.listNode = this.listNode?.next ?? null
        }
    }

    hasNext(): boolean {
        return !!this.listNode?.next;
    }

}

class ListNode implements IListNodeIterable{
    val: number;
    next: ListNode | null;

    constructor(val:number, next: ListNode | null = null) {
        this.val = val
        this.next = next
    }

    getIterator(): ListNodeIterator<ListNode> {
        return new ListNodeIterable(this)
    }
}

const l1 = new ListNode(3, new ListNode(5, new ListNode(7, new ListNode(9, new ListNode(87)))))

const iterator = l1.getIterator()
while (iterator.hasNext()){
    console.log('VAL=', iterator.getCurrent()?.val)
    iterator.next()
}
