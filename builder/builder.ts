interface IBuilder {
    setValue(name: string, value: any): IBuilder;

    getResult(): any;
}


class FormBuilder implements IBuilder {
    private form: Record<string, any>;

    constructor() {
        this.form = {}
    }

    setValue(name: string, value: any): IBuilder {
        this.form[name] = value
        return this
    }

    getResult() {
        return this.form
    }
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}

interface UserMethods {
    getFirstName():string;
    setFirstName(name:string):void;
}

class UserFormDirector {
    static construct({firstName, lastName, email, phone, password}: User) {
        return new FormBuilder()
            .setValue('firstName', firstName)
            .setValue('lastName', lastName)
            .setValue('email', email)
            .setValue('phone', phone)
            .setValue('password', password)
            .setValue('getFirstName', function (): string { return eval('this.firstName') })
            .setValue('setFirstName', function (name:string):void {
                const that = eval('this')
                that.firstName = name
            })
            .getResult() as (User & UserMethods)
    }
}

interface Login {
    email: string;
    password: string;
}

class LoginFormDirector {
    static construct({email, password}: Login) {
        return new FormBuilder()
            .setValue('email', email)
            .setValue('password', password)
            .getResult() as Login
    }
}
const u =  UserFormDirector.construct({
    firstName: 'David',
    lastName: 'Cohen',
    phone: '+9725477654328',
    email: 'test.com',
    password: 'mypass'
})
u.setFirstName('dan')
console.log(u.getFirstName())

console.log(LoginFormDirector.construct({email: 'test.com', password: 'mypass'}))