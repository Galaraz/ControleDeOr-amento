<template>
<div class="dashboard-page">

  <!-- <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
  <div class="row d-flex justify-content-between mt-0 mb-4 ml-1 mr-1"> -->

    <!-- <div style="width: 16rem;" class="mb-2">
      <b-card bg-variant="secondary" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
        <b-card-text>
          <span style="font-size:85%;">Em Digitação</span><br>
          <span class="p-0 mt-0" style="font-size:170%;"> {{StsD}}</span><br>
          <span class="p-0 mt-0" style="font-size:170%;">R$ R$ {{numeroBR(VlrD)}}</span>
        </b-card-text>
      </b-card>
    </div>

    <div style="width: 16rem;" class="mb-2">
      <b-card bg-variant="info" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
        <b-card-text>
          <span style="font-size:85%;">Finalizadas / Enviadas</span><br>
          <span class="p-0 mt-0" style="font-size:170%;"> {{StsF}}</span><br>
          <span class="p-0 mt-0" style="font-size:170%;">R$ R$ {{numeroBR(VlrF)}}</span>
        </b-card-text>
      </b-card>
    </div>

    <div style="width: 16rem;" class="mb-2">
      <b-card bg-variant="success" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
        <b-card-text>
          <span style="font-size:85%;">Vendidas</span><br>
          <span class="p-0 mt-0" style="font-size:170%;"> {{StsV}}</span><br>
          <span class="p-0 mt-0" style="font-size:170%;">R$ R$ {{numeroBR(VlrV)}}</span>
        </b-card-text>
      </b-card>
    </div>

    <div style="width: 16rem;" class="mb-2">
      <b-card bg-variant="danger" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
        <b-card-text>
          <span style="font-size:85%;">Perdidas / Canceladas</span><br>
          <span class="p-0 mt-0" style="font-size:170%;"> {{StsC}}</span><br>
          <span class="p-0 mt-0" style="font-size:170%;">R$ R$ {{numeroBR(VlrC)}}</span>
        </b-card-text>
      </b-card>
    </div> -->



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
  <!-- </div>
  </b-overlay> -->

  <!-- <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
  <div class="row">
    <div class="col">
      <! -- title="<h5><i class='far fa-list-alt text-primary'></i> Orçamentos</h5>" -- >
      <Widget
        bodyClass="widget-table-overflow"
        customHeader
        style="width:100%"
      >
        <div class="widget-title ml-4 mb-3">
          <h5><i class='far fa-file-alt text-primary'></i>&nbsp;&nbsp;Dados do Mes de </h5>
        </div>
      </Widget>
    </div>
  </div>
  </b-overlay> -->


  <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
  <div class="row">
    <div class="col">
      <!-- title="<h5><i class='far fa-list-alt text-primary'></i> Orçamentos</h5>" -->
      <Widget
        
        bodyClass="widget-table-overflow"
        customHeader
        style="width:100%"
      >
        <div class="widget-title ml-4 mb-3">
          <h5><i class='far fa-list-alt text-primary'></i> Orçamentos com alterações em {{nomeMes}}/{{ano}}</h5>
        </div>
        <div class="widget-controls">
            <!-- <a v-if="canAdd" data-widgster="collapse" v-b-tooltip.hover title="Incluir Registro" @click="modalAddRegistry()"><i class="fas fa-plus text-success"></i></a>
            &nbsp; -->
            <a data-widgster="load" v-b-tooltip.hover title="Refresh" @click="getDashboard()"><i class="fas fa-sync-alt text-primary"></i></a>
        </div>

        <table class="table table-striped table-hover table-lg mb-0 requests-table mt-3 border-1">
            <thead>
                <!-- class="text-white" -->
            <tr>
                <th class="text-center" style="width:50px"><i class="fas fa-circle text-secondary fa-lg"></i></th>
                <th class="text-center"><strong>Status</strong></th>
                <th class="text-right"><strong>Quantidade</strong></th>
                <th class="text-right"><strong>Valor</strong></th>
            </tr>
            </thead>
            <tbody>
