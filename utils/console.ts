type Stringifyable = string | number | boolean | object | null | undefined

export class Console {
    static prefix: string = '\x1b[36mApplication > ';

    static Success(message: Stringifyable): void {
        console.log(`${Console.prefix}\x1b[32m${message}\x1b[0m`)
    }
    
    static Info(message: Stringifyable): void {
        console.log(`${Console.prefix}\x1b[34mInfo: ${message}\x1b[0m`)
    }

    static Error(message: Stringifyable): void {
        console.error(`${Console.prefix}\x1b[31mError: ${message}\x1b[0m`)
    }
    static Warn(message: Stringifyable): void {
        console.warn(`${Console.prefix}\x1b[33mWarning: ${message}\x1b[0m`)
    }
}
