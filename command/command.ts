class Light {
    turnOn() {
        console.log('Light turned ON')
    }
    turnOff() {
        console.log('Light turned OFF')
    }
}

interface ICommand {
    execute(command_name?: string): void;
    undo(): void;
}


class LightOnCommand implements ICommand {
    receiver: Light
    constructor(receiver: Light) {
        this.receiver = receiver
    }

    execute() {
        this.receiver.turnOn()
    }
    undo() {
        this.receiver.turnOff()
    }
}

class LightOffCommand implements ICommand {
    receiver: Light
    constructor(receiver: Light) {
        this.receiver = receiver
    }

    execute() {
        this.receiver.turnOff()
    }
    undo() {
        this.receiver.turnOn()
    }
}

class Switch implements ICommand {
    commands: Record<string, ICommand>
    history: string[]
    undoHistory: string[]

    constructor() {
        this.commands = {}
        this.history = []
        this.undoHistory = []
    }
    register(command_name: string, command: ICommand): void {
        this.commands[command_name] = command
    }
    execute(command_name: string): void {
        if (this.commands[command_name]) {
            this.commands[command_name].execute()
            this.history.push(command_name)
        } else {
            throw new Error('no command')
        }
    }

    undo() {
        if (!this.history.length) {
            console.log('NO COMMANDS')
            return
        }
        const commandName = this.history.splice(-1)[0]
        this.commands[commandName].undo()
        this.undoHistory.push(commandName)
    }

    redo() {
        if (!this.undoHistory.length) {
            console.log('NO COMMANDS')
            return
        }
        const commandName = this.undoHistory.splice(-1)[0]
        this.commands[commandName].execute()
    }

    showHistory() {
        this.history.forEach(h => {
            console.log(h)
        })
    }

    replayLast(num: number) {
        const commands = this.history.slice(-num)
        commands.forEach(c => {
            this.execute(c)
        })
    }
}

const light = new Light()

const on = new LightOnCommand(light)
const off = new LightOffCommand(light)

const switchLight = new Switch()
switchLight.register('on', on)
switchLight.register('off', off)

switchLight.execute('on')
switchLight.execute('off')
switchLight.execute('on')

switchLight.showHistory()

switchLight.replayLast(2)

switchLight.showHistory()

switchLight.undo()


switchLight.showHistory()