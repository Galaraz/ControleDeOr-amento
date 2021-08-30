<template>
<div class="dashboard-page">

  <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
  <div class="row d-flex justify-content-between mt-0 mb-4 ml-1 mr-1">

    <div style="width: 16rem;" class="mb-2">
      <b-card bg-variant="secondary" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
        <b-card-text>
          <span style="font-size:85%;">Em Digitação</span><br>
          <span class="p-0 mt-0" style="font-size:170%;"> {{StsD}}</span><br>
          <span class="p-0 mt-0" style="font-size:170%;">R$ {{numeroBR(VlrD)}}</span>
        </b-card-text>
      </b-card>
    </div>

    <div style="width: 16rem;" class="mb-2">
      <b-card bg-variant="info" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
        <b-card-text>
          <span style="font-size:85%;">Finalizadas / Enviadas</span><br>
          <span class="p-0 mt-0" style="font-size:170%;"> {{StsF}}</span><br>
          <span class="p-0 mt-0" style="font-size:170%;">R$ {{numeroBR(VlrF)}}</span>
        </b-card-text>
      </b-card>
    </div>

    <div style="width: 16rem;" class="mb-2">
      <b-card bg-variant="success" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
        <b-card-text>
          <span style="font-size:85%;">Vendidas</span><br>
          <span class="p-0 mt-0" style="font-size:170%;"> {{StsV}}</span><br>
          <span class="p-0 mt-0" style="font-size:170%;">R$ {{numeroBR(VlrV)}}</span>
        </b-card-text>
      </b-card>
    </div>

    <div style="width: 16rem;" class="mb-2">
      <b-card bg-variant="danger" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
        <b-card-text>
          <span style="font-size:85%;">Perdidas / Canceladas</span><br>
          <span class="p-0 mt-0" style="font-size:170%;"> {{StsC}}</span><br>
          <span class="p-0 mt-0" style="font-size:170%;">R$ {{numeroBR(VlrC)}}</span>
        </b-card-text>
      </b-card>
    </div>



    <!-- <div style="width: 19rem;">
      <b-card bg-variant="primary" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
        <b-card-text>
          <span style="font-size:85%;"><i class="fas fa-hashtag"></i></span><br>
          <span class="p-0 mt-0" style="font-size:170%;">{{registry.codigo}}-</span><span class="p-0 mt-0" style="font-size:120%;">{{registry.versao}}</span>
        </b-card-text>
      </b-card>
    </div>

    <div style="width: 44rem;" class="ml-4 mb-0 p-0">
        
    </div>
    <div style="width: 14rem;">
      <b-card bg-variant="primary" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
        <b-card-text>
          <span style="font-size:85%;"><i class="fas fa-tag"></i> Status</span><br>
          <span class="p-0 mt-0" style="font-size:170%;">Em Digitação</span>
        </b-card-text>
      </b-card>
    </div> -->
  </div>
  </b-overlay>
  
  
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
      processando: false,
      registers: [],
      StsD: 0, VlrD: 0,
      StsF: 0, VlrF: 0,
      StsV: 0, VlrV: 0,
      StsC: 0, VlrC: 0,
    };
  },
  methods: {
    getDashboard(){
      this.processando = true;
        this.$http({
          method: 'get',
          url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/dashboard",
          // url: "http://127.0.0.1:8000/api/orcamentos/dashboard",
        })
        .then((result) => {
          this.processando = false;
          this.registers = result.data;

          let reg = this.registers.find((data) => data.status === "D");
          if(reg){
            this.StsD = reg.qtd
            this.VlrD = reg.valor
          }

          reg = this.registers.find((data) => data.status === "F");
          if(reg){
            this.StsF = reg.qtd
            this.VlrF = reg.valor
          }

          reg = this.registers.find((data) => data.status === "V");
          if(reg){
            this.StsV = reg.qtd
            this.VlrV = reg.Valor
          }

          reg = this.registers.find((data) => data.status === "C");
          if(reg){
            this.StsC = reg.qtd
            this.VlrC = reg.valor
          }


        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.processando = false;
          this.showMessage('Erro na conexão [Dashboard]. Acione o suporte.', 'danger');
          this.erroConexao(error);
        });
    }
  },
  computed: {
    
  },
  created(){
    this.$store.commit('setNomePagina', '<i class="fas fa-tachometer-alt"></i>&nbsp;Dashboard')

    this.getDashboard()
  }
};
</script>

<style src="../components/Dashboard.scss" lang="scss" />
