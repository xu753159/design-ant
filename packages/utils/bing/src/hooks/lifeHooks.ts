class LifeHooks{
    lifehooks:any
    constructor(){
        this.lifehooks =new Map()
    }
    add(name,fn){
        const hooks =this.get(name)
        hooks.add(fn)
        this.lifehooks.set(name,hooks)
    }
    get(name){
        return this.lifehooks.get(name)||new Set();
    }
    async invoke(name,...args){
        console.log("invoke",this.get(name))
        for(const hook of Array.from(this.get(name))){
            await (hook as any)(...args)
        }
    }   
}
export const lifeHook = new LifeHooks()