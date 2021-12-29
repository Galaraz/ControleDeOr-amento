<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <!-- old: logo_naxsys.png -->
        <router-link to="/paginainicial"><span class="primary-word"><img src="/img/e-nax.jpeg" width="130px"></span></router-link>
      </header>

      <NavLink
        v-if="this.$store.state.user.type=='A' || this.$store.state.user.type=='S'"
        :activeItem="activeItem"
        header="Painel"
        link="/dashboard"
        iconName="fas fa-tachometer-alt"
        index="dashboard"
        isHeader
      />

      <NavLink
        :activeItem="activeItem"
        header="Novo Orçamento"
        link="/orcamento/orcamento"
        iconName="fas fa-plus"
        index="orcamento/orcamento"
        isHeader
      />

      <NavLink
        :activeItem="activeItem"
        header="Orçamentos - Lista"
        link="/orcamento/lista"
        iconName="fas fa-list"
        index="orcamento/lista"
        isHeader
      />

      <NavLink
        v-if="this.$store.state.user.type=='A' || this.$store.state.user.type=='S'"
        :activeItem="activeItem"
        header="Estoque"
        link="/estoque"
        iconName="fas fa-barcode"
        index="estoque"
        :childrenLinks="[
          { header: 'Entrada', link: '/estoque/entrada', iconName: 'fas fa-sign-in-alt' },
          { header: 'Saída', link: '/estoque/saida', iconName: 'fas fa-sign-out-alt' },
          { header: 'Saída Orçamento', link: '/estoque/saidaorcamento', iconName: 'fas fa-sign-out-alt' },
          { header: 'Rel Estoque', link: '/estoque/relestoque', iconName: 'fas fa-boxes' },
          { header: 'Rel Abaixo Mínimo', link: '/estoque/relabaixominimo', iconName: 'fas fa-sort-numeric-down-alt' },
        ]"
      />

      <NavLink
        v-if="(this.$store.state.user.type=='A' || this.$store.state.user.type=='S') && v3"
        :activeItem="activeItem"
        header="Ordem de Serviço"
        link="/ordemservico"
        iconName="fas fa-file-invoice"
        index="ordemservico"
        :childrenLinks="[
          { header: 'Lista de OS', link: '/ordemservico/lista', iconName: 'far fa-file-alt' },
          { header: 'Busca', link: '/ordemservico/busca', iconName: 'fas fa-search' },
          { header: 'Prev X Real', link: '/ordemservico/relat/prevreal', iconName: 'fas fa-file-medical-alt' },
          
        ]"
      />

      <NavLink
        v-if="(this.$store.state.user.type=='A' || this.$store.state.user.type=='S') && v3"
        :activeItem="activeItem"
        header="Comissionamento"
        link="/comiss"
        iconName="fas fa-money-check-alt"
        index="comiss"
        :childrenLinks="[
          { header: 'Consulta Mes', link: '/comiss/consultames', iconName: 'far fa-calendar-alt' },
          { header: 'Confirmar Pagto', link: '/comiss/confpagto', iconName: 'fas fa-comment-dollar' },
          { header: 'Pagtos Efetuados', link: '/comiss/pagtos', iconName: 'far fa-money-bill-alt' },
          
          
        ]"
      />
 
      <NavLink
        v-if="this.$store.state.user.type=='A'"
        :activeItem="activeItem"
        header="Cadastros"
        link="/cadastros"
        iconName="fas fa-cogs"
        index="cadastros"
        :childrenLinks="[
          { header: 'Equipamentos', link: '/cadastros/equipamentos', iconName: 'fas fa-microchip' },
          { header: 'Colaboradores', link: '/cadastros/colaboradores', iconName: 'fas fa-id-badge' },
          { header: 'Clientes', link: '/cadastros/clientes', iconName: 'fas fa-user-tie' },
          { header: 'Funções', link: '/cadastros/funcoes', iconName: 'fas fa-user-cog' },
          { header: 'Usuários', link: '/cadastros/usuarios', iconName: 'fas fa-users' },
        ]"
      />
      <!-- { header: 'Colaboradores', link: '/cadastros/colaboradores', iconName: 'fas fa-id-badge' }, -->



      <br><br><br><br><br>
      <h5 class="navTitle">Versão: {{versao}}</h5>
      <br><br><br><br><br>

    </nav>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'danger',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'primary',
        },
      ],

      versao: null,
      v3: false,

    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created() {
    this.setActiveByRoute();
    this.versao = process.env.VUE_APP_FRONT_VERSION
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
