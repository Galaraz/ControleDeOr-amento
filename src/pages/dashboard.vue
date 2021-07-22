<template>
  <div class="dashboard-page">
    Aqui vai o centeúdo
    
    
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
    this.$store.commit('setNomePagina', '<i class="fas fa-cogs"></i>&nbsp;Cadastros&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="far fa-file-alt"></i>&nbsp;Nome do Cadastro')
  }
};
</script>

<style src="../components/Dashboard.scss" lang="scss" />
