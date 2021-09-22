<template>
<div>
    <b-alert show variant="warning"><i class="fas fa-exclamation-triangle"></i> Em Validação.</b-alert>

    <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
    <div class="row d-flex justify-content-between mt-0 mb-4 ml-1 mr-1">

        <div style="width: 10rem;">
            <b-card bg-variant="info" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
                <b-card-text>
                    <span style="font-size:85%;"><i class="fas fa-hashtag"></i></span><br>
                    <span class="p-0 mt-0" style="font-size:170%;">{{registry.id}}</span>
                </b-card-text>
            </b-card>
        </div>

        <div style="width: 12rem;">
            <b-card :bg-variant="colorStatus" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
                <b-card-text>
                    <span style="font-size:85%;"><i class="fas fa-tag"></i> Status</span><br>
                    <span class="p-0 mt-0" style="font-size:170%;">{{txtStatus}}</span>
                </b-card-text>
            </b-card>
        </div>

    </div>
    </b-overlay>

    <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
    <b-tabs card active-nav-item-class="bg-primary text-white">
        <!-- INFORMACOES - INICIO -->
        <b-tab active>
            <template v-slot:title><i class="fas fa-info-circle"></i> Informações</template>
            <div class="row">
                <div class="col">
                    <b-form-group
                        id="grp-nome"
                        label="Nome"
                        label-for="nome"
                        :state="stateNome"
                    >
                        <b-form-input 
                            id="nome" 
                            ref="focusNome"
                            v-model="registry.nome" 
                            :state="stateNome"
                            trim
                        ></b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row">
                <div class="col col-3">
                    <!-- :state="stateValor" -->
                    <b-form-group
                        id="grp-valor"
                        label="Valor Venda"
                        label-for="valor"
                        
                    >
                        <!-- :state="stateValor" -->
                        <b-form-input 
                            id="valor" 
                            ref=""
                            v-model="registry.valor" 
                            
                            trim
                        ></b-form-input>
                    </b-form-group>
                </div>
                <div class="col col-3"></div>
                <div class="col col-3">
                    <b-form-group
                        id="grp-ncm"
                        label="N.C.M."
                        label-for="ncm"
                    >
                        <b-form-input 
                            id="ncm" 
                            ref=""
                            v-model="registry.ncm" 
                            trim
                        ></b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <b-form-group
                        id="grp-descricao"
                        label="Descrição"
                        label-for="descricao"
                    >
                        <b-form-textarea
                            id="descricao"
                            v-model="registry.descricao"
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                </div>
            </div>
            
            
        </b-tab>
        <!-- INFORMACOES - FIM -->

        <b-tab>
            <template v-slot:title><i class="fas fa-boxes"></i> Estoque</template>
            <div class="row">
                <div class="col col-3">
                    <b-form-group
                        id="grp-est"
                        label="Estoque Atual"
                        label-for="qtd_estoque"
                        
                    >
                        <b-form-input 
                            id="qtd_estoque" 
                            ref=""
                            v-model="registry.qtd_estoque" 
                            disabled
                        ></b-form-input>
                    </b-form-group>
                </div>
                <div class="col col-3"></div>
                <div class="col col-3">
                    <b-form-group
                        id="grp-estm"
                        label="Estoque Mínimo"
                        label-for="qtd_estoque_min"
                    >
                        <b-form-input 
                            id="qtd_estoque_min" 
                            ref=""
                            v-model="registry.qtd_estoque_min" 
                            trim
                        ></b-form-input>
                    </b-form-group>
                </div>
            </div>
        </b-tab>

        <!-- MOVIMENTACOES - INICIO -->
        <b-tab>
            <template v-slot:title>
                <div @click="getMovimentacoes()"><i class="fas fa-list"></i> Movimentações</div>
            </template>
            <b-overlay variant="white" spinner-variant="primary" :show="processandomovimentacoes" rounded="sm" style="width:100%">

            <div class="table-responsive mt-4">
                <table class="table table-striped table-lg mb-0 requests-table">
                    <thead>
                    <tr>
                        <th class="text-center">Data/Hora</th>
                        <th class="text-center">Tipo</th>
                        <th class="text-right">Valor</th>
                        <th class="text-right">Qtd Movto</th>
                        <th class="text-right">Estoque</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(movimentacao) in movimentacoes.data" :key="movimentacao.id"
                    >
                        <td class="text-center">{{dataHoraBR(movimentacao.created_at)}}</td>
                        <td class="text-center">{{(movimentacao.tipo)}}</td>
                        <td class="text-right">{{numeroBR(movimentacao.valor)}}</td>
                        <td class="text-right">{{movimentacao.qtd}}</td>
                        <td class="text-right">{{movimentacao.qtd_estoque}}</td>
                    </tr>
                    </tbody>
                </table>
                <hr>
            </div>
            <!-- <pagination :data="movimentacoes" @pagination-change-page="get" class="in-line"></pagination> -->
            <div v-if="movimentacoes.current_page>0">
                <pagination :data="movimentacoes" @pagination-change-page="getMovimentacoes"></pagination>
            </div>


            </b-overlay>
        </b-tab>
        <!-- MOVIMENTACOES - FIM -->
    </b-tabs>
    </b-overlay>

    <div class="row mt-4">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget
                style="width:100%"
            >
                <table style="width:100%">
                    <tr>
                        <td>
                             <b-button :disabled="disableBtnSaveRegistry" size="sm" variant="primary" v-b-tooltip.hover title="Salvar dados" @click="processRegistry()">
                                <i class="fas fa-save ml-2 mr-2"></i>
                            </b-button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span v-if="registry.status=='A'">
                                <b-button size="sm" variant="warning" v-b-tooltip.hover title="Inativar" class="mr-4 ml-4" @click="inativar()">
                                    <i class="fas fa-ban ml-2 mr-2"></i>
                                </b-button>
                            </span>
                            <span v-else>
                                <b-button size="sm" variant="success" v-b-tooltip.hover title="Ativar" class="mr-4 ml-4" @click="ativar()">
                                    <i class="fas fa-ban ml-2 mr-2"></i>
                                </b-button>
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <b-button size="sm" variant="danger" v-b-tooltip.hover title="Excluir" @click="excluir()" class="ml-2">
                                <i class="fas fa-trash-alt ml-2 mr-2"></i>
                            </b-button>
                        </td>
                        <td class="text-right">
                            <b-button v-b-tooltip.hover title="Voltar Lista Equipamentos" variant="default" size="sm" class="mr-2" @click="backToList()"><i class="far fa-list-alt ml-2 mr-2"></i></b-button>
                        </td>
                    </tr>
                </table>

            </Widget>
            </b-overlay>
        </div>
    </div>

