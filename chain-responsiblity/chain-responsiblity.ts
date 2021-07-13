interface IDispenser {
    successor:IDispenser | null;
    next_successor(dispenser: IDispenser): void;
    handle(amount:number):void;
}

class HundredShekelDispenser implements IDispenser{
    successor:IDispenser|null = null;
    handle(amount: number): void {
        if(amount >= 100){
            let total = Math.floor(amount / 100)
            let reminder = amount % 100
            if(total >= 6){
                reminder = ((total-6) * 100) + reminder
                total = 6
            }
            console.log(`----${total} of 100₪`)
            if(reminder != 0){
                this.successor?.handle(reminder)
            }
        }else{
            this.successor?.handle(amount)
        }
    }
    next_successor(dispenser: IDispenser): void {
        this.successor = dispenser
    }
}

class FiftyShekelDispenser implements IDispenser{
    successor:IDispenser|null = null;
    handle(amount: number): void {
        if(amount >= 50){
            let total = Math.floor(amount / 50)
            let reminder = amount % 50
            if(total >= 10){
                reminder = ((total - 10) * 50) + (reminder)
                total = 10
            }
            console.log(`----${total} of 50₪`)
            if(reminder != 0){
                this.successor?.handle(reminder)
            }
        }else{
            this.successor?.handle(amount)
        }
    }
    next_successor(dispenser: IDispenser): void {
        this.successor = dispenser
    }
}

class TwentyShekelDispenser implements IDispenser{
    successor:IDispenser|null = null;
    handle(amount: number): void {
        if(amount >= 20){
            let total = Math.floor(amount / 20)
            let reminder = amount % 20
            if(total >= 5){
                reminder = ((total - 5)*20)+reminder
                total = 5
            }
            console.log(`----${total} of 20₪`)
            if(reminder != 0){
                this.successor?.handle(reminder)
            }
        }else{
            this.successor?.handle(amount)
        }
    }
    next_successor(dispenser: IDispenser): void {
        this.successor = dispenser
    }
}

class TenShekelDispenser implements IDispenser{
    successor:IDispenser|null = null;
    handle(amount: number): void {
        if(amount >= 10){
            let total = Math.floor(amount / 10)
            let reminder = amount % 10
            if(total >= 4){
                reminder = ((total - 4)*5) + reminder
                total = 4
            }
            console.log(`----${total} of 10₪`)
            if(reminder != 0){
                this.successor?.handle(reminder)
            }
        }else{
            this.successor?.handle(amount)
        }
    }
    next_successor(dispenser: IDispenser): void {
        this.successor = dispenser
    }
}

class FiveShekelDispenser implements IDispenser{
    successor:IDispenser|null = null;
    handle(amount: number): void {
        if(amount >= 5){
            let total = Math.floor(amount / 5)
            let reminder = amount % 5
            if(total >= 10){
                reminder = ((total - 10)*5) + reminder
                total = 10
            }
            console.log(`----${total} of 5₪`)
            if(reminder != 0){
                this.successor?.handle(reminder)
            }
        }else{
            this.successor?.handle(amount)
        }
    }
    next_successor(dispenser: IDispenser): void {
        this.successor = dispenser
    }
}

class TwoShekelDispenser implements IDispenser{
    successor:IDispenser|null = null;
    handle(amount: number): void {
        if(amount >= 2){
            let total = Math.floor(amount / 2)
            let reminder = amount % 2
            if(total >= 5){
                reminder = ((total - 5)*5) + reminder
                total = 5
            }
            console.log(`----${total} of 2₪`)
            if(reminder != 0){
                this.successor?.handle(reminder)
            }
        }else{
            this.successor?.handle(amount)
        }
    }
    next_successor(dispenser: IDispenser): void {
        this.successor = dispenser
    }
}

class ShekelDispenser implements IDispenser{
    successor:IDispenser|null = null;
    handle(amount: number): void {
        if(amount >= 1){
            const total = Math.floor(amount / 1)
            const reminder = amount % 1
            console.log(`----${total} of 1₪`)
            if(reminder != 0){
                this.successor?.handle(reminder)
            }
        }else{
            this.successor?.handle(amount)
        }
    }
    next_successor(dispenser: IDispenser): void {
        this.successor = dispenser
    }
}

class ATMDispenserChain {
   chains: IDispenser[];

    constructor() {
        this.chains = [
            new HundredShekelDispenser(),
            new FiftyShekelDispenser(),
            new TwentyShekelDispenser(),
            new TenShekelDispenser(),
            new FiveShekelDispenser(),
            new TwoShekelDispenser(),
            new ShekelDispenser()
        ]
        this.chains.forEach((chain:IDispenser, index: number):void => {
            if(index < this.chains.length -1 ){
                chain.next_successor(this.chains[index +1])
            }
        })
    }

    start(amount:number):void{
        console.log(`number ${amount} can be dispense to:`)
        this.chains[0].handle(amount)
    }
}

const atm = new ATMDispenserChain()
atm.start(344)