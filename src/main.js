import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser,faComment,faHeart,faEye,faClock,faNewspaper,faArrowAltCircleDown,faArrowAltCircleUp, faCalendarAlt} from '@fortawesome/free-regular-svg-icons'
import {faHome,faPhone,faBriefcase,faIdCard,faSignInAlt,faUserPlus,faSignOutAlt,faClipboard, faTicketAlt,faPen,faTimes,faPlaneDeparture} from '@fortawesome/free-solid-svg-icons'
import 'vue-next-select/dist/index.min.css'
import AOS from "aos";
import "aos/dist/aos.css";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import VCalendar from 'v-calendar';
import { vfmPlugin } from 'vue-final-modal'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//import 'v-calendar/dist/style.css';


library.add(faHome,faPhone,faBriefcase,faIdCard,faSignInAlt,faUserPlus,faSignOutAlt,faArrowAltCircleDown,faArrowAltCircleUp,faClipboard,faPlaneDeparture,faTicketAlt,faPen,faTimes,faUser,faComment,faHeart,faEye,faClock,faNewspaper, faCalendarAlt)
const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App)
app.config.globalProperties.$http = axios;
const access = localStorage.getItem('access')
if (access) {
  app.config.globalProperties.$http.defaults.headers.common['Authorization'] = "JWT " + access
    }
    app.AOS = new AOS.init({ disable: "phone" });
const options = {
    position: POSITION.TOP_LEFT
};

app.use(router).use(store).use(Toast, options).use(vfmPlugin({
  key: '$vfm',
  componentName: 'VueFinalModal',
  dynamicContainerName: 'ModalsContainer'
})).use( CKEditor ).use(vuetify).use(VCalendar).mount('#app')
