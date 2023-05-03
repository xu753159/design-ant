import {Middleware} from '../../../../packages/utils/middleware/koa-middleware'

async function A(context, next) {
    context.baseUrl = 'www.xulei.cn'
    await next()
}
async function B(context, next) {
    context.timeout = 30000
    await next()
}
async function C(context, next) {
    context.data = 'aaa'
    await next()
}
const MiddleWares = new Middleware(A, B, C)
console.log(MiddleWares)
const result = MiddleWares.execute({
    name: 'middleWare-Examples'
}, (data) => {
    console.log('ddd', data,)
})
console.log(result)