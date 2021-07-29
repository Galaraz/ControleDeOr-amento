import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout/Layout';


import Login from '@/pages/login/Login';
import DashboardPage from '@/pages/dashboard';
import OrcamentoNovo from '@/pages/orcamento/orcamentoNovo';


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
          path: 'orcamento/novo',
          name: 'orcamento-novo',
          component: OrcamentoNovo,
        },
      ],
    },
      

    {
      path: '/cadastros',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'equipamentos',
          name: 'CadastroEquipamentosPage',
          component: () => import(/* webpackChunkName: "AppCad" */ '@/pages/cadastros/equipamentos.vue')
        },
        {
          path: 'funcoes',
          name: 'CadastroFuncoesPage',
          component: () => import(/* webpackChunkName: "AppCad" */ '@/pages/cadastros/funcoes.vue')
        },
        {
          path: 'servicos',
          name: 'CadastroServicosPage',
          component: () => import(/* webpackChunkName: "AppCad" */ '@/pages/cadastros/servicos.vue')
        },
        {
          path: 'clientes',
          name: 'CadastroClientesPage',
          component: () => import(/* webpackChunkName: "AppCad" */ '@/pages/cadastros/clientes.vue')
        },
      ],
    }
   ] 
});
