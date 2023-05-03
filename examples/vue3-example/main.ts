import {createApp,h} from 'vue'
import App from './src/App'
import './src/common/koa-middleware'
import authority from './src/plugins/authority-right'


const app = createApp(App)
app.directive('highlight', {
    mounted:(el,binding)=>{
        console.log(el.binding)
    }
})
app.use(authority)

app.mount('#app')
console.log(app)