<!-- listaStatus: [
    { status: "D", descricao: "Em Solicitação", cor:"secondary"},
    { status: "V", descricao: "Aguardando Validação", cor:"secondary"},
    { status: "E", descricao: "Aguardando Aprovação", cor:"primary"},
    { status: "A", descricao: "Aprovado", cor:"success"},
    { status: "R", descricao: "Rejeitado/Cancelado", cor:"danger"},
    { status: "X", descricao: "Executado", cor:"info"},
    { status: "F", descricao: "Faturado", cor:"success"},
], -->
            <tr @click="listaStatus('D')">
              <td class="text-center"><i class="fas fa-circle text-default fa-lg"></i></td>
              <td class="text-center">Em Solicitação</td>
              <td class="text-right">{{StsD}}</td>
              <td class="text-right">R$ {{numeroBR(VlrD)}}</td>
            </tr>
            <tr @click="listaStatus('V')">
              <td class="text-center"><i class="fas fa-circle text-secondary fa-lg"></i></td>
              <td class="text-center">Aguardando Validação</td>
              <td class="text-right">{{StsV}}</td>
              <td class="text-right">R$ {{numeroBR(VlrV)}}</td>
            </tr>
            <tr @click="listaStatus('E')">
              <td class="text-center"><i class="fas fa-circle text-warning fa-lg"></i></td>
              <td class="text-center">Aguardando Aprovação</td>
              <td class="text-right">{{StsE}}</td>
              <td class="text-right">R$ {{numeroBR(VlrE)}}</td>
            </tr>
            <tr @click="listaStatus('A')">
              <td class="text-center"><i class="fas fa-circle text-success fa-lg"></i></td>
              <td class="text-center">Aprovado</td>
              <td class="text-right">{{StsA}}</td>
              <td class="text-right">R$ {{numeroBR(VlrA)}}</td>
            </tr>
            <tr @click="listaStatus('R')">
              <td class="text-center"><i class="fas fa-circle text-danger fa-lg"></i></td>
              <td class="text-center">Rejeitado/Cancelado</td>
              <td class="text-right">{{StsR}}</td>
              <td class="text-right">R$ {{numeroBR(VlrR)}}</td>
            </tr>
            <tr @click="listaStatus('X')">
              <td class="text-center"><i class="fas fa-circle text-info fa-lg"></i></td>
              <td class="text-center">Executado</td>
              <td class="text-right">{{StsX}}</td>
              <td class="text-right">R$ {{numeroBR(VlrX)}}</td>
            </tr>
            <tr @click="listaStatus('F')">
              <td class="text-center"><i class="fas fa-circle text-success fa-lg"></i></td>
              <td class="text-center">Faturado</td>
              <td class="text-right">{{StsF}}</td>
              <td class="text-right">R$ {{numeroBR(VlrF)}}</td>
            </tr>
            </tbody>
        </table>
      </Widget>
    </div>
  </div>

  <div class="row mt-3">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget    
                customHeader
                style="width:100%"
            >
                <span class="float-right">
                  <b-button size="sm" variant="default" v-b-tooltip.hover title="Lista de Orçamentos" class="float-right" @click="backToList()"><i class="far fa-list-alt ml-2 mr-2"></i></b-button>
                </span>

                
            </Widget>
            </b-overlay>
        </div>
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
      StsV: 0, VlrV: 0,
      StsE: 0, VlrE: 0,
      StsA: 0, VlrA: 0,
      StsR: 0, VlrR: 0,
      StsX: 0, VlrX: 0,
      StsF: 0, VlrF: 0,
      StsC: 0, VlrC: 0,
      nomeMes: null,
      ano: null,
    };
  },
  methods: {
    getDashboard(){
      let date = new Date(); // 2020-06-21
      this.nomeMes = date.toLocaleString('pt-BR', { month: 'long' }); /* June */
      this.ano = new Date().getFullYear()

      this.processando = true;
        this.$http({
          method: 'get',
          url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/dashboard",
          // url: "http://127.0.0.1:8000/api/orcamentos/dashboard",
        })
        .then((result) => {
          this.processando = false;
          this.registers = result.data;

          // console.log(this.registers)

          let reg = this.registers.find((data) => data.status === "D");
          if(reg){
            this.StsD = reg.qtd
            this.VlrD = reg.valor
          }
          reg = this.registers.find((data) => data.status === "V");
          if(reg){
            this.StsV = reg.qtd
            this.VlrV = reg.valor
          }
          reg = this.registers.find((data) => data.status === "E");
          if(reg){
            this.StsE = reg.qtd
            this.VlrE = reg.valor
          }
          reg = this.registers.find((data) => data.status === "A");
          if(reg){
            this.StsA = reg.qtd
            this.VlrA = reg.valor
          }
          reg = this.registers.find((data) => data.status === "R");
          if(reg){
            this.StsR = reg.qtd
            this.VlrR = reg.valor
          }
          reg = this.registers.find((data) => data.status === "X");
          if(reg){
            this.StsX = reg.qtd
            this.VlrX = reg.valor
          }
          reg = this.registers.find((data) => data.status === "F");
          if(reg){
            this.StsF = reg.qtd
            this.VlrF = reg.valor
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
    },
    backToList(){
      this.$router.push({ name: 'orcamento-lista'})
    },
    listaStatus(status){
      this.$router.push("/orcamento/lista/"+status)
    }
  },
  computed: {
    
  },
  created(){
    this.$store.commit('setNomePagina', '<i class="fas fa-tachometer-alt"></i>&nbsp;Dashboard')
    if(! (this.$store.state.user.type=='A' || this.$store.state.user.type=='S')) {
      this.$router.push({ name: 'SemPermissao'}); 
    }
    this.getDashboard()
  }
};
</script>

<style src="../components/Dashboard.scss" lang="scss" />
