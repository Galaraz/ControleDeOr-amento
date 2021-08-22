<template>
  <div class="dashboard-page">

    
    
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
    this.$store.commit('setNomePagina', '<i class="fas fa-tachometer-alt"></i>&nbsp;Dashboard')
  }
};
</script>

<style src="../components/Dashboard.scss" lang="scss" />
