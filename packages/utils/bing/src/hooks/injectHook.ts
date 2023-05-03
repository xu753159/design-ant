import { lifeHook } from "./lifeHooks";
import { LIFE_TYPE_List } from "@/constant/life"; 

export function injectLifeHook(context){
    console.log(context,'life mixin')
    for(let type of LIFE_TYPE_List ){
        const originLifeHandler = context[type]
        console.log('ORI',originLifeHandler)
        context[type] = function(args){
            originLifeHandler.call(this,args)
            lifeHook.invoke(type,args)
        }
    }
}
export function addHook(name,fn){
    lifeHook.add(name,fn)
}