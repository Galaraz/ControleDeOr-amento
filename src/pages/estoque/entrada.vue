<template>
<div>
<!-- <b-alert show variant="warning"><i class="fas fa-exclamation-triangle"></i> Em Validação.</b-alert> -->
    <div class="row">
        <div class="col col-6">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <!-- <Widget
                title="<h5>&nbsp;&nbsp;<i class='fas fa-file-import text-primary'></i>&nbsp;&nbsp;Dados Entrada</h5>"
                customHeader
            >
                
                <div class="row mt-3">
                    <div class="col col-6">
                        <b-form-group
                            id="grp-1"
                            label="Ordem Compra"
                            label-for="id_oc"
                        >
                            <b-form-input 
                                id="id_oc" 
                                ref="focusOC"
                                v-model="id_oc" 
                                number
                            ></b-form-input>
                            <b-tooltip target="id_oc" placement="right" title="Número de Ordem de Compra (se existir)."></b-tooltip>
                        </b-form-group>
                    </div>
                    <div class="col col-6">
                        <b-form-group
                            id="grp-2"
                            label="Nota Fiscal"
                            label-for="nf_forn"
                        >
                            <b-form-input 
                                v-model="nf_forn" 
                                id="nf_forn"
                                number
                            ></b-form-input>
                        </b-form-group>
                    </div>
                </div>
            </Widget> -->

            <Widget
                title="<h5>&nbsp;&nbsp;<i class='fas fa-boxes text-primary'></i>&nbsp;&nbsp;Dados do Equipamento</h5>"
                customHeader
            >
                <div class="row mt-3">
                    <div class="col">
                        <b-form-group
                            id="grp-3"
                            label="Material"
                            label-for="id_material"
                        >
                            <div class="d-flex flex-row">
                                <b-input-group style="width:180px">
                                    <b-form-input 
                                        v-model="material.id" 
                                        id="id_material"
                                        number
                                        ref="focusID"
                                        @blur="materialBuscar()"
                                        autofocus
                                    ></b-form-input>
                                    <b-input-group-append>
                                    <b-button id="btnMaterialBuscar" variant="gray" @click="materialModal()"><i class="fas fa-search"></i></b-button>
                                    </b-input-group-append>
                                </b-input-group>
                                
                                <!-- style="width:400px" -->
                                <b-form-input 
                                    v-model="material.nome" 
                                    id="nome"
                                    disabled
                                    number
                                ></b-form-input>
                                <b-tooltip target="id_material" placement="topright" title="Código do material."></b-tooltip>
                                <b-tooltip target="btnMaterialBuscar" placement="topright" title="Clique para buscar material. Deixe o código em branco para busca por nome."></b-tooltip>
                            </div>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-3">
                        <b-form-group
                            id="grp-20"
                            label="Qtd"
                            label-for="qtd_material"
                        >
                            <b-form-input 
                                id="qtd_material" 
                                ref="focusQtd"
                                v-model="material.qtd" 
                                number
                            ></b-form-input>
                            <!-- <b-tooltip target="id_oc" placement="right" title="Número de Ordem de Compra (se existir)."></b-tooltip> -->
                        </b-form-group>
                    </div>
                    <div class="col col-3"></div>
                    <div class="col col-4">
                        <b-form-group
                            id="grp-21"
                            label="Valor Unit de Compra"
                            label-for="vlr_material"
                        >
                            <b-form-input 
                                v-model="material.valor_compra" 
                                id="vlr_material"
                                ref="focusValor"
                                number
                            ></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-center">
                        <b-button style="width: 10rem;" size="lg" variant="primary" v-b-tooltip.hover title="Salvar Entrada do Equipamento" @click="materialEntrada()"><i class="fas fa-save "></i></b-button>
                    </div>
                </div>


            </Widget>
            </b-overlay>
        </div>


        <div class="col col-6">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget
                title="<h5>&nbsp;&nbsp;<i class='fas fa-list-ol text-primary'></i>&nbsp;&nbsp;Entradas Efetuadas</h5>"
                customHeader
                bodyClass="p-0"
            >
                <div class="table-resposive mt-4">
                    <table class="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th colspan="2">Equipamento</th>
                            <th class="text-right" style="width:70px">Qtd</th>
                            <th class="text-right" style="width:100px">Unit</th>
                            <th class="text-right" style="width:100px">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(row, index) in materiais_entrada" :key="'id'+ index">
                            <td class="text-right">{{row.id}}</td>
                            <td>{{row.nome}}</td>
                            <td class="text-right">{{row.qtd}}</td>
                            <td class="text-right">{{numeroBR(row.valor_compra)}}</td>
                            <td class="text-right">{{numeroBR(row.valor_compra * row.qtd)}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Widget>
            </b-overlay>
        </div>
    </div>

    


<b-modal 
    id="mMaterial"
    size="xl"
    title="Buscar Material"
    button-size="sm"
    body-bg-variant="white"
    content-class="shadow"
    @shown="focusMaterialPesquisa"
>
    <b-overlay variant="white" spinner-variant="primary" :show="processando2" rounded="sm" style="width:100%">
    <b-row>
        <b-col cols="8">
            <b-form-group
                id="fieldset-horizontal"
                label="Descrição"
                label-for="descricao"
                label-cols-sm="3"
                label-cols-lg="2"
                content-cols-sm
                content-cols-lg="5"
            >
            <div class="d-flex flex-row">

                <b-input-group style="width:500px">
                    <b-form-input 
                        v-model="descricao" 
                        id="descricao"
                        ref="focusMaterialPesquisa"
                    ></b-form-input>
                    <b-input-group-append>
                    <b-button id="btnMaterialBuscar" variant="primary" @click="getMateriais()"><i class="fas fa-search"></i> Buscar</b-button>
                    </b-input-group-append>
                </b-input-group>

                
                <b-tooltip target="descricao" placement="topright" title="Descrição do equipamento a ser pesquisado."></b-tooltip>
            </div>
            </b-form-group>
        </b-col>
        <b-col>
            
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th class="text-right" width="100px">Código</th>
                    <th >Descrição</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row, index) in materiais" :key="row.id" @click="materialSelecionarLista(index)">
                    <td class="text-right">{{row.id}}</td>
                    <td>{{row.nome}}</td>
                </tr>
                </tbody>
            </table>
        </b-col>
    </b-row>
    </b-overlay>

    <template v-slot:modal-footer="{ cancel }">

        <b-button size="sm" variant="warning" v-b-tooltip.hover title="Fechar" @click="cancel()">
            <i class="fas fa-times ml-2 mr-2"></i>
        </b-button>
        <!-- &nbsp;&nbsp;&nbsp;
        <b-button size="sm" variant="primary" v-b-tooltip.hover title="Salvar dados" @click="saveLocal()">
            <i class="fas fa-save ml-2 mr-2"></i>
        </b-button> -->
    </template>