</div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
export default {
    name: 'NomePagina',
    components: { Widget },
    data() {
        return {
            //// Privilegios
            canAdd: false,
            canUpdate: false,
            canGet: false,
            ////
            processando: false,
            processandomovimentacoes: false,
            registry: { nome: ""},
            // registers: {data: [] },
            movimentacoes: {data: []},
        }
    },
    methods: {
        getRegistry(){
            this.processando = true            
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API+'/api/cad/equipamentos/' + this.$route.params.uuid,
            })
            .then(result => {
                // eslint-disable-next-line
                // console.log(result.data)

                this.processando = false
                this.registry = result.data
            })
            .catch( error => {
                // eslint-disable-next-line
                console.log(error)
                this.processando = false
                this.erroConexao(error)
            })
            
        },
        getMovimentacoes(page = 1){
            this.processandomovimentacoes = true            
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API+'/api/estoque/movtoequipamento/' + this.$route.params.uuid+'?page='+page,
            })
            .then(result => {
                // eslint-disable-next-line
                // console.log(result.data)
                this.processandomovimentacoes = false
                this.movimentacoes = result.data
            })
            .catch( error => {
                // eslint-disable-next-line
                console.log(error)
                this.processandomovimentacoes = false
                this.erroConexao(error)
            })
        },

        processRegistry(){

            if(isNaN(this.registry.valor)){
                alert("Digite um valor válido (numero).")
                return
            }
            if(this.registry.valor==null || this.registry.valor=="" || this.registry.valor<=0){
                alert("Digite um valor válido.")
                return
            }

            this.processando = true
            
            this.$http({
                method: 'patch',
                url: process.env.VUE_APP_URL_BASE_API + "/api/cad/equipamentos",
                data: this.registry
            })
            .then( () => {
                this.processando = false
                // this.registers.push(result.data)
                this.showMessage('Registro alterado com sucesso.')
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error)
                this.processando = false
                this.erroConexao(error)
            })

        },

        excluir(){
            var mensagem = "Deseja realmente Excluir este registro?\n\nEsta operação não pode ser desfeita.\nAs informações relacionados a este equipamento serão perdidas."
            if(confirm(mensagem)){
                this.processando = true
                this.$http({
                    method: 'delete',
                    url: process.env.VUE_APP_URL_BASE_API+'/api/cad/equipamentos',
                    data: { uuid: this.registry.uuid }
                })
                .then( () => {
                    this.processando = false
                    this.backToList()
                    // this.registry.status = "I"
                    
                    // eslint-disable-next-line
                    // console.log(result)
                    // this.registry.fk_endereco.push(result)
                    // this.showMessage('Registro alterado com sucesso.')
                    // this.$bvModal.hide("mRegistry")
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error)
                    this.processando = false
                    this.erroConexao(error)
                })
            }
        },

        inativar(){
            var mensagem = "Deseja realmente INATIVAR este registro?\n\n"
            if(confirm(mensagem)){
                this.processando = true
                this.$http({
                    method: 'patch',
                    url: process.env.VUE_APP_URL_BASE_API+'/api/cad/equipamentos/inativar',
                    data: { uuid: this.registry.uuid }
                })
                .then( () => {
                    this.processando = false
                    this.registry.status = "I"
                    
                    // eslint-disable-next-line
                    // console.log(result)
                    // this.registry.fk_endereco.push(result)
                    this.showMessage('Registro alterado com sucesso.')
                    // this.$bvModal.hide("mRegistry")
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error)
                    this.processando = false
                    this.erroConexao(error)
                })
            }
        },

        ativar(){
            var mensagem = "Deseja ATIVAR o registro?\n\n"
            if(confirm(mensagem)){
                this.processando = true
                this.$http({
                    method: 'patch',
                    url: process.env.VUE_APP_URL_BASE_API+'/api/cad/equipamentos/ativar',
                    data: { uuid: this.registry.uuid }
                })
                .then( () => {
                    this.processando = false
                    this.registry.status = "A"
                    
                    // eslint-disable-next-line
                    // console.log(result)
                    // this.registry.fk_endereco.push(result)
                    this.showMessage('Registro alterado com sucesso.')
                    // this.$bvModal.hide("mRegistry")
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error)
                    this.processando = false
                    this.erroConexao(error)
                })
            }
        },


        backToList(){
            this.$router.push({ name: 'CadastroEquipamentosPage'})
        },
    },
    computed: {
        txtStatus(){
            return this.registry.status=='A'?'Ativo':'Inativo'
        },
        colorStatus(){
            return this.registry.status=='A'?'success':'warning'
        },
        stateNome() {
            return this.registry.nome.length >= 4
        },
        disableBtnSaveRegistry(){
            if(!this.stateNome){
                return true
            }
            return false
        },
    },
    created(){
        //Validando permissao e secao
        // this.$store.commit('setNomePagina', '<i class="fas fa-search-plus"></i>&nbsp;Consultas&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-boxes"></i>&nbsp;Buscar Material')
        this.$store.commit('setNomePagina', '<i class="fas fa-cogs"></i>&nbsp;Cadastros&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-truck"></i>&nbsp;Equipamento - Informações')
        // this.canAdd = this.usuarioTemPermissao('privilegio_para_add')
        // this.canUpdate = this.usuarioTemPermissao('privilegio_para_update')
        // this.canGet = this.usuarioTemPermissao('privilegio_para_get')

        this.getRegistry()

    }
};
</script>