<template>
<div>
    
    <div class="row">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget
                title="<h5><i class='far fa-list-alt text-primary'></i> Lista de Usuarios</h5>"
                bodyClass="widget-table-overflow"
                customHeader
                style="width:100%"
            >
                <div class="widget-controls">
                    <a v-if="canAdd" data-widgster="collapse" v-b-tooltip.hover title="Incluir Registro" @click="modalAddRegistry()"><i class="fas fa-plus text-success"></i></a>
                    &nbsp;
                    <a data-widgster="load" v-b-tooltip.hover title="Refresh" @click="getRegisters()"><i class="fas fa-sync-alt text-primary"></i></a>
                </div>

                <table class="table table-striped table-hover table-lg mb-0 requests-table mt-3 border-1">
                    <thead>
                        <!-- class="text-white" -->
                    <tr>
                        <th class="text-center" style="width:50px"><i class="fas fa-circle text-secondary fa-lg"></i></th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Tipo</th>
                        <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row, index) in registers.data" :key="row.id">
                        <td class="text-center"><span v-html="colorStatus(index)"></span></td>
                        <td>{{row.name}}</td>
                        <td>{{row.email}}</td>
                        <td>{{textType(row)}}</td>
                        <td v-if="canUpdate" class="text-center">
                            <a @click="editRegistry(index)"><i class="far fa-edit text-info"></i></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Widget>
            </b-overlay>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget
                style="width:100%"
            >
                <table style="width:100%">
                    <tr>
                        <td>
                            <b-button v-if="canAdd" @click="modalAddRegistry()" v-b-tooltip.hover title="Incluir Registro" variant="success" size="sm" class="mr-4"><i class="fas fa-plus ml-2 mr-2"></i></b-button>
                        </td>
                        <td>
                            <pagination v-if="registers.data.length>0" :data="registers" :limit=3 @pagination-change-page="getRegisters"></pagination>
                        </td>
                        <td class="text-right">
                            <!-- <b-button disabled v-b-tooltip.hover title="Gerar Excel" variant="default" size="sm" class="mr-2"><i class="far fa-file-excel ml-2 mr-2"></i></b-button>
                            &nbsp;&nbsp;&nbsp;
                            <b-button disabled v-b-tooltip.hover title="Imprimir" variant="default" size="sm" class="mr-2"><i class="fas fa-print ml-2 mr-2"></i></b-button> -->
                        </td>
                    </tr>
                </table>

            </Widget>
            </b-overlay>
        </div>
    </div>

<b-modal 
    id="mRegistry"
    size="lg"
    :title=this.modalTitle
    button-size="sm"
    body-bg-variant="white"
    content-class="shadow"
    @shown="focusNome"
>
    <b-overlay variant="white" spinner-variant="primary" :show="processandoAdd" rounded="sm" style="width:100%">
    <div class="row">
        <div class="col col-6">
            <b-form-group
                id="group-type"
                label="Tipo de usuário"
                label-for="type"
            >
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
        <div class="col col-6">
            <b-form-group
                id="grp-nome"
                label="Nome"
                label-for="nome"
                :state="stateNome"
            >
                <b-form-input 
                    id="nome" 
                    ref="focusNome"
                    v-model="registry.name" 
                    :state="stateNome"
                    trim
                ></b-form-input>
            </b-form-group>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <b-form-group
                id="grp-email"
                label="E-mail"
                label-for="email"
                :state="stateEmail"
            >
                <b-form-input 
                    id="email" 
                    v-model="registry.email" 
                    :state="stateEmail"
                    trim
                    type="email"
                ></b-form-input>
            </b-form-group>
        </div>
    </div>
    <!-- <div class="row">
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
    </div> -->
    </b-overlay>

    <template v-slot:modal-footer="{ cancel }">
        <b-overlay variant="white" spinner-variant="primary" :show="processandoAdd" rounded="sm" style="width:100%">
        <table class="w-100">
            <tr>
                <td>
                </td>
                <td class="text-right">
                    <b-button size="sm" variant="warning" v-b-tooltip.hover title="Fechar" @click="cancel()">
                        <i class="fas fa-times ml-2 mr-2"></i>
                    </b-button>
                    &nbsp;&nbsp;&nbsp;
                    <b-button :disabled="disableBtnSaveRegistry" size="sm" variant="primary" v-b-tooltip.hover title="Salvar" @click="processRegistry()">
                        <i class="fas fa-save ml-2 mr-2"></i>
                    </b-button>
                    <!-- :disabled="disableBtnSaveRegistry" -->

                </td>
            </tr>

        </table> 
        </b-overlay>
    </template>
