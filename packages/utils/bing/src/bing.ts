
import { loadPlugins } from "./plugins"
import { lifeHook } from "./hooks/lifeHooks"
import { injectLifeHook,addHook } from "./hooks/injectHook"
export {Middleware} from '@/utils/middleware'

export class Bing{
    plugins:[]
    envType:''
    render:any
    constructor(options){
        this.plugins = options?.plugins||[],
        this.envType =options?.envType
        this.render =options.render
        this.start()
        injectLifeHook(this)
        const data = this.render(this.renderFunc)
        console.log('renderData',data)
    }
    private start(){
        console.log('Bing begin Start')
        this.loadPlugin()
    }
    private loadPlugin(){
        loadPlugins(this.plugins,this)
    }
    onLoad(options){
        console.log('Bing has onLoad',options)
    }
    onReslove(options){
        console.log('Bing has resloved',options)
    }
    onOver(options){
        console.log('Bing has overed',options)
    }
    applyLifeHook(lifeObject){
        for(let key in lifeObject){
            addHook(key,lifeObject[key])
        }
        console.log(lifeHook.lifehooks)
    }
    renderFunc(options){
        const args = arguments
        console.log('renderFunc',options)
        return{...options,name:'ss'}
    }
};

