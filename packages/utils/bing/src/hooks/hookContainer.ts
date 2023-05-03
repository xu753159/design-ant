import { warn } from 'vue'
import {runConfigPluginHook,getSortedPluginsHooks} from './hookutils'
/**
 * hook 执行方式
 */
type func = (...arg)=>unknown
type hookChain=Array<func>
export class hookContainer{
    plugins:Array<any>
    constructor(plugins){
        this.plugins =plugins
        this.config({root:'user'})
        this.resloved('<div></div>')
    }
    async config(config){
        await runConfigPluginHook('config',this.plugins,config)
    }
    async resloved(code){
        const sorted =getSortedPluginsHooks('resloved',this.plugins)
        let wrappcode =code
        for(let handler of sorted ){
            const result =handler.call(this,wrappcode,'other args')
            if(result) wrappcode+=result
        }
        console.log(wrappcode)
        return wrappcode
    }
}