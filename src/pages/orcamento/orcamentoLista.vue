<template>
<div>
  <div class="row">
    <div class="col">
      <b-overlay variant="white" spinner-variant="primary" :show="processandoBusca" rounded="sm" style="width:100%">
      <Widget
        title="<h5>&nbsp;&nbsp;<i class='fas fa-filter text-inverse'></i>&nbsp;&nbsp;Filtros</h5>"
        collapse customHeader
        class="mb-3"
      >
        <div class="row">

          <div class="col col-3">
            <b-form-group
              id="input-group-22" label="Status:" label-for="input-22"
            >
              <v-select
                v-model="status"
                :options="statusLista"
                value-field="status"
                inputId="status"
                label="descricao"
                name="input-22"
                id="input-22"
              ></v-select>
            </b-form-group>
          </div>

          <div class="col col-3">
            <b-form-group
              id="input-group-11" label="Cliente:" label-for="input-11"
            >
              <v-select
                v-model="cliente"
                :options="clientes"
                value-field="id"
                inputId="id"
                label="nome"
                name="input-11"
                id="input-11"
              ></v-select>
            </b-form-group>
          </div>

          <div class="col col-4">
            <b-form-group
              id="input-group-21"
              label="Referencia:"
              label-for="referencia"
              description=""
            >
              <b-form-input
                id="referencia"
                v-model="referencia"
                type="text"
              ></b-form-input>
            </b-form-group>

          </div>
          

          <div class="col col-2 text-right">
            <b-button variant="inverse" size="sm" @click="getRegisters()"><i class="fas fa-search"></i> Buscar</b-button>
          </div>
        </div>
      </Widget>
      </b-overlay>

      <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
      <Widget
        bodyClass="widget-table-overflow"
        customHeader
        style="width:100%"
      >


        <div class="widget-title">
          <div class="d-inline-flex mb-1">
              <span><h5>&nbsp;&nbsp;<i class='fas fa-list text-primary'></i>&nbsp;&nbsp;Lista de Orçamentos</h5></span>
              <!-- <span class="text-info text-center" style="width:500px;" v-if="processando">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-spinner fa-spin text-info"></i>&nbsp;&nbsp;Processando...</span> -->
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
                        <th class="text-center" style="width:180px">Status</th>
                        <th class="text-left" style="width:160px">Código</th>
                        <th class="text-center" style="width:150px">Tipo</th>
                        <th class="text-left">Cliente</th>
                        <th class="text-left">Referencia</th>
                        <th class="text-right">Valor</th>
                        <!-- v-if="canUpdate"  -->
                        <th style="width:50px" v-b-tooltip.hover title="Editar"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row, index) in registers.data" :key="row.id">
                        <td class="text-center"><span v-html="displayStatus(row)"></span></td>
                        <td class="text-center">{{textStatus(row)}}</td>
                        <td class="text-left">{{row.codigo}}.{{row.versao}}</td>
                        <td class="text-center">{{textTipo(row)}}</td>
                        <td>{{row.fk_cliente.nome_fantasia}}</td>
                        <td>{{row.referencia}}</td>
                        <td class="text-right">{{numeroBR(row.valor_total)}}</td>
                        <!-- v-if="canUpdate" -->
                        <td class="text-center">
                            <!-- v-if="row.status!='F'" -->
                            <a @click="showRegistry(index)">
                              <!-- <i class="far fa-edit text-info"></i> -->
                              <span v-html="actionIcon(row)"></span>
                            </a>
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
        processandoBusca: false,
        registers: [],
        registry: {},
        canUpdate: true,

        clientes: [],
        cliente: {},
        referencia: null,
        statusLista: [
          { status: "D", descricao: "Em Solicitação", cor:"default"},
          { status: "V", descricao: "Aguardando Validação", cor:"secondary"},
          { status: "E", descricao: "Aguardando Aprovação", cor:"primary"},
          { status: "A", descricao: "Aprovado", cor:"success"},
          { status: "R", descricao: "Rejeitado/Cancelado", cor:"danger"},
          { status: "X", descricao: "Executado", cor:"info"},
          { status: "F", descricao: "Faturado", cor:"success"},
        ],
        status: {},
      }
    },
    methods: {
      displayStatus(registry){
        if(registry.status=='D') {
          return '<i class="fas fa-circle text-default"></i>'
        } else if(registry.status=='V') {
          return '<i class="fas fa-circle text-secondary"></i>'
        } else if(registry.status=='E') {
          return '<i class="fas fa-circle text-primary"></i>'
        } else if(registry.status=='A') {
          return '<i class="fas fa-circle text-success"></i>'
        } else if(registry.status=='R') {
          return '<i class="fas fa-circle text-danger"></i>'
        } else if(registry.status=='X') {
          return '<i class="fas fa-circle text-info"></i>'
        } else if(registry.status=='F') {
          return '<i class="fas fa-circle text-dark"></i>'
        } else {
          return '<i class="fas fa-circle text-warning"></i>'
        }
      },
      // { status: "D", descricao: "Em Solicitação", cor:"secondary"},
      // { status: "V", descricao: "Aguardando Validação", cor:"secondary"},
      // { status: "E", descricao: "Aguardando Aprovação", cor:"primary"},
      // { status: "A", descricao: "Aprovado", cor:"success"},
      // { status: "R", descricao: "Rejeitado/Cancelado", cor:"danger"},
      // { status: "X", descricao: "Executado", cor:"info"},
      // { status: "F", descricao: "Faturado", cor:"success"},
      textStatus(registry){
        if(registry.status=='D') {
          return 'Em Solicitação'
        } else if(registry.status=='V') {
          return 'Aguardando Validação'
        } else if(registry.status=='E') {
          return 'Aguardando Aprovação'
        } else if(registry.status=='A') {
          return 'Aprovado'
        } else if(registry.status=='R') {
          return 'Rejeitado/Cancelado'
        } else if(registry.status=='X') {
          return 'Executado'
        } else if(registry.status=='F') {
          return 'Faturado'
        } else {
          return 'Erro: '+registry.status
        }
      },

      textTipo(registry){
        if(registry.tipo=='D'){
          return 'On Demand'
        } else if(registry.tipo=='C'){
          return 'Corretiva'
        } else {
          return 'Erro: '+registry.tipo
        }
      },

      getRegisters(page = 1){ 
        this.processando = true
        var urlGet = process.env.VUE_APP_URL_BASE_API+'/api/orcamentos?page=' + page 
        if(this.status){
          // urlGet += "&status="+this.$route.params.status
          // this.status = this.statusLista.find((data) => data.status == this.$route.params.status);
          urlGet += "&status="+this.status.status
        }
        if(this.cliente!=null && this.cliente!="" && this.cliente!="undefined"){
        // if(this.cliente){
            urlGet = urlGet+"&id_cliente="+this.cliente.id
        }
        if(this.referencia!=null && this.referencia!=""){
            urlGet = urlGet+"&referencia="+this.referencia
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
        // console.log(this.registers.data[index].uuid);
        // this.$router.push({ name: 'orcamento-orcamento-uuid', params: { uuid: this.registers.data[index].uuid}})
        // this.$router.push({ name: 'orcamento-orcamento-uuid', params: { uuid: this.registers.data[index].uuid} } )
        this.$router.push("/orcamento/orcamento/"+this.registers.data[index].uuid)
      },

      getClientes() {
        this.processandoBusca = true;
        this.$http({
          method: 'get',
          url: process.env.VUE_APP_URL_BASE_API + "/api/cad/clientes?all=1",
        })
        .then((result) => {
          this.processandoBusca = false;
          this.clientes = result.data;
          // this.cliente = this.clientes[0].id
          // this.cliente = this.clientes[0]

          // console.log(result)
          // this.getModelos()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.processandoBusca = false;
          this.showMessage('Erro na conexão [Clientes]. Acione o suporte.', 'danger');
          this.erroConexao(error);
        });
      },
      actionIcon(registro){
        if(registro.status=="D"){
          return '<i class="far fa-edit text-info"></i>'
        } else {
          return '<i class="far fa-eye text-secondary"></i>'
        }
      },
    },
    computed:{
      
    },
    created(){
      this.$store.commit('setNomePagina', '<i class="fas fa-list"></i>&nbsp;&nbsp;Lista de Orçamentos')

      if(this.$route.params.status){
          this.status = this.statusLista.find((data) => data.status == this.$route.params.status);
      }

      this.getRegisters()
      this.getClientes()
    }
  }
</script>

