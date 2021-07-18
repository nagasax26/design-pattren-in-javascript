abstract class AbstractExpression {
    abstract interpret(context?: [string, number]): number;
}

class RomanNumeral extends AbstractExpression {
    roman_numeral: string;
    context:[string, number];

    constructor(roman_numeral: string) {
        super()
        this.roman_numeral = roman_numeral
        this.context = [this.roman_numeral, 0]
    }

    interpret(context?:[string, number]): number {
        new RomanNumeral1000(this.roman_numeral).interpret(this.context)
        new RomanNumeral100(this.roman_numeral).interpret(this.context)
        new RomanNumeral10(this.roman_numeral).interpret(this.context)
        new RomanNumeral1(this.roman_numeral).interpret(this.context)
        return this.context[1]
    }

}

class RomanNumeral1 extends RomanNumeral{
    one = 'I'
    four = 'IV'
    five = 'V'
    nine = 'IX'
    multiplier = 1

    interpret(context: [string, number]): number {
        if (!context[0]){
            return Number(context[1])
        }

        if(context[0].substring(0, 2) === this.nine){
            context[1] += (9 * this.multiplier)
            context[0] = context[0].substring(2)
        }
        else if(context[0][0] == this.five){
            context[1] += (5 * this.multiplier)
            context[0] = context[0].substring(1)
        }
        else if(context[0].substring(0, 2) === this.four){
            context[1] += (4 * this.multiplier)
            context[0] = context[0].substring(2)
        }

        while (context[0] && context[0][0] === this.one){
            context[1] += (1 * this.multiplier)
            context[0] = context[0].substring(1)
        }

        return context[1]
    }
}

class RomanNumeral1000 extends RomanNumeral1{
    one = 'M'
    four = ''
    five = ''
    nine = ''
    multiplier = 1000
}

class RomanNumeral100 extends RomanNumeral1{
    one = 'C'
    four = 'CD'
    five = 'D'
    nine = 'CM'
    multiplier = 100
}


class RomanNumeral10 extends RomanNumeral1{
    one = 'X'
    four = 'XL'
    five = 'L'
    nine = 'XC'
    multiplier = 10
}

function romanToInt(s: string): number {
    return new RomanNumeral(s).interpret()
}

console.log(romanToInt("XXVIIII"))