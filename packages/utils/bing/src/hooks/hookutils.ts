type func = (...arg) => unknown
type hookChain = Array<func>
function getSortedPluginsByHook(hookname, plugins: Array<any>) {
    let pre: hookChain = []
    let normal: hookChain = []
    let post: hookChain = []
    for (let plugin of plugins) {
        const hook = plugin[hookname]
        if (hook) {
            if (typeof hook === 'object') {
                if (hook.order === 'pre') {
                    pre.push(plugin)
                } else if (hook.order === 'post') {
                    post.push(plugin)
                } else {
                    normal.push(plugin)
                }
            }else{
               normal.push(plugin) 
            }
        }
    }
    return [...pre, ...normal, ...post]
}
function getSortedPlugins(hookname, plugins) {
    const sortedPluginCache = new Map()
    if (sortedPluginCache.has(hookname)) {
        return sortedPluginCache.get(hookname)
    }
    let sorted = getSortedPluginsByHook(hookname, plugins)
    sortedPluginCache.set(hookname, sorted)
}
export function getSortedPluginsHooks(hookname, plugins) {
    const sortedPlguins = getSortedPluginsByHook(hookname, plugins)
  return sortedPlguins.map((item) => {
        let hook = item[hookname]
        // 兼容插件为Object和function
        return typeof hook === 'object' && 'handler' in hook ? hook.handler : typeof hook==='function'?hook:undefined
    }).filter(Boolean)   
}
export async function runConfigPluginHook(hookname, plugins, config) {
    let conf = config
    const sorted = getSortedPluginsHooks(hookname, plugins)
    for (let handler of sorted) {
        let result = await handler(config)
        console.log('result',result)
        if (result) {
            conf = Object.assign({}, ...conf, result)
        }
    }
    return conf
}