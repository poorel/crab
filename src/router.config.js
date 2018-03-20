import home from './components/home.vue'
import checkout from './components/checkout.vue'
/* import about from './components/about.vue';
import contact from './components/contact.vue'; */
import pic from './components/pic.vue'
import login from './components/login.vue'
import personcenter from './components/personcenter.vue'
import register from './components/register.vue'
import single from './components/single.vue'

// 配置路由
const routes = [
  {path: '/home', component: home},
  {path: '/', redirect: '/home'},
  {path: '/single', component: single},
  {path: '/checkout', component: checkout},
  {path: '/personcenter', component: personcenter},
  // {path:'/single',components:{ a:single}},
  /* {path:'/about',component:about},
  {path:'/contact',component:contact}, */
  {path: '/login', component: login},
  {path: '/register', component: register},
  {path: '/pic', component: pic}
  // {path:'/*',component:home},
]

export default routes
