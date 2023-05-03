type pluginObject ={
    name:String,
    setup:(context:any)=>{}
}
type pluginFunc =(context:any)=>{}


export async function  loadPlugins(this: any, plugins:Array<pluginFunc|pluginObject>,context){
    for(let plugin of plugins){
        if(typeof(plugin)==='object'){
           await plugin.setup(context)
        }else{
          await plugin(context)
        }
    }
}
