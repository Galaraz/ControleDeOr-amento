<template>
  <div>

<b-row>
    <!-- <b-col xs="12"> -->
        <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
        <Widget
            
            bodyClass="widget-table-overflow"
            customHeader
            style="width:100%"
        >
        <div class="widget-title">
            <div class="d-inline-flex">
                <span><h5>&nbsp;&nbsp;<i class='far fa-user text-primary'></i> Lista de Usuários</h5></span>
                <!-- <span class="text-info text-center" style="width:500px;" v-if="processando">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-spinner fa-spin text-info"></i>&nbsp;&nbsp;Processando...</span> -->
            </div>
        </div>
        <div class="widget-controls">
            <!-- <span class="text-info text-center col-6" style="border-left: solid 1px black" v-if="processando"><i class="fas fa-spinner fa-spin text-info"></i>&nbsp;&nbsp;Processando...</span> -->
            <a data-widgster="collapse" v-b-tooltip.hover title="Incluir Usuário" @click="modalAddUser()"><i class="fas fa-plus text-success"></i></a>
            &nbsp;
            <a data-widgster="load" @click="getRegistros()"><span v-html="btnRefresh"></span></a>
            <!-- &nbsp;
            <a data-widgster="collapse" href="#"><i class="fas fa-window-minimize"></i></a> -->
        </div>
            <!-- <div v-if="processando" class="text-info text-center"><br><h5><i class="fas fa-spinner fa-spin"></i>&nbsp;&nbsp;Processando...<br><br></h5></div> -->
            <div class="table-responsive mt-3">
                <table class="table table-striped table-lg mb-0 requests-table">
                    <thead>
                    <tr class="text-white">
                        <th class="text-center" style="width:50px"><i class="fas fa-circle text-secondary fa-lg"></i></th>
                        <th>Nome</th>
                        <th>Nome Completo</th>
                        <th>E-mail</th>
                        <th>Ult Login</th>
                        <th>Exp Senha</th>
                        <th>type</th>
                        <th style="width:50px" v-b-tooltip.hover title="Editar"></th>
                        <th style="width:50px" v-b-tooltip.hover title="Mudar Status"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(reg, index) in registros"
                        :key="reg.id"
                    >
                        <td class="text-center"><span v-html="colorStatus(index)"></span></td>
                        <td>{{reg.name}}</td>
                        <td>{{reg.full_name}}</td>
                        <td>{{reg.email}}</td>
                        <td>{{dataHoraBR(reg.last_login)}}</td>
                        <td>{{dataBR(reg.expiration_date)}}</td>
                        <td>{{nometype(reg.type)}}</td>
                        <td class="text-center">
                            <a href="#" @click="showUser(index)"
                            ><i class="far fa-edit text-info"></i></a>
                            <!-- &nbsp;&nbsp;&nbsp;
                            <a href="#"><i class="fas fa-ban text-warning"></i></a> -->
                        </td>
                        <td class="text-center" @click="changeStatus(index)">
                            <span v-html="iconChangeStatus(index)"></span>
                            <!-- <i class="fas fa-ban text-warning"></i> -->
                        </td>
                    </tr>
                    </tbody>
                </table>
                <hr>
                <table style="width:100%">
                    <tr>
                        <td>
                            <b-button v-if="!processando" @click="modalAddUser()" v-b-tooltip.hover title="Incluir Usuário" variant="success" size="sm" class="mb-2 mr-4"><i class="fas fa-plus ml-2 mr-2"></i></b-button>
                        </td>
                        <td>
                            <pagination v-if="registros.lenght>0" :data="registros" @pagination-change-page="getRegistros" class="in-line"></pagination>
                        </td>
                        <td>
                            <b-button v-if="!processando" v-b-tooltip.hover title="Gerar Excel" variant="default" size="sm" class="mb-2 mr-2 float-right"><i class="far fa-file-excel ml-2 mr-2"></i></b-button>
                            &nbsp;&nbsp;&nbsp;
                            <b-button v-if="!processando" v-b-tooltip.hover title="Imprimir" variant="default" size="sm" class="mb-2 mr-2 float-right"><i class="fas fa-print ml-2 mr-2"></i></b-button>
                        </td>
                    </tr>
                </table>
            </div>
        </Widget>
        </b-overlay>
    <!-- </b-col> -->
</b-row>

<!-- <b-row>
        <Widget
            bodyClass="float-right"
            style="width:100%"
        >
            <b-button v-b-tooltip.hover title="Gerar Excel" variant="default" size="sm" class="mb-2 mr-2"><i class="far fa-file-excel ml-2 mr-2"></i></b-button>
            &nbsp;&nbsp;&nbsp;
            <b-button v-b-tooltip.hover title="Imprimir" variant="default" size="sm" class="mb-2 mr-2"><i class="fas fa-print ml-2 mr-2"></i></b-button>
        </Widget>
</b-row> -->