</b-modal>



    </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
export default {
    name: 'MovEntradaManual',
    components: { Widget },
    data() {
        return {
            processando: false,
            processando0: false,
            processando1: false,
            processando2: false,
            registers: [],
            id_entrada: null,
            id_oc: null,
            nf_forn: null,
            nf_forn_serie: null,
            descricao: null,
            qtd_itens: 0,
            valor: 0,
            locais: [],
            id_local: null,
            material: [],
            // descricao: null,
            materiais: [],
            materiais_entrada: [],
        }
    },
    methods: {

        getMaterial(){
            this.processando = true
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API + '/api/cad/equipamentos/' + this.material.id,
            })
            .then(result => {
                // eslint-disable-next-line
                // console.log(result.data)
                this.processando = false
                // this.registry = result.data
                // this.material.nome = result.data.nome
                this.material = result.data
                this.material.valor_compra = ""
                // this.material.valor = result.data.vlr_custo
                this.$refs.focusQtd.$el.focus()

            })
            .catch( (error) => {
                // eslint-disable-next-line
                // console.log(error)
                this.processando = false
                if (error.response) {
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    if (error.response.status === 400) {
                        this.$bvToast.toast('[Erro] '+error.response.data.message, {
                            title: 'Erro',
                            autoHideDelay: 20000,
                            variant: 'danger',
                            toaster: 'b-toaster-top-center'
                        })
                    } else if (error.response.status === 402) {
                        this.material.nome = this.material.id+' - Não encontrado'
                        this.material.qtd = null
                        this.material.valor = null
                        this.$refs.focusID.$el.focus()
                        this.$bvToast.toast('Equipamento '+this.material.id+' não encontrado', {
                            title: 'Erro',
                            autoHideDelay: 20000,
                            variant: 'danger',
                            toaster: 'b-toaster-top-center'
                        })
                        this.material.id = null
                    }
                } else {
                    this.$bvToast.toast('Erro no processamento. Acione o suporte.', {
                        title: 'Erro',
                        autoHideDelay: 20000,
                        variant: 'danger',
                        toaster: 'b-toaster-top-center'
                    })
                }

            })
        },

        getMateriais(){
            if(this.descricao==null){
                alert("Digite uma descricao.")
                return
            }
            if(this.descricao.length<=2){
                alert("Digite uma descricao válida.")
                return
            }
            this.processando2 = true
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API + "/api/cad/equipamentos/nome/" + this.descricao,
            })
            .then(result => {
                this.processando2 = false
                this.materiais = result.data
                // console.log(result)
                // this.getModelos()
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error)
                this.processando2 = false
                this.showMessage('Erro na conexão. Acione o suporte.', 'danger')
                this.erroConexao(error)
            })
        },

        materialBuscar(){
            if(this.material.id!=null && this.material.id!=""){
                this.getMaterial()
            }
        },

        materialModal(){
            // console.log('materialModal')
            // if(isNaN(this.material.id)){
            //     alert("Digite um código válido.")
            //     return
            // }
            if(this.material.id!=null && this.material.id!=""){
                this.getMaterial()
            } else {
                this.$bvModal.show("mMaterial")
            }
        },
        focusMaterialPesquisa() {
            this.$refs.focusMaterialPesquisa.focus()
        },

        materialEntrada(){
            if(this.material.id==null){
                alert("Favor digite o código do equipamento.")
                this.$refs.focusID.$el.focus()
                return
            }
            if(isNaN(this.material.id)){
                alert("Digite um código válido.")
                return
            }
            if(isNaN(this.material.qtd)){
                alert("Digite uma quantidade válida.")
                return
            }
            if(this.material.qtd==null){
                alert("Favor digite a quantidade do equipamento.")
                this.$refs.focusQtd.$el.focus()
                return
            }
            if(this.material.valor_compra==null || this.material.valor_compra=="0.00"){
                alert("Favor digite o valor do equipamento.")
                this.focusValor()
                return
            }
            if(isNaN(this.material.valor_compra)){
                alert("Digite um valor válido.")
                return
            }

            this.processando = true

            var bodyFormData = new FormData();
            // bodyFormData.append("descricao", this.descricao);
            bodyFormData.append("uuid_material", this.material.uuid);
            bodyFormData.append("qtd_material", this.material.qtd);
            bodyFormData.append("vlr_material", this.material.valor_compra);

            // bodyFormData.append("id_oc", this.id_oc);
            // bodyFormData.append("nf_forn", this.nf_forn);

            // setTimeout(() => {  
            //     this.processando = false
            //     // console.log(this.material)
            //     this.materiais_entrada.splice(0, 0, this.material)
            //     // this.materiais_entrada.push(this.material)
            //     // alert("splice feito")
            //     // console.log(this.materiais_entrada);
            //     this.material = {}
            //     this.focusID()
            // }, 1000);


            this.$http({
                method: 'post',
                url: process.env.VUE_APP_URL_BASE_API + "/api/estoque/entrada",
                data: bodyFormData
            })
            .then(() => {
                this.processando = false;
                this.materiais_entrada.splice(0, 0, this.material)
                this.material = {}
                this.focusID()
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.processando = false;
                this.showMessage('Erro na conexão[Estoque]. Acione o suporte.', 'danger');
                this.erroConexao(error);
            });



            
            // this.$http({
            //     method: 'post',
            //     url: 'api/inv/estoque/entradamanual',
            //     data: bodyFormData
            // })
            // .then(result => {
            //     // eslint-disable-next-line
            //     // console.log(result.data)
            //     this.processando1 = false
            //     // this.registry = result.data
            //     // this.material.nome = result.data.nome
            //     // this.material.valor = result.data.vlr_custo

            //     this.id_entrada = result.data
            //     var registry = { 
            //         id_material: this.material.id,
            //         nome: this.material.nome,
            //         qtd: this.material.qtd,
            //         unit: this.material.valor,
            //         total: this.material.qtd * this.material.valor
            //     }
            //     this.registers.splice( 0, 0, registry );
            //     this.qtd_itens = this.registers.length
            //     this.valor = this.valor + (this.material.qtd * this.material.valor)

            //     this.material = []

            // })
            // .catch( (error) => {
            //     // eslint-disable-next-line
            //     // console.log(error)
            //     this.processando1 = false
            //     if (error.response) {
            //         console.log(error.response.data);
            //         console.log(error.response.status);
            //         // console.log(error.response.headers);
            //         if (error.response.status === 400) {
            //             this.$bvToast.toast('[Erro] '+error.response.data.message, {
            //                 title: 'Erro',
            //                 autoHideDelay: 20000,
            //                 variant: 'danger',
            //                 toaster: 'b-toaster-top-center'
            //             })
            //         } else if (error.response.status === 402) {
            //             this.material.nome = this.material.id+' - Não encontrado'
            //             this.material.qtd = null
            //             this.material.valor = null
            //             this.$bvToast.toast('Equipamento não encontrado', {
            //                 title: 'Erro',
            //                 autoHideDelay: 20000,
            //                 variant: 'danger',
            //                 toaster: 'b-toaster-top-center'
            //             })
            //         } else {
            //             this.$bvToast.toast( error.response.data.message, {
            //                 title: 'Erro inexperado',
            //                 autoHideDelay: 20000,
            //                 variant: 'danger',
            //                 toaster: 'b-toaster-top-center'
            //             })
            //         }
            //     } else {
            //         this.$bvToast.toast('Erro no processamento. Acione o suporte.', {
            //             title: 'Erro',
            //             autoHideDelay: 20000,
            //             variant: 'danger',
            //             toaster: 'b-toaster-top-center'
            //         })
            //     }

            // })  
        },

        focusID(){
            this.$refs.focusID.$el.focus()
        },
        focusQtd(){
            this.$refs.focusQtd.$el.focus()
        },
        focusValor(){
            this.$refs.focusValor.$el.focus()
        },

        materialSelecionarLista(index){
            this.$bvModal.hide("mMaterial")
            this.material = this.materiais[index]
            this.focusQtd()
        },

        // formatNumber(value) {
        //     if(value==null){ return "0,00" }
        //     let val = (value/1).toFixed(2).replace('.', ',')
        //     return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        // },


    },
    computed: {
    },
    created(){
        this.$store.commit('setNomePagina', '<i class="fas fa-barcode"></i>&nbsp;Estoque&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-sign-in-alt"></i>&nbsp;Entrada de Equipamento no Estoque')
        if(! (this.$store.state.user.type=='A' || this.$store.state.user.type=='S')) {
            this.$router.push({ name: 'SemPermissao'}); 
        }
    }
};
</script>