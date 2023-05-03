import { defineComponent,withDirectives,resolveDirective,ref} from "vue";

export default defineComponent({
    setup(){
        const buttonAR =ref<Boolean>(false)
        const vnodeText =ref<string>('sss')

        const updateNode=()=>{
            vnodeText.value ='true'
            console.log("ssss")
        
        }
        console.log("set")
        return ()=>{
            return <div> {withDirectives(<div >{vnodeText.value}</div>,[[resolveDirective('AR'), buttonAR, 'top']])}
            <h1 onClick={updateNode}>标题1</h1>
            </div>
            
        }
    }
})