<b-modal 
        id="mUser" 
        size="xl"
        :title=this.modalTitulo
        button-size="sm"
        body-bg-variant="white"
        content-class="shadow"
        @shown="focusMyElement"
    >
        <b-form inline @submit.stop.prevent id="frm1">

            <!-- <b-card no-body style="width:100%">
                <b-tabs card active-nav-item-class="bg-info text-white">
                <b-tab active>
                    <template v-slot:title><i class="fas fa-info-circle"></i> Informações</template> -->
                    <b-card-text>

                        <table style="width:100%;">
                            <tr class="mb-2">
                                <td style="width:20%;text-align:right;padding: 10px;">Tipo<span class="text-small text-danger">*</span>:</td>
                                <td>
                                    <b-form-select
                                        v-model="registro.type"
                                        :options="opt_type"
                                        value-field="value"
                                        text-field="text"
                                        disabled-field="notEnabled"
                                    ></b-form-select>
                                </td>
                            </tr>
                            <tr class="mb-2">
                                <td style="width:20%;text-align:right;padding: 10px;">E-mail<span class="text-small text-danger">*</span>:</td>
                                <td>
                                    <input ref="focusThis" autofocus required class="form-control" type="email" maxlength="128" size="65" name="email" id="email" v-model="registro.email">
                                    <b-tooltip target="email" placement="right">Digite e-mail válido para o usuário. Deve ser único.</b-tooltip>
                                </td>
                            </tr>
                            <tr class="mb-2">
                                <td style="width:20%;text-align:right;padding: 10px;">Nome do Usuário<span class="text-small text-danger">*</span>:</td>
                                <td>
                                    <input required class="form-control" type="text" maxlength="50" size="40" name="name" id="name" v-model="registro.name">
                                    <b-tooltip target="name" placement="right">Digite o nome do usuário.</b-tooltip>
                                </td>
                            </tr>
                            <tr class="mb-2">
                                <td style="width:20%;text-align:right;padding: 10px;">Nome completo:</td>
                                <td>
                                    <input required class="form-control" type="text" maxlength="128" size="65" name="full_name" id="full_name" v-model="registro.full_name">
                                    <b-tooltip target="full_name" placement="right">Digite o nome completo do usuário.</b-tooltip>
                                </td>
                            </tr>
                            
                        </table>

                    </b-card-text>
                <!-- </b-tab>
                <b-tab v-if="!addUserStatus">
                    <template v-slot:title><i class="fas fa-users"></i> Grupos</template>
                    <b-card-text>Tab contents 2</b-card-text>
                </b-tab>
                </b-tabs>
            </b-card> -->

        </b-form>

        <template v-slot:modal-footer="{ cancel }">

            <b-button size="sm" variant="warning" v-b-tooltip.hover title="Cancelar" @click="cancel()">
                <i class="fas fa-times ml-2 mr-2"></i>
            </b-button>
            &nbsp;&nbsp;&nbsp;
            <b-button size="sm" variant="primary" v-b-tooltip.hover title="Salvar dados" @click="addUser()">
                <i class="fas fa-save ml-2 mr-2"></i>
            </b-button>
        </template>
</b-modal>


  </div>
</template>

