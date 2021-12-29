<template>
<div>
    <div class="row">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget
                title="<h5><i class='fas fa-lock text-primary'></i> Trocar senha</h5>"
                bodyClass="widget-table-overflow"
                customHeader
                style="width:100%"
            >

                <div class="row m-4">
                    <div class="col col-8">
                        <b-form-group
                            id="group-old"
                            label="Senha atual"
                            label-for="password_old"
                            description="Digite sua senha atual."
                            :state="stateOld"
                        >
                            <b-form-input 
                                v-model="password_old" 
                                id="password_old"
                                maxlength="100"
                                :state="stateOld"
                                type="password"
                                autofocus
                            ></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div class="row m-4">
                    <div class="col col-8">
                        <b-form-group
                            id="group-new"
                            label="Nova senha"
                            label-for="password_new"
                            description="Digite sua NOVA senha."
                            :state="stateNew"
                        >
                            <b-form-input 
                                v-model="password_new" 
                                id="password_new"
                                maxlength="100"
                                type="password"
                                :state="stateNew"
                            ></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div class="row m-4">
                    <div class="col col-8">
                        <b-form-group
                            id="group-conf"
                            label="Confirmar nova senha"
                            label-for="password_conf"
                            description="Confirme sua NOVA senha (deve ser igual a nova senha)."
                            :state="stateConf"
                        >
                            <b-form-input 
                                v-model="password_conf" 
                                id="password_conf"
                                maxlength="100"
                                type="password"
                                :state="stateConf"
                            ></b-form-input>
                        </b-form-group>
                    </div>
                </div>

            </Widget>
            </b-overlay>
        </div>
    </div>

    <!-- BOTOES - INICIO -->
    <div class="row">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget    
                customHeader
                style="width:100%"
            >
                <b-button :disabled="disableBtnSaveRegistry" size="sm" variant="primary" v-b-tooltip.hover title="Salvar" class="mr-4" @click="saveRegistry()"><i class="fas fa-save ml-2 mr-2"></i></b-button>
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
            registry: {},
            // registers: {data: [] },

            password_old: "",
            password_new: "",
            password_conf: "",
        }
    },
    methods: {
        saveRegistry(){
            this.processando = true            
            this.$http({
                method: 'put',
                url: process.env.VUE_APP_URL_BASE_API+'/api/cad/usuarios/changepassword',
                data: {
                    password: this.password_old,
                    password_new: this.password_new,
                }
            })
            .then(result => {
                // eslint-disable-next-line
                // console.log(result.data)

                this.processando = false
                this.showMessage('Senha atualizada com sucesso.','success')
                this.password_old = ""
                this.password_new = ""
                this.password_conf = ""

            })
            .catch( error => {
                // eslint-disable-next-line
                console.log(error)
                this.processando = false
                this.erroConexao(error)
                this.showMessage('Erro alterando a senha.','danger')
            })
        }
    },
    computed: {
        stateOld() {
            return this.password_old.length >= 8
        },
        stateNew() {
            return this.password_new.length >= 8
        },
        stateConf() {
            if(this.password_conf.length >= 8){
                if(this.password_conf.length==this.password_new.length){
                    return true
                } else {
                    return false
                }
            } 
            if(this.password_conf.length > 1){
                if(this.password_conf.length==this.password_new.length){
                    return true
                }
            }
            
            return false
        },
        disableBtnSaveRegistry(){
            if(!this.stateOld){
                return true
            }
            if(!this.stateNew){
                return true
            }
            if(!this.stateConf){
                return true
            }
            return false
        },
    },
    created(){
        //Validando permissao e secao
        // this.mccUsuarioValidar('privilegio_para_acesso_na_pagina')
        this.$store.commit('setNomePagina', '<i class="far fa-user"></i>&nbsp;Meu Usuário&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-lock"></i>&nbsp;Trocar senha')
    }
};
</script>