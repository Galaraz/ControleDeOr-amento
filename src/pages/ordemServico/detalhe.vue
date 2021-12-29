<template>
<div>
    
    <!-- INFORMACOES TOPO PAGINA - INICIO -->
    <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
    <div class="row d-flex justify-content-between mt-0 mb-4 ml-1 mr-1">
        <div style="width: 14rem;">
            <b-card bg-variant="primary" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
                <b-card-text>
                    <span style="font-size:85%;"><i class="fas fa-hashtag"></i></span><br>
                    <span class="p-0 mt-0" style="font-size:170%;">{{registry.id}}</span>
                </b-card-text>
            </b-card>
        </div>

        <div style="width: 1rem;" class="ml-4 mb-0 p-0">
            
        </div>
        <div style="width: 20rem;">
            <b-card :bg-variant="colorStatus()" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
                <b-card-text>
                    <span style="font-size:85%;"><i class="fas fa-tag"></i> Status</span><br>
                    <span class="p-0 mt-0" style="font-size:170%;">{{textStatus()}}</span>
                </b-card-text>
            </b-card>
        </div>
    </div>
    </b-overlay>
    <!-- INFORMACOES TOPO PAGINA - FIM -->

    <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
    <b-tabs card active-nav-item-class="bg-primary text-white">
        <!-- INFORMACOES - INICIO -->
        <b-tab active>
            <template v-slot:title><i class="fas fa-info-circle"></i> Informações</template>

            <div class="row">
                <div class="col col-8">
                    <b-form-group
                            id="input-group-21"
                            label="Referencia:"
                            label-for="referencia"
                            description=""
                        >
                        <b-form-textarea
                            disabled
                            id="descricao"
                            v-model="registry.fk_orcamento.referencia"
                            rows="2"
                            max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                </div>
                <div class="col col-4">
                    <b-form-group
                        id="inputgroup01" label="Técnico:" label-for="tecnico"
                    >
                        <v-select
                            v-if="registry.status=='D'"
                            v-model="tecnico"
                            :options="tecnicos"
                            value-field="id"
                            inputId="id"
                            label="nome"
                            name="tecnico"
                            id="tecnico"
                        ></v-select>
                        <b-form-input
                            v-else
                            id="tec_nome"
                            v-model="registry.tec_nome"
                            readonly
                        ></b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row">
                <div class="col col-8">
                    <b-form-group id="input-group-local_execucao" label="Local de Execução:" label-for="local_execucao">
                        <b-form-input
                            disabled
                            id="local_execucao"
                            v-model="registry.fk_orcamento.local_execucao"
                            required
                        ></b-form-input>
                    </b-form-group>
                </div>
                <div class="col col-4">
                    <b-form-group
                        id="inputgroup02" label="Auxiliar Técnico:" label-for="aux_tecnico"
                    >
                        <v-select
                            v-if="registry.status=='D'"
                            v-model="aux_tecnico"
                            :options="aux_tecnicos"
                            value-field="id"
                            inputId="id"
                            label="nome"
                            name="aux_tecnico"
                            id="aux_tecnico"
                        ></v-select>
                        <b-form-input
                            v-else
                            id="auxtec_nome"
                            v-model="registry.auxtec_nome"
                            readonly
                        ></b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row">
                <div class="col"><hr></div>
            </div>

            <div class="row">
                <div class="col col-4">
                    <b-form-group
                        id="inputgroup03" label="Data Prevista de Início:" label-for="data_inicio_prev"
                    >
                        
                        <b-input-group style="width:180px">
                            <b-form-input
                                id="data_inicio_prev"
                                v-model="registry.data_inicio_prev"
                                type="text"
                                placeholder="DD/MM/YYYY"
                                autocomplete="off"
                                :value="registry.data_inicio_prev"
                                :disabled="registry.status!='D'"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-form-datepicker
                                    v-model="data_inicio_prev_digit"
                                    button-only
                                    right
                                    locale="pt-BR"
                                    button-variant=primary
                                    :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit',  }"
                                    :disabled="registry.status!='D'"
                                ></b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>
                        <b-tooltip target="data_inicio_prev" placement="top">Data prevista para início da OS.</b-tooltip>
                    </b-form-group>
                </div>
                <div class="col col-2"></div>
                <div class="col col-4">
                    <b-form-group
                        id="inputgroup03" label="Data Prevista de Término:" label-for="data_fim_prev"
                    >
                        
                        <b-input-group style="width:180px">
                            <!-- placeholder="DD/MM/YYYY" -->
                            <b-form-input
                                id="data_fim_prev"
                                v-model="registry.data_fim_prev"
                                type="text"
                                autocomplete="off"
                                :value="registry.data_fim_prev"
                                :disabled="registry.status!='D'"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-form-datepicker
                                    v-model="data_fim_prev_digit"
                                    button-only
                                    right
                                    locale="pt-BR"
                                    button-variant=primary
                                    :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit',  }"
                                    :disabled="registry.status!='D'"
                                ></b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>
                        <b-tooltip target="data_fim_prev" placement="top">Data prevista para término da OS.</b-tooltip>
                    </b-form-group>
                </div>
            </div>

            <div class="row">
                <div class="col col-4">
                    <b-form-group
                        id="inputgroup03" label="Data Real de Início:" label-for="data_inicio_real"
                    >
                        
                        <b-input-group style="width:180px">
                            <b-form-input
                                id="data_inicio_prev"
                                v-model="data_inicio_show"
                                type="text"
                                autocomplete="off"
                                disabled
                            ></b-form-input>
                        </b-input-group>
                        <b-tooltip target="data_inicio_prev" placement="top">Data efetiva/real de início da OS.</b-tooltip>
                    </b-form-group>
                </div>
                <div class="col col-2"></div>
                <div class="col col-4">
                    <b-form-group
                        id="inputgroup03" label="Data Real de Término:" label-for="data_fim_real"
                    >
                        
                        <b-input-group style="width:180px">
                            <b-form-input
                                id="data_fim_real"
                                v-model="data_fim_show"
                                type="text"
                                autocomplete="off"
                                disabled
                            ></b-form-input>
                        </b-input-group>
                        <b-tooltip target="data_fim_real" placement="top">Data efetiva/real de término da OS.</b-tooltip>
                    </b-form-group>
                </div>
            </div>
            



        </b-tab>
        <!-- INFORMACOES - FIM -->


        <!-- APONTAMENTOS - INICIO -->
        <b-tab>
            <template v-slot:title><i class="far fa-calendar-check"></i> Apontamentos</template>
            <div class="row" v-if="registry.fk_apontamentos.length>0">
                <div class="col">
                    <table
                        class="table table-striped table-hover table-lg mt-3 border-1"
                    >
                        <thead>
                        <!-- class="text-white" -->
                        <tr>
                            <th class="text-center">Tipo</th>
                            <th class="text-center">Origem</th>
                            <th class="text-center">Data</th>
                            <th class="text-center">Usuário</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(linha) in registry.fk_apontamentos" :key="linha.id">
                            <td class="text-center">{{ linha.texto_tipo }}</td>
                            <td class="text-center">{{ linha.texto_origem }}</td>
                            <td class="text-center">{{ dataHoraBR(linha.created_at) }}</td>
                            <td class="text-center">{{ linha.fk_usuario.name }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </b-tab>
        <!-- APONTAMENTOS - FIM -->



        <!-- STATUS - INICIO -->
        <b-tab>
            <template v-slot:title><i class="fas fa-list-ol"></i> Histórico Status</template>
            <div class="row" v-if="registry.fk_status.length>0">
                <div class="col">
                    <table
                        class="table table-striped table-hover table-lg mt-3 border-1"
                    >
                        <thead>
                        <!-- class="text-white" -->
                        <tr>
                            <th class="text-left" colspan="2">Status</th>
                            <th class="text-center">Data</th>
                            <th class="text-center">Usuário</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(linha) in registry.fk_status" :key="linha.id">
                            <td width="50px" class="text-center"><span v-html="colorStatusStatus(linha.status)"></span></td>
                            <td class="text-left">{{ textStatus(linha.status) }}</td>
                            <td class="text-center">{{ dataHoraBR(linha.created_at) }}</td>
                            <td class="text-center">{{ linha.fk_usuario.name }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </b-tab>
        <!-- STATUS - FIM -->


    </b-tabs>
    </b-overlay>




    <!-- BOTOES - INICIO -->
    <div class="row mt-3">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget    
                customHeader
                style="width:100%"
            >
                <b-button :disabled="!(canUpdate && registry.status=='D')" size="sm" variant="primary" v-b-tooltip.hover title="Salvar" class="mr-4" @click="os_processar()"><i class="fas fa-save ml-2 mr-2"></i></b-button>
                &nbsp;&nbsp;
                <b-button :disabled="btnFinalizarDisabled" size="sm" variant="success" v-b-tooltip.hover title="Finalizar" class="mr-4 ml-4" @click="os_finalizar()"><i class="fas fa-arrow-right ml-2 mr-2"></i></b-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b-button :disabled="!(canUpdate && registry.status!='D')" size="sm" variant="primary" v-b-tooltip.hover title="Mudar Status" class="mr-4" @click="os_StatusChange()"><i class="fas fa-random ml-2 mr-2"></i></b-button>
                <!-- <b-button size="sm" variant="gray" v-b-tooltip.hover title="Mudanças de Status" class="mr-4" @click="os_StatusList()"><i class="fas fa-list-ol ml-2 mr-2"></i></b-button> -->
                
                
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b-button :disabled="!(canUpdate && registry.status!='D') || disableBTNDownload" size="sm" variant="default" v-b-tooltip.hover title="Download" class="mr-4 ml-4" @click="os_download()"><i class="fas fa-download ml-2 mr-2"></i></b-button>
                <b-button :disabled="!(canUpdate && registry.status!='D')" size="sm" variant="default" v-b-tooltip.hover title="Imprimir" class="mr-4 ml-4" @click="os_imprimir()"><i class="fas fa-print ml-2 mr-2"></i></b-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b-button :disabled="!(canUpdate && registry.status=='D') || registry.uuid==null" size="sm" variant="danger" v-b-tooltip.hover title="Excluir" class="mr-4 ml-4" @click="os_excluir()"><i class="far fa-trash-alt ml-2 mr-2"></i></b-button>




                <span class="float-right">
                    <b-button size="sm" variant="default" v-b-tooltip.hover title="Voltar para Lista" class="float-right" @click="backToList()"><i class="far fa-list-alt ml-2 mr-2"></i></b-button>
                </span>

                
            </Widget>
            </b-overlay>
        </div>
    </div>
    <!-- BOTOES - FIM -->

</div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
export default {
    // name: 'MaterialBusca',
    components: { Widget },
    data() {
        return {
            processando: false,
            registry: { fk_orcamento:   {}, 
                        fk_status:      { fk_usuario: { name: null } } 
            },

            canUpdate: true,
            canSave: true,
            disableBTNDownload: false,

            tecnicos: [],
            tecnico: null,
            aux_tecnicos: [],
            aux_tecnico: null,

            data_inicio_prev_digit: null, 
            data_inicio_show: null,
            data_fim_prev_digit: null, 
            data_fim_show: null,
        }
    },
    methods: {

        textStatus(){
            if(this.registry.status=='D') {
                return 'Em Digitação'
            } else if(this.registry.status=='L') {
                return 'Liberada'
            } else if(this.registry.status=='E') {
                return 'Em Execução'
            } else if(this.registry.status=='C') {
                return 'Cancelada'
            } else if(this.registry.status=='F') {
                return 'Finalizada'
            } else {
                return 'Erro: '+this.registry.status
            }
        },

        colorStatus(){
            if(this.registry.status=='D') {
                return 'secondary'
            } else if(this.registry.status=='L') {
                return 'info'
            } else if(this.registry.status=='E') {
                return 'success'
            } else if(this.registry.status=='C') {
                return 'danger'
            } else if(this.registry.status=='F') {
                return 'dark'
            } else {
                return 'danger'
            }
        },

        colorStatusStatus(status){
            if(status=='D'){
                return '<i class="fas fa-circle text-secondary"></i>'
            } else if(status=='V'){
                return '<i class="fas fa-circle text-info"></i>'
            } else if(status=='E'){
                return '<i class="fas fa-circle text-warning"></i>'
            } else if(status=='A'){
                return '<i class="fas fa-circle text-success"></i>'
            } else if(status=='R'){
                return '<i class="fas fa-circle text-danger"></i>'
            } else if(status=='F'){
                return '<i class="fas fa-circle text-dark"></i>'
            } else {
                return '<i class="fas fa-circle text-danger"></i>'
            }
        },

        getData(){

            this.processando = true;
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API + "/api/ordemservico/"+this.$route.params.uuid,
            })
            .then((result) => {
                this.processando = false;
                this.registry = result.data;

                this.data_inicio_prev_digit = this.registry.data_inicio_prev
                this.data_inicio_show = this.dataHoraBR(this.registry.data_inicio_real)
                this.data_fim_prev_digit = this.registry.data_fim_prev
                this.data_fim_show = this.dataHoraBR(this.registry.data_fim_real)
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.processando = false;
                this.showMessage('Erro na conexão [OrdemServico]. Acione o suporte.', 'danger');
                this.erroConexao(error);
            });

        },

        getTecnicos(){

            this.tecnicos = [
                { id: 1, nome: "Luiz" },
                { id: 2, nome: "Pedro" },
                { id: 3, nome: "Joaquim" },
            ]

        },

        getAuxTecnicos(){

            this.aux_tecnicos = [
                { id: 1, nome: "Manoel" },
                { id: 2, nome: "João" },
                { id: 3, nome: "Paulo" },
                { id: 4, nome: "Ricardo" },
            ]

        },


        os_finalizar(){

            var mensagem = "Deseja realmente finalizar a digitação da Ordem de Serviço?"
            if(confirm(mensagem)){

                this.processando = true
                setTimeout(() => {  
                    this.registry.status = "L"
                    this.processando = false
                }, 1000);

            }

        },

        os_excluir(){
            var mensagem = "Deseja realmente EXCLUIR esta Ordem de Serviço?\n\nOs dados serão perdidos."
            if(confirm(mensagem)){

                this.processando = true

                this.$http({
                    method: 'delete',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/ordemservico",
                    data: this.registry
                })
                .then(() => {
                    this.processando = false;
                    this.backToList()
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.processando = false;
                    this.showMessage('Erro na conexão[OrdemServiço-Delete]. Acione o suporte.', 'danger');
                    this.erroConexao(error);
                });

            }
        },

        backToList(){
            this.$router.push({ name: 'OrdemServicoListaPage'})
        },
    },
    computed: {
        btnFinalizarDisabled(){
            if(!this.canUpdate){ return true }
            if(this.registry.status!='D'){ return true }

            if(!this.tecnico){ return true }
            if(!this.aux_tecnico){ return true }
            
            return false
        }
    },
    watch:{
        'data_inicio_prev_digit'(newVal){
            this.registry.data_inicio_prev = newVal==""?null:newVal.split("-").reverse().join("/")
        },
        'data_fim_prev_digit'(newVal){
            this.registry.data_fim_prev = newVal==""?null:newVal.split("-").reverse().join("/")
        },
    },
    created(){
        this.$store.commit('setNomePagina', '<i class="fas fa-file-invoice"></i>&nbsp;Ordem de Serviço&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="far fa-file-alt"></i>&nbsp;Detalhes da Ordem de Serviço')

        this.getData()
        this.getTecnicos()
        this.getAuxTecnicos()
    }
};
</script>