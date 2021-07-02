<template>
    <div>
        <b-row class="d-flex justify-content-between m-0">
            <div style="width: 10rem;">
                <b-card bg-variant="info" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
                    <b-card-text>
                        <span style="font-size:85%;"><i class="fas fa-hashtag"></i></span><br>
                        <span class="p-0 mt-0" style="font-size:170%;">{{registry.id}}</span>
                    </b-card-text>
                </b-card>
            </div>

            <div style="width: 44rem;" class="ml-4 mb-0 p-0">
                <b-row>
                    <b-col sm="2" class="text-right">
                        <label for="textarea-default">Nome:</label>
                    </b-col>
                    <b-col sm="20">
                        <b-form-input 
                            v-model="registry.name" 
                            id="name"
                            style="width: 35rem;"
                            maxlength="200"
                        ></b-form-input>
                    </b-col>
                </b-row>
            </div>
            <div style="width: 12rem;">
                <b-card :bg-variant="colorStatus" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
                    <b-card-text>
                        <span style="font-size:85%;"><i class="fas fa-tag"></i> Status</span><br>
                        <span class="p-0 mt-0" style="font-size:170%;">{{txtStatus}}</span>
                    </b-card-text>
                </b-card>
            </div>
        </b-row>

        <b-row class="mt-2 mb-4">
            <b-col>
                <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
                <b-tabs card active-nav-item-class="bg-primary text-white">

                    <!-- INFORMACOES - INICIO -->
                    <b-tab active>
                        <template v-slot:title><i class="fas fa-info-circle"></i> Informações</template>
                        <div class="row">
                            <div class="col col-6">
                                <b-form-group
                                    id="group-empresa"
                                    label="Empresa"
                                    label-for="empresa"
                                >
                                    <b-form-input 
                                        v-model="registry.fk_empresa.nome" 
                                        id="empresa"
                                        class="w-75"
                                        maxlength="100"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col col-6">
                                <b-form-group
                                    id="group-type"
                                    label="Tipo de usuário"
                                    label-for="type"
                                >
                                <!--  -->
                                    <v-select
                                        v-model="type"
                                        :options="opt_type"
                                        value-field="id"
                                        inputId="id"
                                        label="nome"
                                        name="type"
                                        id="type"
                                        style="width:300px"
                                    ></v-select>
                                </b-form-group>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col col-10">
                                <b-form-group
                                    id="group-fullname"
                                    label="Nome Completo"
                                    label-for="full_name"
                                >
                                    <b-form-input 
                                        v-model="registry.full_name" 
                                        id="full_name"
                                        class="w-75"
                                        maxlength="200"
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col col-10">
                                <b-form-group
                                    id="group-email"
                                    label="E-mail"
                                    label-for="email"
                                >
                                <!-- style="width:150px" -->
                                    <b-form-input 
                                        v-model="registry.email" 
                                        id="email"
                                        class="w-75"
                                        maxlength="200"
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col col-4">
                                <b-form-group
                                    id="group-expiration_date"
                                    label="Expiração Senha"
                                    label-for="expiration_date"
                                >
                                    <b-form-input 
                                        v-model="expiration_date" 
                                        id="expiration_date"
                                        class="w-75"
                                        maxlength="80"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                                
                        </div>

                        <div class="row">
                            <div class="col col-4">
                                <b-form-group
                                    id="group-last_login"
                                    label="Último Login"
                                    label-for="last_login"
                                >
                                    <b-form-input 
                                        v-model="last_login" 
                                        id="last_login"
                                        class="w-75"
                                        maxlength="200"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                            </div> 
                            <div class="col col-4">
                                <b-form-group
                                    id="group-last_login_ip"
                                    label="IP"
                                    label-for="last_login_ip"
                                >
                                    <b-form-input 
                                        v-model="registry.last_login_ip" 
                                        id="last_login_ip"
                                        class="w-75"
                                        maxlength="200"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                            </div> 
                        </div>
                        
                    </b-tab>
                    <!-- INFORMACOES - FIM -->



                    <!-- Grupos - INICIO -->
                    <b-tab>
                        <template v-slot:title>
                            <!-- <div @click="alerta()"> -->
                            <i class="fas fa-users"></i> Grupos
                            <!-- </div> -->
                        </template>
                        <b-overlay variant="white" spinner-variant="primary" :show="processandoDraggable" rounded="sm" style="width:100%">
                        <b-row>
                            <b-col class="w-50">
                                <div style="height: 500px; overflow-y: scroll;">
                                <b-card
                                    border-variant="secondary"
                                    header="Sem acesso"
                                    header-border-variant="secondary"
                                    header-class="text-center"
                                    body-class="p-0"
                                >
                                <!-- :move="onMoveOff"  -->
                                <!-- @change="removePrivilege" -->
                                    <draggable 
                                        class="list-group" 
                                        tag="ul" 
                                        v-model="registersOff" 
                                        v-bind="dragOptions" 
                                        
                                        @start="isDragging=true" 
                                        @end="isDragging=false"
                                    >
                                        <transition-group type="transition" :nome="'flip-list'">
                                            <b-list-group v-for="(element) in registersOff" :key="element.order">
                                                <!-- @dblclick="addDraggable(index)" -->
                                            <b-list-group-item>{{element.nome}}</b-list-group-item>
                                            </b-list-group>
                                        </transition-group>
                                    </draggable>
                                </b-card>
                                </div>
                            </b-col>
                            <b-col class="w-50">
                                <div>
                                <b-card
                                    border-variant="success"
                                    header="COM acesso"
                                    header-border-variant="success"
                                    header-bg-variant="success"
                                    header-class="text-center text-white"
                                    body-class="p-0"
                                >
                                <!-- :move="onMoveOn" -->
                                    <draggable 
                                        element="span" 
                                        v-model="registersOn" 
                                        v-bind="dragOptions" 
                                        @change="changeDraggable"
                                    >
                                    <!-- @dblclick="addPrivilege(element.id)" -->
                                        <transition-group nome="no" class="list-group" tag="ul">
                                            <b-list-group v-for="(element) in registersOn" :key="element.order">
                                                <!-- @dblclick="removeDraggable(index)" -->
                                            <b-list-group-item >{{element.nome}}</b-list-group-item>
                                            </b-list-group>
                                        </transition-group>
                                    </draggable>
                                </b-card>
                                </div>
                            </b-col>
                        </b-row>
                        </b-overlay>

                    </b-tab>
                    <!-- Grupos - FIM -->

                    <!-- LOG - INICIO -->
                    <b-tab>
                        <template v-slot:title>
                            <div @click="getTransacoes()">
                            <i class="fas fa-list"></i> Log das Ações
                            </div>
                        </template>
                        <b-overlay variant="white" spinner-variant="primary" :show="processandoTransacoes" rounded="sm" style="width:100%">

                            <div class="table-responsive mt-4">
                            <table class="table table-striped table-lg mb-0 requests-table">
                                <thead>
                                <tr class="text-white">
                                    <th class="text-center" style="width:160px">Data/Hora</th>
                                    <th class="text-center" style="width:200px">Ação</th>
                                    <th>Sistema</th>
                                    <th>Módulo</th>
                                    <th>Tabela</th>
                                    <th class="text-center" style="width:100px">Registro</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="(transacao) in transacoes.data" :key="transacao.id"
                                >
                                    <td class="text-center">{{(transacao.data)}}</td>
                                    <td class="text-center">{{logAcaoTexto(transacao.acao)}}</td>
                                    <td>{{transacao.sistema}}</td>
                                    <td>{{transacao.modulo}}</td>
                                    <td>{{transacao.tabela}}</td>
                                    <td class="text-right">{{transacao.id_registro}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <hr>
                            </div>
                            <!-- <pagination :data="transacoes" @pagination-change-page="get" class="in-line"></pagination> -->
                            <div v-if="transacoes.current_page>0">
                                <pagination :data="transacoes" @pagination-change-page="getTransacoes"></pagination>
                            </div>


                        </b-overlay>
                    </b-tab>
                    <!-- LOG - FIM -->




                    



                </b-tabs>
                </b-overlay>
            </b-col>
        </b-row>



        <!-- BOTOES - INICIO -->
        <b-row>
            <b-col>
            <Widget    
                customHeader
                style="width:100%"
            >
                <b-button size="sm" variant="primary" v-b-tooltip.hover title="Salvar" class="mr-4" @click="saveRegistry()"><i class="fas fa-save ml-2 mr-2"></i></b-button>
                <b-button size="sm" variant="gray" v-b-tooltip.hover title="Definir nova senha" class="ml-4 mr-4" @click="newPasswordModal()"><i class="fas fa-key ml-2 mr-2"></i></b-button>
                <b-button size="sm" variant="gray" v-b-tooltip.hover title="Gerar nova senha" class="mr-4" @click="sendNewPassword()" :disabled="disableBtnSendPassword"><i class="far fa-paper-plane ml-2 mr-2"></i></b-button>
                
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <!-- <b-button size="sm" variant="info" v-b-tooltip.hover title="Nova Versão" class="mr-4 ml-4" @click="newVersion()">
                    <i class="far fa-copy ml-2 mr-2"></i>
                </b-button> -->
                
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

                <b-button size="sm" variant="default" v-b-tooltip.hover title="Voltar para Lista" class="float-right" @click="backToList()">
                    <i class="far fa-list-alt ml-2 mr-2"></i>
                </b-button>
                <!-- <b-button size="sm" variant="default" v-b-tooltip.hover title="BuscaMaterial" class="float-right mr-4" @click="goToSearch()">
                    <i class="fas fa-search ml-2 mr-2"></i>
                </b-button> -->
            </Widget>
            </b-col>
        </b-row>
        <!-- BOTOES - FIM -->





<!-- size="lg" -->
<b-modal 
    id="mNewPassword" 
    
    title="Definir Senha"
    button-size="sm"
    body-bg-variant="white"
    content-class="shadow"
    @shown="funcFocusNewPassword"
>  
    <div class="row">
        <div class="col">
            <div class="col col-12">
                <b-overlay variant="white" spinner-variant="primary" :show="processandoNewPassword" rounded="sm" style="width:100%">
                <b-form-group
                    id="group-newpassword"
                    label="Nova Senha"
                    label-for="newPassword"
                >
                    <b-form-input 
                        v-model="newPassword" 
                        id="newPassword"
                        class="w-75"
                        maxlength="60"
                        ref="focusNewPassword"
                    ></b-form-input>
                </b-form-group>
                </b-overlay>
            </div>

        </div>
    </div>

    <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="warning" v-b-tooltip.hover title="Cancelar" @click="cancel()">
            <i class="fas fa-times ml-2 mr-2"></i>
        </b-button>
        &nbsp;&nbsp;&nbsp;
        <b-button size="sm" variant="primary" v-b-tooltip.hover title="Salvar dados" @click="newPasswordSend()">
            <i class="fas fa-save ml-2 mr-2"></i>
        </b-button>
    </template>
</b-modal>







    </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import draggable from 'vuedraggable'
export default {
    name: 'PLT-Cadastros-Pessoas-Informacoes',
    components: {   Widget,
                    draggable,
                },
    // components: {
    //   Widget, BigStat, highcharts: Chart
    // },
    data() {
        return {
            processando: false,
            registry: { fk_empresa: { nome: null} },
            opt_type: [
                { id: 'A', nome: 'Administrador' },
                { id: 'U', nome: 'Usuário' },
            ],
            type: {},
            expiration_date: null,
            last_login: null,

            newPassword: null,
            processandoNewPassword: false,
            disableBtnSendPassword: false,

            registersOn: [],
            registersOff: [],
            processandoDraggable: false,
            editablePrivileges: true,       //draggable
            isDragging: false,              //draggable
            delayedDragging: false,         //draggable


            transacoes: { current_page: 0 }, //{ data: {} } ],
            processandoTransacoes: false,


        }
    },
    methods: {

        getRegistry(){
            this.processando = true            
            this.$http({
                method: 'get',
                url: 'api/cad/usuarios/' + this.$route.params.uuid,
            })
            .then(result => {
                // eslint-disable-next-line
                // console.log(result.data)

                this.processando = false
                this.registry = result.data
                this.type = this.opt_type.find(data => data.id === this.registry.type);
                this.expiration_date = this.dataHoraBR(this.registry.expiration_date)
                this.last_login = this.dataHoraBR(this.registry.last_login)

                this.getDraggableData()

            })
            .catch( error => {
                // eslint-disable-next-line
                console.log(error)
                this.processando = false
                this.erroConexao(error)
            })
            
        },

        newPasswordModal(){
            this.newPassword = null
            this.$bvModal.show("mNewPassword")
            

        },

        newPasswordSend(){
            if(this.newPassword==null || this.newPassword==""){
                alert("Digite a nova senha.")
                return
            }
            if(this.newPassword.lenght<8){
                alert("A senha deve ter no mínimo 8 caracteres.")
                return
            }
            this.processandoNewPassword = true
            var dados = {   "uuid": this.registry.uuid,
                            "newpassword": this.newPassword
                        }
            this.$http({
                method: 'put',
                url: process.env.VUE_APP_URL_BASE_API+'/api/cad/usuarios/sendnewpassword',
                data: dados
            })
            .then(() => {
                this.processandoNewPassword = false
                this.showMessage('Senha alterada com sucesso.')
                this.$bvModal.hide("mNewPassword")
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error)
                this.processandoNewPassword = false
                this.erroConexao(error)
            })
        },

        funcFocusNewPassword() {
            this.$refs.focusNewPassword.focus()
        },

        sendNewPassword(){
            var mensagem = "Deseja realmente gerar uma nova senha para este usuário?"
            if(confirm(mensagem)){
                
                this.disableBtnSendPassword = true
                var dados = {   "uuid": this.registry.uuid,
                            }
                this.$http({
                    method: 'put',
                    url: process.env.VUE_APP_URL_BASE_API+'/api/cad/usuarios/createnewpassword',
                    data: dados
                })
                .then(() => {
                    this.disableBtnSendPassword = false
                    this.showMessage('Senha enviada com sucesso.')
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error)
                    this.disableBtnSendPassword = false
                    this.erroConexao(error)
                })
            }

        },






        

        saveRegistry(){
            this.processando = true
            this.$http({
                method: 'patch',
                url: 'api/inv/cadastro/material',
                data: this.registry,
            })
            .then( () => {
                this.processando = false
                this.$bvToast.toast('[Material-Save] Registro alterado com sucesso!', {
                    title: 'Sucesso',
                    autoHideDelay: 20000,
                    variant: 'success',
                    toaster: 'b-toaster-top-center'
                })
            })
            .catch((error) => {
                this.processando = false
                if (error.response.status === 401) {
                    this.$bvToast.toast('[Material-Save] Acesso Negado!', {
                        title: 'Erro',
                        autoHideDelay: 20000,
                        variant: 'danger',
                        toaster: 'b-toaster-top-center'
                    })
                } else {
                    this.$bvToast.toast('[Material-Save] Erro na conexão (AXIOS).', {
                        title: 'Erro',
                        autoHideDelay: 20000,
                        variant: 'danger',
                        toaster: 'b-toaster-top-center'
                    })
                }
                // eslint-disable-next-line
                console.log(error)
            })
        },

        inativar(){
            var mensagem = "Deseja realmente INATIVAR este registro?"
            if(confirm(mensagem)){
                this.registry.status = 'I'
                this.saveRegistry()
            }
        },
        ativar(){
            var mensagem = "Deseja realmente ativar este registro?"
            if(confirm(mensagem)){
                this.registry.status = 'A'
                this.saveRegistry()
            }
        },







        //////// DRAGGABLE FUNCTIONS ////////

        onMove({ relatedContext, draggedContext }) {            //draggable
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },

        getDraggableData(){
            this.processandoDraggable = true
            var retorno = []
            var novo = {}
            //COM PRIVILEGIO
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API+'/api/cad/grupousuarios/listagrupocomacesso/' + this.registry.uuid,
            })
            .then(result => {
                // console.log(result)       
                retorno = result.data
                for (let k = 0; k < retorno.length; k++) {
                    novo = {
                        id: retorno[k].uuid,
                        nome: retorno[k].nome,
                        order: retorno[k].uuid,
                        // uuid_usuario: this.registers[index].uuid
                    }
                    this.registersOn.push(novo)
                }
            })
            .catch((error) => {
                this.processandoDraggable = false
                this.erroConexao(error)
                return
            })

            //SEM PRIVILEGIO
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API+'/api/cad/grupousuarios/listagruposemacesso/' + this.registry.uuid,
            })
            .then(result => {
                // console.log(result)            
                retorno = result.data
                for (let k = 0; k < retorno.length; k++) {
                    novo = {
                        id: retorno[k].uuid,
                        nome: retorno[k].nome,
                        order: retorno[k].uuid,
                        // uuid_grupo: this.registers[index].uuid
                    }
                    this.registersOff.push(novo)
                }
                this.processandoDraggable = false
            })
            .catch((error) => {
                this.processandoDraggable = false
                this.erroConexao(error)
                return
            })
        },

        changeDraggable: function(evt) {
            if(evt.added){
                //Incluindo Registro
                this.processandoPrivileges = true

                var bodyFormData = new FormData();
                bodyFormData.append("uuid_grupo", evt.added.element.id);
                bodyFormData.append("uuid_usuario", this.registry.uuid);
                this.$http({
                    method: 'post',
                    url: process.env.VUE_APP_URL_BASE_API+'/api/cad/grupousuarios',
                    data: bodyFormData
                })
                .then(() => {
                    this.processando = false
                    this.processandoPrivileges = false
                    // this.showMessage('Registro incluído com sucesso.')
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error)
                    this.processando = false
                    this.erroConexao(error)
                })

            } else if(evt.removed){
                //Removendo registro
                this.processandoPrivileges = true

                var dados = {   "uuid_grupo": evt.removed.element.id,
                                "uuid_usuario": this.registry.uuid
                }
                this.$http({
                    method: 'delete',
                    url: process.env.VUE_APP_URL_BASE_API+'/api/cad/grupousuarios',
                    data: dados
                })
                .then(() => {
                    this.processando = false
                    this.processandoPrivileges = false
                    // this.showMessage('Registro incluído com sucesso.')
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error)
                    this.processando = false
                    this.processandoDraggable = false
                    this.erroConexao(error)
                })
            }
        },

        addDraggable(index){
            // console.log("Incluindo index: "+index)
            setTimeout(() => {  
                this.registersOn.push(this.registersOff[index])
                this.registersOff.splice(index, 1)
            }, 500);
        },

        removeDraggable(index){
            // console.log("Removendo index: "+index)
            setTimeout(() => {  
                this.registersOff.push(this.registersOn[index])
                this.registersOn.splice(index, 1)
            }, 500);
        },
        




        //////////////////// FUNCOES DO LOG ////////////////////
        getTransacoes(page = 1){
            this.processandoTransacoes = true            
            this.$http({
                method: 'get',
                url: 'api/adm/logtransacao/usuario/' + this.$route.params.uuid+'?page='+page,
            })
            .then(result => {
                // eslint-disable-next-line
                // console.log(result.data)
                this.processandoTransacoes = false
                this.transacoes = result.data
            })
            .catch( error => {
                // eslint-disable-next-line
                console.log(error)
                this.processando = false
                this.erroConexao(error)
            })
        },
        logAcaoTexto(acao){
            if(acao=='L'){ return "Login" }
            else if(acao=='O'){ return "Logout" }
            else if(acao=='I'){ return "Incluir" }
            else if(acao=='U'){ return "Alterar" }
            else if(acao=='D'){ return "Excluir" }
            else if(acao=='S'){ return "Visualizar" }
            else if(acao=='R'){ return "Reset Senha" }
            else if(acao=='E'){ return "Definição nova senha" }
            else { return acao }

        },


        goToSearch(){
            this.$router.push({ name: 'INVConsultaMaterialBuscaPage'})
        },
        backToList(){
            this.$router.push({ name: 'CADUsuarios'})
        },


    },
    computed: {
        txtStatus(){
            return this.registry.status=='A'?'Ativo':'Inativo'
        },
        colorStatus(){
            return this.registry.status=='A'?'success':'warning'
        },

        dragOptions() {                     //draggable
            return {
                animation: 0,
                group: "descricao",
                disabled: !this.editablePrivileges,
                ghostClass: "ghost"
            };
        },
    },
    watch:{
        isDragging(newValue) {              //draggable
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        }

    },
    created(){
        this.mccUsuarioValidar('cad.usuario.get')
        // console.log("Entrada UUID: "+this.$route.params.uuid)
        // console.log(this.$route)
        this.$store.commit('setNomePagina', '<i class="fas fa-cog"></i>&nbsp;Cadastros&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;<i class="fas fa-user"></i>&nbsp;Usuário - Informações')
        this.getRegistry()
    }
};
</script>
