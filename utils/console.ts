type Stringifyable = string | number | boolean | object | null | undefined

export class Console {
    static prefix: string = '\x1b[36mApplication > ';

    static Success(message: Stringifyable): void {
        console.log(`${Console.prefix}\x1b[32m${message}\x1b[0m`)
    }

    static Red(message: Stringifyable): void {
        console.log(`${Console.prefix}\x1b[31m${message}\x1b[0m`)
    }

    static Yellow(message: Stringifyable): void {
        console.log(`${Console.prefix}\x1b[33m${message}\x1b[0m`)
    }
    
    static Blue(message: Stringifyable): void {
        console.log(`${Console.prefix}\x1b[34m${message}\x1b[0m`)
    }

    static Magenta(message: Stringifyable): void {
        console.log(`${Console.prefix}\x1b[35m${message}\x1b[0m`)
    }

    static Cyan(message: Stringifyable): void {
        console.log(`${Console.prefix}\x1b[36m${message}\x1b[0m`)
    }

    static White(message: Stringifyable): void {
        console.log(`${Console.prefix}\x1b[37m${message}\x1b[0m`)
    }

    static Error(message: Stringifyable): void {
        console.error(`${Console.prefix}\x1b[31mError: ${message}\x1b[0m`)
    }
    static Warn(message: Stringifyable): void {
        console.warn(`${Console.prefix}\x1b[33mWarning: ${message}\x1b[0m`)
    }
}
