<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <router-link to="/dashboard"><span class="primary-word"><img src="/img/logo_naxsys.jpg" width="130px"></span></router-link>
      </header>

      <NavLink
        :activeItem="activeItem"
        header="Painel"
        link="/dashboard"
        iconName="fas fa-tachometer-alt"
        index="dashboard"
        isHeader
      />
      <!-- <NavLink
        :activeItem="activeItem"
        header="Orçamento"
        link="/orcamento/orcamento"
        iconName="far fa-file-alt"
        index="orcamento/orcamento"
        isHeader
      /> -->
      <NavLink
        :activeItem="activeItem"
        header="Novo Orçamento"
        link="/orcamento/orcamento"
        iconName="fas fa-plus"
        index="orcamento/orcamento"
        isHeader
      />
      <!-- <NavLink
        :activeItem="activeItem"
        header="Orçamentos Enviados"
        link="/orcamento/enviados"
        iconName="far fa-paper-plane"
        index="orcamento/enviados"
        isHeader
      /> -->
      <NavLink
        :activeItem="activeItem"
        header="Orçamentos - Lista"
        link="/orcamento/lista"
        iconName="fas fa-list"
        index="orcamento/lista"
        isHeader
      />

      <NavLink
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
        :activeItem="activeItem"
        header="Cadastros"
        link="/cadastros"
        iconName="fas fa-cogs"
        index="cadastros"
        :childrenLinks="[
          { header: 'Equipamentos', link: '/cadastros/equipamentos', iconName: 'fas fa-microchip' },
          { header: 'Funções', link: '/cadastros/funcoes', iconName: 'fas fa-user-cog' },
          { header: 'Clientes', link: '/cadastros/clientes', iconName: 'fas fa-user-tie' },
        ]"
      />
      <!-- { header: 'Atividades', link: '/cadastros/servicos', iconName: 'fas fa-tools' }, -->









      <!--<h5 class="navTitle first">
        APP
      </h5>-->
      <!-- <ul class="nav">
        <NavLink
            :activeItem="activeItem"
            header="Painel"
            link="/dashboard"
            iconName="flaticon-home"
            index="dashboard"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="Funçoes"
            link="/notifications"
            iconName="flaticon-bell"
            index="notifications"
             :childrenLinks="[
              { header: 'Equipamentos', link: '/app/cadastros/charts' },
              { header: 'Serviços', link: '/app/cadastros/icons' },
              { header: 'Funções', link: '/app/cadastros/maps' },
              { header: 'Clientes', link: '/app/cadastros/clientes' },
              { header: 'Usuários', link: '/app/cadastros/usuarios' },
            ]"
        />
        <NavLink
            :activeItem="activeItem"
            header="Cadastros"
            link="/cadastros"
            iconName="flaticon-network"
            index="cadastros"
            :childrenLinks="[
              { header: 'Equipamentos', link: '/app/cadastros/charts' },
              { header: 'Serviços', link: '/app/cadastros/icons' },
              { header: 'Funções', link: '/app/cadastros/maps' },
              { header: 'Clientes', link: '/app/cadastros/clientes' },
              { header: 'Usuários', link: '/app/cadastros/usuarios' },
            ]"
        />
         <NavLink
            :activeItem="activeItem"
            header="Orçamentos"
            link="/orcamento"
            iconName="flaticon-network"
            index="orcamento"
            :childrenLinks="[
              { header: 'Novo Orçamento', link: '/orcamento/' },
              { header: 'Orçamentos Enviados', link: '/cadastros/icons' },
              { header: 'Rascunhos', link: '/cadastros/maps' },
            ]"
        />
         <NavLink
            :activeItem="activeItem"
            header="Usuarios"
            link="/cadastros"
            iconName="flaticon-network"
            index="cadastros"
            :childrenLinks="[
              { header: 'Equipamentos', link: '/app/cadastros/charts' },
              { header: 'Serviços', link: '/app/cadastros/icons' },
              { header: 'Funções', link: '/app/cadastros/maps' },
              { header: 'Clientes', link: '/app/cadastros/clientes' },
              { header: 'Usuários', link: '/app/cadastros/usuarios' },
            ]"
        />
         <NavLink
            :activeItem="activeItem"
            header="Sair"
            link="/login"
            iconName="flaticon-equal-1"
            index="tables"
            isHeader
          />
      </ul> -->
      <!--
      <h5 class="navTitle">
        LABELS
      </h5>
      <ul class="sidebarLabels">
        <li>
          <a href="#">
            <i class="fa fa-circle text-danger"/>
            <span class="labelName">Core</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-circle text-primary"/>
            <span class="labelName">UI Elements</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-circle text-success"/>
            <span class="labelName">Forms</span>
          </a>
        </li>
      </ul>
      -->
      <!-- <h5 class="navTitle">
        PROJECTS
      </h5>
      <div class="sidebarAlerts">
        <b-alert
            v-for="alert in alerts"
            :key="alert.id"
            class="sidebarAlert" variant="transparent"
            show dismissible
        >
          <span>{{alert.title}}</span><br/>
          <b-progress class="sidebarProgress progress-xs mt-1"
                      :variant="alert.color" :value="alert.value" :max="100"/>
          <small>{{alert.footer}}</small>
        </b-alert>
      </div> -->
    <!-- <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> -->
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
