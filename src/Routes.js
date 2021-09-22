import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout/Layout';


import Login from '@/pages/login/Login';
import DashboardPage from '@/pages/dashboard';
import OrcamentoNovo from '@/pages/orcamento/orcamentoNovo';
import OrcamentoLista from '@/pages/orcamento/orcamentoLista';
import OrcamentoEnviado from '@/pages/orcamento/orcamentoEnviados';

import OrcamentoPage from '@/pages/orcamento/orcamento';
import CadClientePage from '@/pages/cadastros/clientes.vue'

import CadastroEquipamentosPage from '@/pages/cadastros/equipamentos.vue'
import CadastroEquipamentoPage from '@/pages/cadastros/equipamento.vue'
import CadastroFuncoesPage from '@/pages/cadastros/funcoes.vue'

import EstoqueEntradaPage from '@/pages/estoque/entrada.vue'
import EstoqueSaidaPage from '@/pages/estoque/saida.vue'
import EstoqueRelatorioPage from '@/pages/estoque/relatorioEstoque.vue'
import EstoqueAbaixoMinimoPage from '@/pages/estoque/relatorioAbaixoMinimo.vue'

import UnderConstructionPage from '@/pages/underConstruction.vue'

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
          path: 'orcamento/orcamento',
          name: 'orcamento-orcamento',
          component: OrcamentoPage,
          // component: () => import(/* webpackChunkName: "AppOrcamento" */ '@/pages/orcamento/orcamento.vue')
        },
        {
          path: 'orcamento/orcamento/:uuid',
          name: 'orcamento-orcamento-uuid',
          component: OrcamentoPage,
          //component: () => import('@/pages/orcamento/orcamento.vue')
        },

        {
          path: 'orcamento/novo',
          name: 'orcamento-novo',
          component: OrcamentoNovo,
        },

        {
          path: 'orcamento/lista',
          name: 'orcamento-lista',
          component: OrcamentoLista,
        },
        {
          path: 'orcamento/lista/:status',
          name: 'orcamento-lista-status',
          component: OrcamentoLista,
        },

        {
          path: 'orcamento/enviados',
          name: 'orcamento-enviado',
          component: OrcamentoEnviado,
        },
      ],
    },

    {
      path: '/estoque',
      name: 'estoque',
      component: Layout,
      children: [
        {
          path: 'entrada',
          name: 'EstoqueEntradaPage',
          component: EstoqueEntradaPage
        },
        {
          path: 'saida',
          name: 'EstoqueSaidaPage',
          component: EstoqueSaidaPage
        },
        {
          path: 'saidaorcamento',
          name: 'EstoqueSaidaOrcamentoPage',
          component: UnderConstructionPage
        },
        {
          path: 'relestoque',
          name: 'EstoqueRelatorioPage',
          component: EstoqueRelatorioPage
        },
        {
          path: 'relabaixominimo',
          name: 'EstoqueRelatorioAbaixoMinimoPage',
          component: EstoqueAbaixoMinimoPage
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
          // component: () => import('@/pages/cadastros/equipamentos.vue')
          component: CadastroEquipamentosPage
        },
        {
          path: 'equipamento/:uuid',
          name: 'CadastroEquipamentoPage',
          // component: () => import('@/pages/cadastros/equipamentos.vue')
          component: CadastroEquipamentoPage
        },
        {
          path: 'funcoes',
          name: 'CadastroFuncoesPage',
          // component: () => import('@/pages/cadastros/funcoes.vue')
          component: CadastroFuncoesPage
        },
        // {
        //   path: 'servicos',
        //   name: 'CadastroServicosPage',
        //   component: () => import(/* webpackChunkName: "AppCad" */ '@/pages/cadastros/servicos.vue')
        // },
        {
          path: 'clientes',
          name: 'CadastroClientesPage',
          // component: () => import('@/pages/cadastros/clientes.vue')
          component: CadClientePage,
        },
      ],
    }
   ] 
});
