interface IObservable{
    subscribe(observer:IObserver):void;
    unsubscribe(observer:IObserver):void;
    notify():void
}

class Subject implements IObservable{
    observers: IObserver[];
    state:number;

    constructor() {
        this.observers = []
        this.state = 0
    }

    setState(number:number){
        this.state = number
        this.notify()
    }

    notify(): void {
        this.observers.forEach(observer => {
            observer.notify(this.state)
        })
    }

    subscribe(observer: IObserver): void {
        this.observers.push(observer)
    }

    unsubscribe(observer: IObserver): void {
        this.observers = this.observers.filter(o => o!== observer)
    }
}

interface IObserver {
    notify(number:number):void;
}

class Observer implements IObserver{
    notify(number: number) {
        console.log(`State has changed: ${number}`)
    }
}

const o1 = new Observer()
const o2 = new Observer()

const s = new Subject()
s.subscribe(o1)
s.subscribe(o2)

s.setState(12)
s.unsubscribe(o2)
s.setState(45)
s.notify()