<script>
/* eslint-disable */
export default {
    components: {
        
    },
    data() {
        return {
            processando: false,
            btnRefresh: '<i class="fas fa-sync-alt"></i>',
            modalTitulo: '',
            addUserStatus: false,
            registros: [],
            opt_type: [
                //{ value: null, text: 'Please select an option' },
                { value: 'A', text: 'Administrador' },
                { value: 'U', text: 'Usuário' },
            ],
            registro: {
                email: '',
                name: '',
                full_name: '',
                type: 'U',
                last_login: ''
            },
            id_usuario: null,
            acao: null,
        };
    },
    methods: {
        formataData(data){
            if(data==''){ return '' }
            var d = new Date(data)
            return d.toLocaleString('pt-BR')
        },
        nometype(type){
            if(type=="S"){        return "Interno" 
            } else if(type=="A"){ return "Administrador" 
            } else if(type=="U"){ return "Usuário"
            } else {                return "Erro: "+type
            } 
        },
        colorStatus(index){
            if(this.registros[index].status=='A'){
                return '<i class="fas fa-circle text-success"></i>'
            } else {
                return '<i class="fas fa-circle text-warning"></i>'
            }
        },
        iconChangeStatus(index){
            if(this.registros[index].status=='A'){
                return '<i class="fas fa-ban text-warning"></i>'
            } else {
                return '<i class="fas fa-check text-success"></i>'
            }
        },
        getRegistros(page = 1){
            //Carregar usuarios
            this.processando = true
            this.btnRefresh = '<i class="fas fa-sync-alt fa-spin"></i>'
            this.registros = []

            this.$http({
                method: 'get',
                url: 'api/cad/usuarios?page=' + page
            })
            .then(res => {
                // console.log(res)
                this.processando = false
                this.btnRefresh = '<i class="fas fa-sync-alt"></i>'
                this.registros = res.data.data;
                // console.log(this.registros)
            })
            .catch(error => {
                this.processando = false
                this.btnRefresh = '<i class="fas fa-bomb text-danger"></i>'
                this.erroConexao(error)
                // if (error.response.status === 401) {
                //     alert("Erro 401")
                //     this.$router.push({ name: 'Login' });
                //     // this.errorMessage = '<i class="fas fa-exclamation-triangle"></i>&nbsp;&nbsp;Acesso Negado!'
                // } else {
                //     alert("Erro: "+error)
                //     console.log(error)
                //     // this.errorMessage = "Erro na conexão (AXIOS)."
                // }
                
            })
        },
        showUser(index){
            // console.log("showUser: "+index)
            // console.log(this.registros)
            // this.registro = this.registros[index]
            // console.log(this.registro)

            // this.addUserStatus = false
            // this.modalTitulo = "Dados do usuário: "+this.registro.name
            // this.id_usuario = this.registro.id
            // this.acao = "U"
            // this.$bvModal.show("mUser")

            this.$router.push({ name: 'CADUsuarioInformacao', params: { uuid: this.registros[index].uuid}})
        },
        modalAddUser(){
            this.cleanUser()
            this.acao = "A"
            this.addUserStatus = true
            this.modalTitulo = "Incluir novo usuário"
            this.$bvModal.show("mUser")

        },
        processUser(){
            //Validacoes
            if(this.registro.email=="" || this.registro.email==null){
                alert("Digite o e-mail do usuário.")
                return
            }
            if(this.registro.name=="" || this.registro.name==null){
                alert("Digite o nome do usuário.")
                return
            }
            //Direcionando Processamento
            if(this.acao=="A"){
                this.addUser()
            } else if(this.acao=="U"){
                this.updateUser()
            } else {
                alert("Ação ["+this.acao+"] inválida.")
            }
        },
        addUser(){
            if(this.registro.email=="" || this.registro.email==null){
                alert("Digite o e-mail do usuário.")
                return
            }
            if(this.registro.name=="" || this.registro.name==null){
                alert("Digite o nome do usuário.")
                return
            }


            this.$bvModal.hide("mUser")
            this.processando = true

            var bodyFormData = new FormData();
            bodyFormData.append("name", this.registro.name);
            bodyFormData.append("email", this.registro.email);
            bodyFormData.append("type", this.registro.type);
            bodyFormData.append("full_name", this.registro.full_name);
            bodyFormData.append("id_empresa", this.$store.state.user.id_empresa);

            this.$http({
                method: 'post',
                url: 'api/cad/usuarios',
                data: bodyFormData
            })
            .then( result => {
                this.processando = false
                // console.log(result)
                this.$router.push({ name: 'CADUsuarioInformacao', params: { uuid: result.data.uuid}})

                // this.registro.status = "A"
                // this.registros.push(this.registro)
                // this.showMessage('Usuário incluído com sucesso!!!', 'success')
                // this.registros = res.data;
                // console.log(this.registros)
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error)
                this.processando = false
                this.erroConexao(error)
            })

        },
        // updateUser(){
        //     this.$bvModal.hide("mUser")
        //     this.processando = true

        //     this.$http({
        //         method: 'patch',
        //         url: process.env.VUE_APP_URL_BASE_API+'/api/cad/usuarios',
        //         data: this.registro
        //     })
        //     .then( () => {
        //         this.processando = false
        //         // this.registers.push(result.data)
        //         this.showMessage('Registro alterado com sucesso.')
        //     })
        //     .catch((error) => {
        //         // eslint-disable-next-line
        //         console.log(error)
        //         this.processando = false
        //         this.erroConexao(error)
        //     })
        // },
        changeStatus(index){
            this.processando = true
            // var newStatus = null
            if(this.registros[index].status=='I'){
                // newStatus   = 'A'
                this.registros[index].status = 'A'
            } else {
                // newStatus   = 'B'
                this.registros[index].status = 'I'
            }
            this.registro   = this.registros[index]

            this.$http({
                method: 'patch',
                url: process.env.VUE_APP_URL_BASE_API+'/api/cad/usuarios',
                data: this.registro
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
        cleanUser(){
            this.registro = {
                email: '',
                name: '',
                full_name: '',
                type: 'U',
                last_login: ''
            }
        },
        focusMyElement() {
            this.$refs.focusThis.focus()
        }
    },
    computed: {
        nameState() {
            return this.registro.name.length > 2 ? true : false
        }
    }, created(){
        this.mccUsuarioValidar('cad.usuario.list')
        this.$store.commit('setNomePagina', '<i class="fas fa-cog"></i>&nbsp;Cadastros&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;<i class="fas fa-user"></i>&nbsp;Usuários')
        if(this.$store.state.user.type=='S'){
            this.opt_type.push({ value: 'S', text: 'Superusuário' })
        }

        this.getRegistros()
    }
};
</script>

