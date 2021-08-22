<template>
<div>
  <div class="row">
    <div class="col">
      <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
      <Widget
        title="<h5>&nbsp;&nbsp;<i class='fas fa-filter text-inverse'></i>&nbsp;&nbsp;Filtros</h5>"
        collapse customHeader
        class="mb-3"
      >
        <div class="row">
          <div class="col">

          </div>
          <div class="col text-right">
            <b-button variant="inverse" size="sm" @click="getRegisters()"><i class="fas fa-search"></i> Buscar</b-button>
          </div>
        </div>
      </Widget>
      <Widget
        bodyClass="widget-table-overflow"
        customHeader
        style="width:100%"
      >


        <div class="widget-title">
                    <div class="d-inline-flex mb-1">
                        <span><h5>&nbsp;&nbsp;<i class='fas fa-list text-primary'></i>&nbsp;&nbsp;Lista de Orçamentos</h5></span>
                        <span class="text-info text-center" style="width:500px;" v-if="processando">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-spinner fa-spin text-info"></i>&nbsp;&nbsp;Processando...</span>
                    </div>
                </div>
                <div class="widget-controls">
                    <!-- <a data-widgster="collapse" v-b-tooltip.hover title="Incluir" @click="addRegistry()"><i class="fas fa-plus-circle fa-lg text-success"></i></a>
                    &nbsp; -->
                    <a data-widgster="load" @click="getRegisters()"><i class="fas fa-sync-alt text-primary"></i></a>
                </div>
                <div class="table-resposive">
                    <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th class="text-center" style="width:50px" v-b-tooltip.hover title="Status"><i class="fas fa-circle text-secondary"></i></th>
                        <th class="text-left" style="width:180px">Código</th>
                        
                        <th class="text-left">Cliente</th>
                        <th class="text-left">Contato</th>
                        <th class="text-left">E-mail</th>
                        <th class="text-left">Fone</th>
                        <th class="text-right">Valor</th>
                        <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row, index) in registers.data" :key="row.id">
                        <td class="text-center" @click="exameProcessar(row, index)"><span v-html="displayStatus(row)"></span></td>
                        <td class="text-left">{{row.codigo}}</td>
                        <td>{{row.fk_cliente.nome_fantasia}}</td>
                        <td>{{row.contato_nome}}</td>
                        <td>{{row.contato_email}}</td>
                        <td>{{row.contato_fone}}</td>
                        <td class="text-right">{{numeroBR(row.valor_total)}}</td>
                        <td v-if="canUpdate" class="text-center">
                            <a v-if="row.status!='F'" @click="showRegistry(index)"
                            ><i class="far fa-edit text-info"></i></a>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                </div>
                <div class="clearfix">
                  <hr>
                  <b-row class="d-flex justify-content-between" >
                    <b-col class="ml-3">
                      <div v-if="registers.current_page>0">
                        <pagination :data="registers" @pagination-change-page="getRegisters"></pagination>
                      </div>
                    </b-col>
                    <b-col class="text-right mr-3 mb-4">
                      <b-button disabled class="ml-4" size="sm" variant="default" v-b-tooltip.hover title="Imprimir" @click="ImprimirLista()">
                        <i class="fas fa-print ml-2 mr-2"></i>
                      </b-button>
                      <b-button disabled class="ml-4" size="sm" variant="default" v-b-tooltip.hover title="Excel" @click="excel()">
                        <i class="far fa-file-excel ml-2 mr-2"></i>
                      </b-button>
                    </b-col>
                  </b-row>
                </div>


      </Widget>
      </b-overlay>
    </div>
  </div>

  

</div>
</template>

<script>
  export default {
    data() {
      return {
        processando: false,
        registers: [],
        registry: {},
        canUpdate: true,
      }
    },
    methods: {
      displayStatus(registry){
        if(registry.status=='D') {
          return '<i class="fas fa-circle text-secondary"></i>'
        } else if(registry.status=='F') {
          return '<i class="fas fa-circle text-info"></i>'
        } else if(registry.status=='E') {
          return '<i class="fas fa-circle text-primary"></i>'
        } else if(registry.status=='V') {
          return '<i class="fas fa-circle text-success"></i>'
        } else if(registry.status=='P') {
          return '<i class="fas fa-circle text-danger"></i>'
        } else {
          return '<i class="fas fa-circle text-warning"></i>'
        }
      },
      textStatus(registry){
        if(registry.status=='D') {
          return 'Em Digitação'
        } else if(registry.status=='F') {
          return 'Finalizado'
        } else if(registry.status=='E') {
          return 'Enviado'
        } else if(registry.status=='V') {
          return 'Vendido'
        } else if(registry.status=='P') {
          return 'Perdido'
        } else {
          return 'Erro: '+registry.status
        }
      },
      getRegisters(page = 1){ 
        this.processando = true
        // var urlGet = process.env.VUE_APP_URL_BASE_API+'/orcamentos?page=' + page 
        var urlGet = 'http://127.0.0.1:8000/api/orcamentos?page=' + page 
        if(this.data_exame!=null && this.data_exame!=""){
            urlGet = urlGet+"&data_exame="+this.data_exame
        }
        this.$http({
          method: 'get',
          url: urlGet,
        })
        .then(result => {
          this.processando = false
          this.registers = result.data
          // console.log(result)
        })
        .catch((error) => {
          this.processando = false
          this.erroConexao(error)
        })
      },
      showRegistry(index){
        console.log(this.registers.data[index].uuid);
        // this.$router.push({ name: 'orcamento-orcamento-uuid', params: { uuid: this.registers.data[index].uuid}})
        // this.$router.push({ name: 'orcamento-orcamento-uuid', params: { uuid: this.registers.data[index].uuid} } )
        this.$router.push("/orcamento/orcamento/"+this.registers.data[index].uuid)
      },
    },
    created(){
      this.$store.commit('setNomePagina', '<i class="fas fa-list"></i>&nbsp;&nbsp;Lista de Orçamentos')

      this.getRegisters()
    }
  }
</script>

