<template>
  <div class="dashboard-page">
    <h1 class="page-title">Funções</h1>
    
    
  </div>
</template>

<script>
//import Widget from '@/components/Widget/Widget';
//import BigStat from './components/BigStat/BigStat';
//import mock from './mock';

//import { Chart } from 'highcharts-vue';

export default {
  name: 'Dashboard',
  components: {
    //Widget, BigStat, highcharts: Chart
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  computed: {
    
  },
  created(){
    this.$store.commit('setNomePagina', '<i class="fas fa-cogs"></i>&nbsp;Cadastros&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-user-cog"></i>&nbsp;Funções')
  }
};
</script>


