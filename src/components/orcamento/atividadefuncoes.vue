<template>
<div>

    <!-- <div v-if="canUpdate" class="row">
        <div class="col">
            <b-button
                size="sm"
                variant="success"
                v-b-tooltip.hover
                title="Incluir Atividade"
                class="mr-4 ml-4"
                @click="funcoes_Add()"
            >
                <i class="fas fa-plus ml-2 mr-2"></i>
            </b-button>
        </div>
    </div> -->

    <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
    <div v-if="canUpdate" class="row mt-4 mr-2">
        <div class="col col-4">
            <b-form-group
            id="input-group-41" label="Função:" label-for="input-41"
            >
                <v-select
                    v-model="funcao"
                    :options="funcoes"
                    value-field="id"
                    inputId="id"
                    label="nome"
                    name="input-41"
                    id="input-41"
                ></v-select>
            </b-form-group>
        </div>

        <div class="col col-1">
            <b-form-group
            id="input-5"
            label="Qtd Col"
            label-for="qtd_colaboradores"
            >
            <b-form-input
                id="qtd_colaboradores"
                v-model="funcaoNova.qtd_colaboradores"
            ></b-form-input>
            </b-form-group>
        </div>
        
        <div class="col col-1">
            <b-form-group
            id="input-6"
            label="Horas"
            label-for="horas"
            >
            <b-form-input
                id="horas"
                v-model="funcaoNova.qtd_horas"
            ></b-form-input>
            </b-form-group>
        </div>

        <div class="col col-1">
            <b-form-group
            id="input-7"
            label="HE 50%"
            label-for="he50"
            >
            <b-form-input
                id="he50"
                v-model="funcaoNova.qtd_horas_50"
            ></b-form-input>
            </b-form-group>
        </div>

        <div class="col col-2">
            <b-form-group
            id="input-7"
            label="HE 100%"
            label-for="he100"
            >
            <b-form-input
                id="he100"
                v-model="funcaoNova.qtd_horas_100"
            ></b-form-input>
            </b-form-group>
        </div>

        <div class="col col-2">
            <b-form-group
            id="input-7"
            label="Add Noturno"
            label-for="add_noturno"
            >
            <b-form-input
                id="add_noturno"
                v-model="funcaoNova.qtd_horas_noturno"
            ></b-form-input>
            </b-form-group>
        </div>

        <div class="col col-1">
            <h1></h1><br>
            <!-- class="mr-4 ml-4" -->
            <b-button
                size="sm"
                variant="success"
                v-b-tooltip.hover
                title="Incluir Atividade"
                @click="funcao_Add()"
            >
                <i class="fas fa-plus ml-2 mr-2"></i>
            </b-button>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <table
                class="table table-striped table-hover table-lg mt-3 border-1"
            >
                <thead>
                <!-- class="text-white" -->
                <tr>
                    <th>Funçao</th>
                    <th class="text-right">Qtd</th>
                    <th class="text-right">Horas</th>
                    <th class="text-right">HE 50%</th>
                    <th class="text-right">HE 100%</th>
                    <th class="text-right">Add Not</th>
                    <th class="text-right">Subtotal</th>
                    <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(rowFunc, indexFunc) in atividade.fk_funcoes" :key="rowFunc.id">
                    <td>{{ rowFunc.nome }}</td>
                    <td class="text-right">{{ numeroBR(rowFunc.qtd_colaboradores) }}</td>
                    <td class="text-right">{{ numeroBR(rowFunc.qtd_horas) }}</td>
                    <td class="text-right">{{ numeroBR(rowFunc.qtd_horas_50) }}</td>
                    <td class="text-right">{{ numeroBR(rowFunc.qtd_horas_100) }}</td>
                    <td class="text-right">{{ numeroBR(rowFunc.qtd_horas_noturno) }}</td>
                    <td class="text-right">R$ {{numeroBR(rowFunc.subtotal)}}</td>
                    <td v-if="canUpdate" class="text-center">
                        <a @click="funcao_Delete(indexFunc)"><i class="far fa-trash-alt text-danger"></i></a>
                    </td>
                </tr>
                <tr>
                    <td colspan="6" class="text-right"><h5>Total:</h5></td>
                    <td class="text-right">R$ {{numeroBR(Total)}}</td>
                    <td v-if="canUpdate"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>


    <div class="row p-0"><div class="col"><hr></div></div>
    <div class="row mt-2">
        <div class="col text-right">
            <b-button class="mr-4" size="sm" variant="warning" v-b-tooltip.hover title="Fechar" @click="$bvModal.hide('mAtividadeFuncoes')">
                <i class="fas fa-times ml-2 mr-2"></i>
            </b-button>
            <!-- <b-button v-if="canUpdate" class="ml-4" size="sm" variant="primary" v-b-tooltip.hover title="Salvar dados" @click="registryAdd()">
                <i class="fas fa-save ml-2 mr-2"></i>
            </b-button> -->
        </div>
    </div>

    </b-overlay>


