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
export default {
    name: 'PLT-Cadastros-Pessoas-Informacoes',
    components: {   Widget,
                },
    // components: {
    //   Widget, BigStat, highcharts: Chart
    // },
    data() {
        return {
            processando: false,
            registry: {  },
            opt_type: [
                { id: 'A', nome: 'Administrador' },
                { id: 'S', nome: 'Supervidor' },
                { id: 'U', nome: 'Usuário' },
            ],
            type: {},
            expiration_date: null,
            last_login: null,

            newPassword: null,
            processandoNewPassword: false,
            disableBtnSendPassword: false,



            transacoes: { current_page: 0 }, //{ data: {} } ],
            processandoTransacoes: false,


        }
    },
    methods: {

        getRegistry(){
            this.processando = true            
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API+'/api/cad/usuarios/' + this.$route.params.uuid,
            })
            .then(result => {
                // eslint-disable-next-line
                // console.log(result.data)

                this.processando = false
                this.registry = result.data
                this.type = this.opt_type.find(data => data.id === this.registry.type);
                this.expiration_date = this.dataHoraBR(this.registry.expiration_date)
                this.last_login = this.dataHoraBR(this.registry.last_login)

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
                url: process.env.VUE_APP_URL_BASE_API+'/api/cad/usuarios',
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




        backToList(){
            this.$router.push({ name: 'CadastroUsuariosPage'})
        },


    },
    computed: {
        txtStatus(){
            return this.registry.status=='A'?'Ativo':'Inativo'
        },
        colorStatus(){
            return this.registry.status=='A'?'success':'warning'
        },

    },
    watch:{
    },
    created(){
        // this.mccUsuarioValidar('cad.usuario.get')
        // console.log("Entrada UUID: "+this.$route.params.uuid)
        // console.log(this.$route)
        this.$store.commit('setNomePagina', '<i class="fas fa-cog"></i>&nbsp;Cadastros&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;<i class="fas fa-user"></i>&nbsp;Usuário - Informações')

        if(! (this.$store.state.user.type=='A')) {
            this.$router.push({ name: 'SemPermissao'}); 
        }
        this.getRegistry()
    }
};
</script>
