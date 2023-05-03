import {App,VNode} from 'vue'
export default{
    install:(app:App)=>{
        const updated = (el:HTMLElement,binding,vnode:VNode,beforeVnode)=>{
            console.log('自定义组件命令更新',el,binding,vnode,beforeVnode)
        }
        const mounted =(el:HTMLElement,binding,vnode:VNode)=>{
            console.log('组件挂载时调用',binding,vnode)
        }
        app.directive('AR',{
            updated,
            mounted
        })
    }
}