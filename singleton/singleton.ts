class Product{
    private readonly _items:string[]

    constructor() {
        this._items =[]
    }

    add(name:string){
        this._items.push(name)
    }

    get items(){
        return this._items
    }

}

class Singleton{
    static instance: Product

    static getInstance(){
        if (!this.instance){
            this.instance = new Product()
        }
        return this.instance
    }
}

Singleton.getInstance().add('hello')
Singleton.getInstance().add('what')
Singleton.getInstance().add('test')

console.log(Singleton.getInstance().items)