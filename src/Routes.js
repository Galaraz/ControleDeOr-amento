import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout/Layout';


import Login from '@/pages/login/Login';
import Logout from '@/pages/logout';
import SemPermissaoPage from '@/pages/semPermissao';
import PaginaInicialPage from '@/pages/paginaInicial';
import DashboardPage from '@/pages/dashboard';
import OrcamentoNovo from '@/pages/orcamento/orcamentoNovo';
import OrcamentoLista from '@/pages/orcamento/orcamentoLista';
import OrcamentoEnviado from '@/pages/orcamento/orcamentoEnviados';

import OrcamentoPage from '@/pages/orcamento/orcamento';
import CadClientePage from '@/pages/cadastros/clientes.vue'

import CadastroEquipamentosPage from '@/pages/cadastros/equipamentos.vue'
import CadastroEquipamentoPage from '@/pages/cadastros/equipamento.vue'
import CadastroFuncoesPage from '@/pages/cadastros/funcoes.vue'
import CadastroUsuariosPage from '@/pages/cadastros/usuarios.vue'
import CadastroUsuarioPage from '@/pages/cadastros/usuario.vue'
import CadastroUsuarioTrocaSenhaPage from '@/pages/cadastros/usuarioTrocaSenha.vue'

import EstoqueEntradaPage from '@/pages/estoque/entrada.vue'
import EstoqueSaidaPage from '@/pages/estoque/saida.vue'
import EstoqueRelatorioPage from '@/pages/estoque/relatorioEstoque.vue'
import EstoqueAbaixoMinimoPage from '@/pages/estoque/relatorioAbaixoMinimo.vue'
import EstoqueSaidaOrcamentoPage from '@/pages/estoque/saidaOrcamento.vue'

import OrdemServicoListaPage from '@/pages/ordemServico/lista.vue'
import OrdemServicoDetalhePage from '@/pages/ordemServico/detalhe.vue'

// import UnderConstructionPage from '@/pages/underConstruction.vue'

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
      path: '/logout',
      name: 'Logout',
      component: Logout,
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
          path: 'paginainicial',
          name: 'PaginaInicial',
          component: PaginaInicialPage,
        },
        {
          path: 'sempermissao',
          name: 'SemPermissao',
          component: SemPermissaoPage,
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
          component: EstoqueSaidaOrcamentoPage
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
      path: '/ordemservico',
      name: 'ordemservico',
      component: Layout,
      children: [
        {
          path: 'lista',
          name: 'OrdemServicoListaPage',
          component: OrdemServicoListaPage
        },
        {
          path: 'os/:uuid',
          name: 'OrdemServicoDetalhePage',
          component: OrdemServicoDetalhePage
        },
      ],
    },
      
    {
      path: '/cadastros',
      name: 'cadastros',
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
        {
          path: 'usuarios',
          name: 'CadastroUsuariosPage',
          component: CadastroUsuariosPage,
        },
        {
          path: 'usuario/trocarsenha',
          name: 'CadastroUsuarioTrocaSenhaPage',
          component: CadastroUsuarioTrocaSenhaPage,
        },
        {
          path: 'usuario/:uuid',
          name: 'CadastroUsuarioPage',
          // component: () => import(/* webpackChunkName: "cad" */ '@/pages/CAD/usuario.vue')
          component: CadastroUsuarioPage,
        },
        

        

        
      ],
    },

    {
      path: "*",
      redirect: "/paginainicial"
    }
   ] 
});
