type Next = (arg:any) => Promise<void> | void
type TMiddleware<T> = (context: T, next: Next) => Promise<void> | void
type IMiddleware<T> = {
    push: (...middlewares: TMiddleware<T>[]) => void
    execute: (context: T, callback: Next) => Promise<void>
}

export class Middleware<T> implements IMiddleware<T>{
    stack: TMiddleware<T>[] = []

    static create<T>(...middlewares: TMiddleware<T>[]) {
        return new Middleware(...middlewares)
    }

    constructor(...middlewares: TMiddleware<T>[]) {
        this.stack = middlewares
    }

    public push(...middlewares: TMiddleware<T>[]) {
        this.stack.push(...middlewares)
        return this
    }

    public execute(context?:any, callback?:any) {
        let prevIndex: number = -1
        const runner = async (index: number): Promise<void> => {
            if (index === prevIndex) {
                throw new Error('next() called multiple times')
            }
            prevIndex = index
            let middleware = this.stack[index]

            if (prevIndex === this.stack.length) middleware = callback

            if (!middleware) return Promise.resolve()

            try {
                return Promise.resolve(middleware(context, (data) => {
                    return runner(index + 1)
                }))
            } catch (err) {
                return Promise.reject(err)
            }
        }

        return runner(0)
    }
}
