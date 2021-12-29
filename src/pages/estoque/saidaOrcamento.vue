<template>
<div>
<!-- <b-alert show variant="warning"><i class="fas fa-exclamation-triangle"></i> Em Validação.</b-alert> -->

    <div class="row">
        <div class="col col-6">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">

                <Widget
                title="<h5>&nbsp;&nbsp;<i class='far fa-file-alt text-primary'></i>&nbsp;&nbsp;Dados do Orçamento</h5>"
                customHeader
            >
                <div class="row mt-3">
                    <div class="col col-6">
                        <b-form-group
                            id="grp-20"
                            label="Orçamento"
                            label-for="codigo"
                            description="Digite o código do orçamento sem a versão."
                        >
                            <b-form-input 
                                id="codigo" 
                                ref="focusCodigo"
                                v-model="codigo" 
                                @blur="getOrcamento()"
                                autofocus
                            ></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col">
                        <b-form-group
                            id="grp-21"
                            label="Referencia"
                            label-for="referencia"
                        >
                            <!-- <b-form-input 
                                id="referencia"
                                v-model="registry.referencia" 
                                readonly
                            ></b-form-input> -->
                            <b-form-textarea
                                id="referencia"
                                v-model="registry.referencia"
                                rows="3"
                                max-rows="6"
                                readonly
                            ></b-form-textarea>
                        </b-form-group>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col text-center">
                        <b-button :disabled="!stsSaida" style="width: 10rem;" size="lg" variant="primary" v-b-tooltip.hover title="Efetivar Saída do Equipamento" @click="estoqueSaida()"><i class="fas fa-sign-out-alt"></i></b-button>        
                    </div>
                </div>


                </Widget>

            </b-overlay>
        </div>
        <div class="col col-6">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <!-- title="<h5>&nbsp;&nbsp;<i class='far fa-file-alt text-primary'></i>&nbsp;&nbsp;Dados do Orçamento</h5>" -->
            <Widget
                title="<h5>&nbsp;&nbsp;<i class='fas fa-list-ol text-primary'></i>&nbsp;&nbsp;Lista de Equipamentos</h5>"
                customHeader
            >
                <div class="table-resposive mt-4">
                    <table class="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th colspan="2">Equipamento</th>
                            <th class="text-right" style="width:70px">Qtd</th>
                            <th class="text-right" style="width:70px">Estoq</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(row, index) in materiais_saida" :key="'id'+ index">
                            <td class="text-right">{{row.fk_equipamento.id}}</td>
                            <td>{{row.fk_equipamento.nome}}</td>
                            <td class="text-right">{{row.qtd}}</td>
                            <td class="text-right">{{numeroBR(row.fk_equipamento.qtd_estoque,0)}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Widget>
            </b-overlay>
        </div>
    </div>

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
            codigo: null,
            registry: {},
            registers: [],
            stsSaida: false,
            materiais_saida: [],
        }
    },
    methods: {
        getOrcamento(){
            if(this.codigo!=null && this.codigo!=""){
                this.processando = true;
                this.materiais_saida = []
                this.$http({
                    method: 'get',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/codigo/"+this.codigo,
                })
                .then((result) => {
                    this.processando = false;
                    this.registry = result.data;
                    // console.log(this.registry);

                    if(this.registry.status=="D" || this.registry.status=="V" || this.registry.status=="E" || this.registry.status=="R"){
                        this.showMessage('Orçamento não liberado para saída de estoque ['+this.registry.status+'].', 'warning');
                        this.codigo = null
                        this.registry = {}
                        this.focusCodigo()
                    } else {
                        if(this.registry.sts_saida_estoque=="S"){
                            this.showMessage('Já foi dada saída de estoque para este Orçamento.','danger')
                            this.codigo = null
                            this.registry = {}
                            this.focusCodigo()
                        } else {
                            this.getEquipamentos()
                        }
                    }
                    
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    if(error.response.status === 402) {
                        this.showMessage('Código não encontrado.', 'danger');
                    } else {
                        this.showMessage('Erro na conexão [Orcamento]. Acione o suporte.', 'danger');
                    }
                    this.processando = false;
                    this.erroConexao(error);
                    this.codigo = null
                    this.registry = {}
                    this.focusCodigo()
                });
            }
        },
        getEquipamentos(){
            this.processando = true;
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/getequipamento?uuid="+this.registry.fk_versao[0].uuid,
            })
            .then((result) => {
                this.processando = false;
                // console.log(result.data);

                this.materiais_saida = result.data

                let temEstoque = true
                this.materiais_saida.forEach(element => {
                    if(element.fk_equipamento.qtd_estoque==null){
                        temEstoque = false
                    } else if(element.qtd > element.fk_equipamento.qtd_estoque){
                        temEstoque = false
                    }
                });
                if(!temEstoque){
                    this.showMessage("Não temos todos os equipamentos em estoque.", "danger")
                } else {
                    this.stsSaida = true
                }
                
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                if(error.response.status === 402) {
                    this.showMessage('Código não encontrado.', 'danger');
                } else {
                    this.showMessage('Erro na conexão [Orcamento]. Acione o suporte.', 'danger');
                }
                this.processando = false;
                this.erroConexao(error);
                this.codigo = null
                this.registry = {}
                this.focusCodigo()
            });
        },

        estoqueSaida(){
            var mensagem = "Deseja realmente dar saída do estoque de TODOS os equipamentos listados?"
            if(confirm(mensagem)){
                this.processando = true;
                this.$http({
                    method: 'get',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/estoque/saidaorcamento?uuid="+this.registry.fk_versao[0].uuid,
                })
                .then(() => {
                    this.processando = false;
                    this.showMessage('Saída de estoque efetuada com sucesso','success')
                    this.codigo = null
                    this.registry = {}
                    this.materiais_saida = []
                    this.focusCodigo()
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    if(error.response.status === 402) {
                        this.showMessage('Código não encontrado.', 'danger');
                    } else {
                        this.showMessage('Erro na conexão [Orcamento]. Acione o suporte.', 'danger');
                    }
                    this.processando = false;
                    this.erroConexao(error);
                });
            }
        },

        focusCodigo() {
            this.$refs.focusCodigo.focus()
        },
    },
    computed: {
    },
    created(){
        this.$store.commit('setNomePagina', '<i class="fas fa-barcode"></i>&nbsp;Estoque&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-sign-out-alt"></i>&nbsp;Saída de Equipamento por Orçamento')
        if(! (this.$store.state.user.type=='A' || this.$store.state.user.type=='S')) {
            this.$router.push({ name: 'SemPermissao'}); 
        }
    }
};
</script>