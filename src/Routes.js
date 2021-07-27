import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout/Layout';


import Login from '@/pages/login/Login';
import DashboardPage from '@/pages/dashboard';
import OrcamentoPage from '@/pages/orcamento/orcamento';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'DashboardPage',
          component: DashboardPage,
        },

        {
          path: 'orcamento',
          name: 'orcamentoPage',
          component: OrcamentoPage,
        },
      ],
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'cadastros/equipamentos',
          name: 'CadastroEquipamentosPage',
          component: () => import(/* webpackChunkName: "AppCad" */ '@/pages/app/cadastros/equipamentos.vue')
        },
      ],
    }
   ] 
});