</b-modal>

</div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
export default {
    name: 'JPSCADExameSecoes',
    components: { Widget },
    data() {
        return {
            //// Privilegios
            canAdd: true,
            canUpdate: true,
            canGet: true,
            ////
            processando: false,
            processandoAdd: false,
            registry: { name: "", email: "", obs:"" },
            registers: {data: [] },
            modalTitle: null,
            btnDeleteRecord: false,
            btnSaveRecord: false,

            opt_type: [
                { id: 'A', nome: 'Administrador' },
                { id: 'S', nome: 'Supervisor' },
                { id: 'U', nome: 'Usuário' },
            ],
            type: {},

            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

        }
    },
    methods: {
        focusNome() {
            this.$refs.focusNome.focus()
        },
        colorStatus(index){
            if(this.registers.data[index].status=='A'){
                return '<i class="fas fa-circle text-success"></i>'
            } else {
                return '<i class="fas fa-circle text-warning"></i>'
            }
        },
        getRegisters(page = 1){ 
            this.processando = true
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API +'/api/cad/usuarios?page=' + page,
            })
            .then(result => {
                this.processando = false
                this.registers = result.data
                // console.log(result)
                // this.getModelos()
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error)
                this.processando = false
                this.showMessage('Erro na conexão. Acione o suporte.', 'danger')
                this.erroConexao(error)
            })
        },

        editRegistry(index){
            // console.log(this.registers);
            this.$router.push({ name: 'CadastroUsuarioPage', params: { uuid: this.registers.data[index].uuid}})

            // this.modalTitle = 'Seção: '+ this.registers.data[index].id
            // this.registry = this.registers.data[index]
            // this.registry.action = 'U'
            // this.registry.pos = index
            // // this.btnDeleteRecord = true
            // this.$bvModal.show("mRegistry")
        },
        modalAddRegistry(){
            this.modalTitle = "Novo Usuário"
            this.registry = { 
                name: "",
                full_name: "",
                email: "",
            }
            this.type = this.opt_type[2]
            this.$bvModal.show("mRegistry")
        },

        processRegistry(){

            if(!this.reg.test(this.registry.email)){
                alert("Digite um e-mail válido.")
                return
            }

            this.processandoAdd = true
            var bodyFormData = new FormData();
            bodyFormData.append("name", this.registry.name);
            bodyFormData.append("email", this.registry.email);
            bodyFormData.append("type", this.type.id);

            this.$http({
                method: 'post',
                url: process.env.VUE_APP_URL_BASE_API +'/api/cad/usuarios',
                data: bodyFormData
            })
            .then(result => {
                this.processandoAdd = false
                this.registers.data.push(result.data)
                this.$bvModal.hide("mRegistry")
                this.showMessage('Registro incluído com sucesso.')
            })
            .catch((error) => {
                // eslint-disable-next-line
                // console.log(error)
                this.processandoAdd = false
                this.erroConexao(error)
            })

        },

        textType(registro){
            if(registro.type=='A') {
                return 'Administrador'
            } else if(registro.type=='U') {
                return 'Usuário'
            } else if(registro.type=='S') {
                return 'Supervisor'
            } else {
                return 'Erro: '+registro.status
            }
        },
        
    },
    computed: {
        stateNome() {
            return this.registry.name.length >= 4
        },
        stateEmail() {
            return this.registry.email.length >= 4
        },
        disableBtnSaveRegistry(){
            if(!this.stateNome){
                return true
            }
            if(!this.stateEmail){
                return true
            }
            return false
        },
    },
    created(){
        //Validando permissao e secao
        // this.mccUsuarioValidar('jps.exametipo.list')
        this.$store.commit('setNomePagina', '<i class="fas fa-cogs"></i>&nbsp;Cadastros&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-users"></i>&nbsp;Usuarios')
        // this.canAdd = this.usuarioTemPermissao('jps.exametipo.add')
        // this.canUpdate = this.usuarioTemPermissao('jps.exametipo.update')
        // this.canGet = this.usuarioTemPermissao('privilegio_para_get')
        if(! (this.$store.state.user.type=='A')) {
            this.$router.push({ name: 'SemPermissao'}); 
        }

        this.getRegisters()
        // this.getSecoes()
    }
};
</script>