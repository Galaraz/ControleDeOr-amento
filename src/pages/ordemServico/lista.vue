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

                    <div class="col col-9 text-right">
                        <br>
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
                            <span><h5>&nbsp;&nbsp;<i class='fas fa-list text-primary'></i>&nbsp;&nbsp;Lista de Ordens de Serviço</h5></span>
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
                            <th class="text-center" style="width:160px">Status</th>
                            <th class="text-center" style="width:160px">Orçamento</th>
                            <th class="text-left">Referencia</th>
                            <th class="text-right" style="width:120px">Valor</th>
                            <th class="text-right" style="width:100px">Hr Prev</th>
                            <th class="text-right" style="width:100px">Hr Real</th>
                            <th style="width:50px" v-b-tooltip.hover title="Editar"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(row, index) in registers.data" :key="row.id">
                            <td class="text-center"><span v-html="displayStatus(row)"></span></td>
                            <td class="text-center">{{textStatus(row)}}</td>
                            <td class="text-left">{{row.fk_orcamento.codigo}}</td>
                            <td>{{row.fk_orcamento.referencia}}</td>
                            <td class="text-right">{{numeroBR(row.vlr_total)}}</td>
                            <td class="text-right">{{numeroBR(row.qtd_horas_prev,1)}}</td>
                            <td class="text-right">{{numeroBR(row.qtd_horas_real,1)}}</td>
                            <td class="text-center">
                                <a @click="showRegistry(index)"><i class="far fa-edit text-info"></i></a>
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

            statusLista: [
                { status: "D", descricao: "Em Digitação", cor:"default"},
                { status: "L", descricao: "Liberada", cor:"secondary"},
                { status: "E", descricao: "Em Execução", cor:"primary"},
                { status: "C", descricao: "Cancelada", cor:"danger"},
                { status: "F", descricao: "Finalizada", cor:"success"},
            ],
            status: {},
        }
    },
    methods: {
        displayStatus(registry){
            if(registry.status=='D') {
                return '<i class="fas fa-circle text-default"></i>'
            } else if(registry.status=='L') {
                return '<i class="fas fa-circle text-secondary"></i>'
            } else if(registry.status=='E') {
                return '<i class="fas fa-circle text-primary"></i>'
            } else if(registry.status=='C') {
                return '<i class="fas fa-circle text-danger"></i>'
            } else if(registry.status=='F') {
                return '<i class="fas fa-circle text-success"></i>'
            } else {
                return '<i class="fas fa-circle text-warning"></i>'
            }
        },
        textStatus(registry){
            if(registry.status=='D') {
                return 'Em Digitação'
            } else if(registry.status=='L') {
                return 'Liberada'
            } else if(registry.status=='E') {
                return 'Em Execução'
            } else if(registry.status=='C') {
                return 'Cancelado'
            } else if(registry.status=='F') {
                return 'Finalizada'
            } else {
                return 'Erro: '+registry.status
            }
        },


        getRegisters(page = 1){ 
            this.processando = true
            var urlGet = process.env.VUE_APP_URL_BASE_API+'/api/ordemservico?page=' + page 
            if(this.status){
                urlGet += "&status="+this.status.status
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
            this.$router.push({ 
                        name: 'OrdemServicoDetalhePage', 
                        params: { uuid: this.registers.data[index].uuid}
            })
            // this.$router.push("/ordemservico/"+this.registers.data[index].uuid)
        },

    },
    computed:{
      
    },
    created(){
        this.$store.commit('setNomePagina', '<i class="fas fa-file-invoice"></i>&nbsp;Ordem de Serviço&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="far fa-file-alt"></i>&nbsp;Lista de Ordens de Serviço')

        this.getRegisters()
    }
}
</script>