</div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
export default {
    name: 'NomePagina',
    components: { Widget },
    props: [ 'atividade', 'canUpdate' ],
    data() {
        return {
            //// Privilegios
            // canAdd: false,
            // canUpdate: false,
            // canGet: false,
            ////
            processando: false,
            registry: {},
            // registers: {data: [] },

            funcoes:[],
            funcao: {},
            funcaoNova: {id: null, uuid: null, qtd_colaboradores: 1, qtd_horas: 0, qtd_horas_50: 0, qtd_horas_100: 0, qtd_horas_noturno: 0},

            Total: 0,
        }
    },
    methods: {
        getFuncoes() {
            if(this.canUpdate){
                this.processando = true;
                this.$http({
                    method: 'get',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/cad/funcoes?all=1",
                })
                .then((result) => {
                    this.processando = false;
                    this.funcoes = result.data;
                    this.funcao = this.funcoes[0]
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.processando = false;
                    this.showMessage('Erro na conexão [Funcoes]. Acione o suporte.', 'danger');
                    this.erroConexao(error);
                });
            }
        },

        funcao_Add(){
            if(!this.funcao){
                alert("Selecione uma função")
                return
            }
            if(isNaN(this.funcaoNova.qtd_colaboradores)){
                alert("Digite uma quantidade válida (número).")
                return
            }
            if(this.funcaoNova.qtd_colaboradores==null || this.funcaoNova.qtd_colaboradores=="" || this.funcaoNova.qtd_colaboradores<=0){
                alert("Digite uma quantidade válida")
                return
            }

            if(isNaN(this.funcaoNova.qtd_horas)){
                alert("Digite uma quantidade de horas válida (número).")
                return
            } 
            if(isNaN(this.funcaoNova.qtd_horas_50)){
                alert("Digite uma quantidade de HE 50% válida (número).")
                return
            } 
            if(isNaN(this.funcaoNova.qtd_horas_50)){
                alert("Digite uma quantidade de HE 100% válida (número).")
                return
            } 
            if(isNaN(this.funcaoNova.qtd_horas_noturno)){
                alert("Digite uma quantidade de Adicional Noturno válido (número).")
                return
            } 

            if(
                (this.funcaoNova.qtd_horas==null || this.funcaoNova.qtd_horas=="" || this.funcaoNova.qtd_horas<=0) &&
                (this.funcaoNova.qtd_horas_50==null || this.funcaoNova.qtd_horas_50=="" || this.funcaoNova.qtd_horas_50<=0) &&
                (this.funcaoNova.qtd_horas_100==null || this.funcaoNova.qtd_horas_100=="" || this.funcaoNova.qtd_horas_100<=0) &&
                (this.funcaoNova.qtd_horas_noturno==null || this.funcaoNova.qtd_horas_noturno=="" || this.funcaoNova.qtd_horas_noturno<=0) 
            ){
                alert("Digite alguma quantidade de horas.")
                return
            }
            
            let existe = this.atividade.fk_funcoes.find((data) => data.id === this.funcao.id);
            if(existe){
                alert("Função já incluída")
                return
            }

            var totAtividade =  (
                                    ( parseFloat(this.funcaoNova.qtd_horas) * this.funcao.valor_hora ) +
                                    ( parseFloat(this.funcaoNova.qtd_horas_50) * this.funcao.valor_hora_50 ) +
                                    ( parseFloat(this.funcaoNova.qtd_horas_100) * this.funcao.valor_hora_100 ) +
                                    ( parseFloat(this.funcaoNova.qtd_horas_noturno) * this.funcao.valor_hora_noturno )
                                ) * parseFloat(this.funcaoNova.qtd_colaboradores)
            this.funcaoNova.nome = this.funcao.nome
            this.funcaoNova.subtotal = totAtividade
            this.funcaoNova.id = this.funcao.id
            this.funcaoNova.uuid = this.funcao.uuid
            this.Total = this.Total + totAtividade
            

            if(this.atividade.uuid){
                
                this.processando = true
                var bodyFormData = new FormData();
                bodyFormData.append("uuid", this.atividade.uuid );
                bodyFormData.append("id_funcao", this.funcaoNova.id);
                bodyFormData.append("qtd_colaboradores", this.funcaoNova.qtd_colaboradores);
                bodyFormData.append("valor_hora", this.funcao.valor_hora);
                bodyFormData.append("valor_hora_50", this.funcao.valor_hora_50);
                bodyFormData.append("valor_hora_100", this.funcao.valor_hora_100);
                bodyFormData.append("valor_hora_noturno", this.funcao.valor_hora_noturno);
                bodyFormData.append("qtd_horas", parseFloat(this.funcaoNova.qtd_horas));
                bodyFormData.append("qtd_horas_50", parseFloat(this.funcaoNova.qtd_horas_50));
                bodyFormData.append("qtd_horas_100", parseFloat(this.funcaoNova.qtd_horas_100));
                bodyFormData.append("qtd_horas_noturno", parseFloat(this.funcaoNova.qtd_horas_noturno));
                

                this.$http({
                    method: 'post',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentoversaoatividadesfuncoes",
                    // url: "http://127.0.0.1:8000/api/orcamentoversaoatividadesfuncoes",
                    data: bodyFormData
                })
                .then(() => {
                    this.processando = false;
                    // this.atividade.fk_funcoes.splice(0,0,result)
                    this.atividade.fk_funcoes.splice(0,0,this.funcaoNova)
                    this.funcaoNova = {id: null, uuid: null, qtd_colaboradores: 1, qtd_horas: 0, qtd_horas_50: 0, qtd_horas_100: 0, qtd_horas_noturno: 0}
                    this.$emit('atividade_Funcao_Atualizacao', this.atividade.fk_funcoes)
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.processando = false;
                    this.showMessage('Erro na conexão[AtividadeFuncao-Save]. Acione o suporte.', 'danger');
                    this.erroConexao(error);
                });


            } else {

                this.atividade.fk_funcoes.splice(0,0,this.funcaoNova)
                this.funcaoNova = {id: null, uuid: null, qtd_colaboradores: 1, qtd_horas: 0, qtd_horas_50: 0, qtd_horas_100: 0, qtd_horas_noturno: 0}
                this.$emit('atividade_Funcao_Atualizacao', this.atividade.fk_funcoes)
            }


        },


        funcao_Delete(index){
            var mensagem = "Deseja realmente excluir a função "+this.atividade.fk_funcoes[index].nome+"?"
            if(confirm(mensagem)){

                if(this.atividade.uuid){
                    alert("Savar base")
                } else {
                    var ativSel = this.atividade.fk_funcoes[index]
                    var totAtividade =  (
                                        ( ativSel.qtd_horas * ativSel.valor_hora ) +
                                        ( ativSel.qtd_horas_50 * ativSel.valor_hora_50 ) +
                                        ( ativSel.qtd_horas_100 * ativSel.valor_hora_100 ) +
                                        ( ativSel.qtd_horas_noturno * ativSel.valor_hora_noturno )
                                    ) * ativSel.qtd_colaboradores
                    this.Total = this.Total - totAtividade
                    this.atividade.fk_funcoes.splice(index, 1)
                    this.$emit('atividade_Funcao_Atualizacao', this.atividade.fk_funcoes)
                }

            }


        }
    },
    computed: {
    },
    created(){
        //Validando permissao e secao
        // this.mccUsuarioValidar('privilegio_para_acesso_na_pagina')
        // this.$store.commit('setNomePagina', '<i class="fas fa-search-plus"></i>&nbsp;Consultas&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-boxes"></i>&nbsp;Buscar Material')
        // this.canAdd = this.usuarioTemPermissao('privilegio_para_add')
        // this.canUpdate = this.usuarioTemPermissao('privilegio_para_update')
        // this.canGet = this.usuarioTemPermissao('privilegio_para_get')

        // console.log("Atividade - Modal")
        // console.log(this.atividade)

        if(!this.atividade.fk_funcoes){
            this.atividade.fk_funcoes = []
        } else {
            this.Total = 0
            this.atividade.fk_funcoes.forEach(element => {
                var totAtividade =  (
                                        ( (element.qtd_horas) * element.valor_hora ) +
                                        ( (element.qtd_horas_50) * element.valor_hora_50 ) +
                                        ( (element.qtd_horas_100) * element.valor_hora_100 ) +
                                        ( (element.qtd_horas_noturno) * element.valor_hora_noturno )
                                    ) * (element.qtd_colaboradores)
                this.Total = this.Total + totAtividade
            });
        }

        this.getFuncoes()
    }
};
</script>