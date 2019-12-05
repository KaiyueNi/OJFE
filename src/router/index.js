import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import AList from '@/components/pages/Annoncement/AList'
import EList from '@/components/pages/Exercises/EList'
import EContent from '@/components/pages/Exercises/EContent'
import CAList from '@/components/pages/Competition/CAList'
import CList from '@/components/pages/Competition/CList'
import CContent from '@/components/pages/Competition/CContent'
import Settings from '@/components/pages/Judger/Settings'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/AList',
      name:'AList',
      component:AList
    },
    {
      path:'/EList',
      name:'EList',
      component:EList
    },
    {
      path:'/EContent',
      name:'EContent',
      component:EContent
    },
    {
      path:'/CAList',
      name:'CAList',
      component:CAList
    },
    {
      path:'/CList',
      name:'CList',
      component:CList

    },
    {
      path:'/CContent',
      name:'CContent',
      component:CContent
    },
    {
      path:'/Settings',
      name:'Settings',
      component:Settings
    }
  ]
})
