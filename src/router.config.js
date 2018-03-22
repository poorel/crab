/* import home from './components/home.vue'
import checkout from './components/checkout.vue' */
// const Foo = r => require.ensure([], () => r(require('./Foo.vue')), 'group-foo')
import home from './components/home.vue' // resolve => require(['./components/home.vue'], resolve)
const checkout = r => require.ensure([], () => r(require('./components/checkout.vue')), 'group-router')
const pic = r => require.ensure([], () => r(require('./components/pic.vue')), 'group-router')
const login = r => require.ensure([], () => r(require('./components/login.vue')), 'group-router')
const personcenter = r => require.ensure([], () => r(require('./components/personcenter.vue')), 'group-router')
const register = r => require.ensure([], () => r(require('./components/register.vue')), 'group-router')
const single = r => require.ensure([], () => r(require('./components/single.vue')), 'group-router')
// 配置路由
const routes = [
  {path: '/home', component: home},
  {path: '/', redirect: '/home'},
  {path: '/single', component: single},
  {path: '/checkout', component: checkout},
  /* function (resolve) {
      require(['./components/checkout.vue'], resolve) // () => import('./components/checkout.vue')
    } */
  {path: '/personcenter', component: personcenter},
  // {path:'/single',components:{ a:single}},
  {path: '/login', component: login},
  {path: '/register', component: register},
  {path: '/pic', component: pic}
]

export default routes
