// An example use of Singleton + Observer pattern
interface IObservable {
    observers: IObserver[];
    notify():void;
    subscribe(observer:IObserver):void;
    unsubscribe(observer:IObserver):void;
}

class State implements IObservable{
    observers: IObserver[] = [];
    notify():void{
        this.observers.forEach(observer => {
            observer.notify(this.count)
        })
    }
    subscribe(observer:IObserver):void{
        this.observers.push(observer)
    }
    unsubscribe(observer:IObserver):void{
        this.observers = this.observers.filter(o => o !== observer)
    }
    constructor(private _count:number=0) {

    }

    private setCount(count:number):void{
        this._count = count
    }

    increment():void{
       this._count = this._count + 1
        this.notify()
    }

    get count(){
        return this._count
    }


}

interface IObserver {
    notify(count:number):void;
}

class Singleton{
    static instance: State = null

     static getInstance():State{
        if(!this.instance){
            this.instance = new State()
        }
        return this.instance
    }

}

class StateHTML implements IObserver {
    constructor(private element: HTMLElement) {
        this.element.innerHTML = `Count is: 0`
    }

    notify(count: number) {
        this.element.innerHTML = `Count is: ${count}`
    }
}

const stateHTML = new StateHTML(document.getElementById('state'))
Singleton.getInstance().subscribe(stateHTML)

const btnHTML = document.getElementById('btn')

btnHTML.addEventListener('click', function (){
    const state = Singleton.getInstance()
    state.increment()
})



