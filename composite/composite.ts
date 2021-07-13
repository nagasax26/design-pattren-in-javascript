interface IComposite{
    reference_to_parent: Folder | null;
    dir(): any;
    detach():void;
}

class MyFile implements IComposite{
    reference_to_parent: Folder | null = null;

    constructor(private name: string ) {

    }

    dir(): string {
        return this.name
    }

    detach() {
        if (this.reference_to_parent) {
            this.reference_to_parent.delete(this)
            this.reference_to_parent = null
        }
    }
}

class Folder implements IComposite{
    reference_to_parent: Folder | null = null;

    constructor(private name:string, private components: (MyFile|Folder)[] = []) {
    }

    dir(indent=""): any {
        this.components.forEach(component => {
            if(component instanceof  MyFile){
                console.log(indent+component.dir())
            }
            if(component instanceof Folder){
                console.log(`${indent}/${component.name}`)
                component.dir(indent+"..")
            }
        })
    }

    attach(component:MyFile|Folder){
        component.detach()
        component.reference_to_parent = this
        this.components.push(component)
    }

    delete(component: MyFile | Folder){
        this.components = this.components.filter(c => c != component)
    }

    detach():void {
        if(this.reference_to_parent){
            this.reference_to_parent.delete(this)
            this.reference_to_parent = null
        }
    }

}

const file = new MyFile('users.json')
const file2 = new MyFile('names.json')
const folder1 = new Folder('data')
const folder2 = new Folder('images')
const folder3 = new Folder('pointers')

folder1.attach(file)
folder1.attach(folder2)
folder2.attach(file)
folder3.attach(file2)
folder2.attach(folder3)

folder1.dir()