<template>
<div>

    <template v-if="registry.uuid!=null">
        <!-- INFORMACOES TOPO PAGINA - INICIO -->
        <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
        <div class="row d-flex justify-content-between mt-0 mb-4 ml-1 mr-1">
            <div style="width: 19rem;">
                <b-card bg-variant="primary" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
                    <b-card-text>
                        <span style="font-size:85%;"><i class="fas fa-hashtag"></i></span><br>
                        <span class="p-0 mt-0" style="font-size:170%;">{{registry.codigo}}-</span><span class="p-0 mt-0" style="font-size:120%;">{{registry.versao}}</span>
                    </b-card-text>
                </b-card>
            </div>

            <div style="width: 44rem;" class="ml-4 mb-0 p-0">
                
            </div>
            <div style="width: 14rem;">
                <b-card bg-variant="primary" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
                    <b-card-text>
                        <span style="font-size:85%;"><i class="fas fa-tag"></i> Status</span><br>
                        <span class="p-0 mt-0" style="font-size:170%;">Em Digitação</span>
                    </b-card-text>
                </b-card>
            </div>
        </div>
        </b-overlay>
        <!-- INFORMACOES TOPO PAGINA - FIM -->
    </template>

    <div class="row mt-2">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
                <!-- title="<h5><i class='far fa-list-alt text-primary'></i> Lista de Equipamentos</h5>" -->
            <Widget
                bodyClass="widget-table-overflow mt-2 mr-2 ml-2 mb-4"
                customHeader
                style="width:100%"
            >
                <div class="widget-title">
                    <div class="d-inline-flex mb-1">
                        <span v-if="registry.uuid==null"><h5>&nbsp;&nbsp;<i class='fas fa-plus text-primary'></i>&nbsp;&nbsp;Novo Orçamento</h5></span>
                        <span v-else><h5>&nbsp;&nbsp;<i class='far fa-file-alt text-primary'></i>&nbsp;&nbsp;Dados do Orçamento</h5></span>
                    </div>
                    <div class="row"><div class="col"><hr></div></div>
                </div>


                <div class="row mt-4">
                    <div class="col col-6">
                        <b-form-group
                            id="input-group-11" label="Cliente:" label-for="input-11"
                        >
                            <!-- <b-form-select
                                v-if="canUpdateCliente"
                                id="input-11"
                                v-model="cliente"
                                :options="clientes"
                                value-field="id"
                                text-field="nome"
                            ></b-form-select> -->
                            <v-select
                                v-if="canUpdateCliente"
                                v-model="cliente"
                                :options="clientes"
                                value-field="id"
                                inputId="id"
                                label="nome"
                                name="nput-11"
                                id="nput-11"
                            ></v-select>
                            <b-form-input
                                v-else
                                id="input-nomecliente"
                                v-model="registry.fk_cliente.nome"
                                readonly
                            ></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col col-6">
                        <b-form-group id="input-group-4" label="Nome do Responsavel:" label-for="input-4">
                        <b-form-input
                            id="input-2"
                            v-model="registry.contato_nome"
                            required
                        ></b-form-input>
                        </b-form-group>
                    </div>
                </div>

                <div class="row">
                    <div class="col col-6">
                        <b-form-group
                        id="input-group-2"
                        label="E-mail do Responsável:"
                        label-for="input-2"
                        description=""
                        >
                        <b-form-input
                            id="input-2"
                            v-model="registry.contato_email"
                            type="email"
                            required
                        ></b-form-input>
                        </b-form-group>
                    </div>

                    <div class="col col-6">
                        <b-form-group
                        id="input-group-4"
                        label="Telefone:"
                        label-for="input-5"
                        description=""
                        >
                        <b-form-input
                            id="input-5"
                            v-model="registry.contato_fone"
                            required
                        ></b-form-input>
                        </b-form-group>
                    </div>
                </div>

                <div class="row">
                    <div class="col col-12">
                        <b-form-group
                        id="input-group-21"
                        label="Referencia:"
                        label-for="referencia"
                        description=""
                        >
                        <b-form-input
                            id="referencia"
                            v-model="registry.referencia"
                            type="text"
                        ></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-12">
                        <b-form-group
                        id="input-group-21"
                        label="Condição de Pagamento:"
                        label-for="condicao_pagamento"
                        description=""
                        >
                        <b-form-input
                            id="condicao_pagamento"
                            v-model="registry.condicao_pagamento"
                            type="text"
                        ></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col col-12">
                        <b-form-group
                        id="input-group-21"
                        label="Validade da Proposta:"
                        label-for="validade_proposta"
                        description=""
                        >
                        <b-form-input
                            id="validade_proposta"
                            v-model="registry.validade_proposta"
                            type="text"
                        ></b-form-input>
                        </b-form-group>
                    </div>
                </div>




                <!-- ********** EQUIPAMENTOS ********** -->

                <div class="row">
                    <div class="col">
                        <br><br><hr>
                        <h3><i class='fas fa-truck text-primary'></i> Equipamentos</h3>
                    </div>
                </div>

                <div v-if="canUpdate" class="row mt-4">
                    <div class="col col-8">
                        <b-form-group id="input-group-6" label="Selecione Equipamento" label-for="input-6">
                            <!-- <b-form-select
                                id="input-6"
                                v-model="equipamento"
                                :options="equipamentos"
                                required
                                value-field="id"
                                text-field="nome"
                            ></b-form-select> -->
                            <v-select
                                v-model="equipamento"
                                :options="equipamentos"
                                value-field="id"
                                inputId="id"
                                label="nome"
                                name="paciente"
                                id="paciente"
                            ></v-select>
                        </b-form-group>
                        
                    </div>
                    <div class="col col-2">
                            <b-form-group
                            id="input-7"
                            label="Quantidade:"
                            label-for="qtd"
                            >
                            <b-form-input
                                id="qtd"
                                v-model="equipamentoQtd"
                            ></b-form-input>
                            </b-form-group>
                        </div>
                    <div class="col col-2">
                        <h1></h1><br>
                        <b-button
                        size="sm"
                        variant="success"
                        v-b-tooltip.hover
                        title="Incluir Equipamento"
                        class="mr-4 ml-4"
                        @click="equip_Add()"
                        >
                        <i class="fas fa-plus ml-2 mr-2"></i>
                        </b-button>
                    </div>
                </div>
                <div class="row">
                    <table
                        class="table table-striped table-hover table-lg mb-0 requests-table mt-3 border-1"
                    >
                        <thead>
                        <!-- class="text-white" -->
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th class="text-right">Valor</th>
                            <th class="text-right">Quantidade</th>
                            <th class="text-right">Subtotal</th>
                            <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(rowEqp, indexEqp) in equipamentos_orcamento" :key="rowEqp.id">
                            <td>{{ rowEqp.nome }}</td>
                            <td>{{ rowEqp.descricao }}</td>
                            <td class="text-right">{{ numeroBR(rowEqp.valor) }}</td>
                            <td class="text-right">{{ numeroBR(rowEqp.qtd) }}</td>
                            <!-- <td class="text-right" style="width: 8rem;">
                                <b-form-input
                                    id="equip_qtd"
                                    v-model="rowEqp.qtd"
                                    required
                                ></b-form-input>
                            </td> -->
                            <td class="text-right">R$ {{ numeroBR(rowEqp.valor * rowEqp.qtd) }}</td>
                            <td v-if="canUpdate" class="text-center">
                                <a @click="equip_Delete(indexEqp)"><i class="far fa-trash-alt text-danger"></i></a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>






                    <!-- ********** ATIVIDADES ********** -->

                    <div class="row">
                        <div class="col">
                            <br><br><hr>
                            <h3><i class='fas fa-tools text-primary'></i> Atividades</h3>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-5">
                            <b-form-group
                            id="input-4"
                            label="Descrição:"
                            label-for="descricao"
                            >
                            <b-form-input
                                id="descricao"
                                v-model="atividadeNova.descricao"
                                ref="atividadeNovaDescricao"
                            ></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col col-2">
                            <b-form-group
                            id="input-5"
                            label="Código:"
                            label-for="codigo"
                            >
                            <b-form-input
                                id="codigo"
                                v-model="atividadeNova.codigo"
                            ></b-form-input>
                            </b-form-group>
                        </div>
                        
                        <div class="col col-2">
                            <b-form-group
                            id="input-6"
                            label="Valor:"
                            label-for="valor"
                            >
                            <b-form-input
                                id="valor"
                                v-model="atividadeNova.valor_unit"
                            ></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col col-1">
                            <b-form-group
                            id="input-7"
                            label="Quantidade:"
                            label-for="qtd"
                            >
                            <b-form-input
                                id="qtd"
                                v-model="atividadeNova.qtd"
                            ></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col col-1">
                            <h1></h1><br>
                            <b-button
                            size="sm"
                            variant="success"
                            v-b-tooltip.hover
                            title="Incluir Atividade"
                            class="mr-4 ml-4"
                            @click="atividade_Add()"
                            >
                            <i class="fas fa-plus ml-2 mr-2"></i>
                            </b-button>
                        </div>
                        
                    </div>

                    <div class="row">
                        <table
                            class="table table-striped table-hover table-lg mb-0 requests-table mt-3 border-1"
                        >
                            <thead>
                            <!-- class="text-white" -->
                            <tr>
                                <th>Descriçao da atividade</th>
                                <th class="text-center">Codigo</th>
                                <th class="text-right">Valor</th>
                                <th class="text-right">Quantidade</th>
                                <th class="text-right">Subtotal</th>
                                <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(rowAtv, indexAtv) in atividades_orcamento" :key="rowAtv.id">
                                <td>{{ rowAtv.descricao }}</td>
                                <td class="text-center">{{ rowAtv.codigo }}</td>
                                <td class="text-right">{{ numeroBR( rowAtv.valor_unit ) }}</td>
                                <td class="text-right">{{ numeroBR(rowAtv.qtd) }}</td>
                                <td class="text-right">R$ {{ numeroBR( rowAtv.valor_unit * rowAtv.qtd) }}</td>
                                <td v-if="canUpdate" class="text-center">
                                <a @click="atividade_Delete(indexAtv)"><i class="far fa-trash-alt text-danger"></i></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>




                    <!-- ********** FUNCOES ********** -->

                    <div class="row">
                        <div class="col">
                            <br><br><hr>
                            <h3><i class='fas fa-user-cog text-primary'></i> Funções</h3>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col col-5">
                            <b-form-group
                            id="input-group-41" label="Função:" label-for="input-41"
                            >
                                <!-- <b-form-select
                                    id="input-41"
                                    v-model="funcao"
                                    :options="funcoes"
                                    value-field="id"
                                    text-field="nome"
                                ></b-form-select> -->
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

                        <div class="col col-2">
                            <b-form-group
                            id="input-5"
                            label="Qtd Colaboradores:"
                            label-for="qtd_colaboradores"
                            >
                            <b-form-input
                                id="qtd_colaboradores"
                                v-model="funcaoNova.qtd_colaboradores"
                                type="number"
                            ></b-form-input>
                            </b-form-group>
                        </div>
                        
                        <div class="col col-2">
                            <b-form-group
                            id="input-6"
                            label="Horas Normais:"
                            label-for="horas"
                            >
                            <b-form-input
                                id="horas"
                                v-model="funcaoNova.horas"
                                type="number"
                            ></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col col-2">
                            <b-form-group
                            id="input-7"
                            label="Horas Extras:"
                            label-for="horas_extras"
                            >
                            <b-form-input
                                id="horas_extras"
                                v-model="funcaoNova.horas_extras"
                                type="number"
                            ></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col col-1">
                            <h1></h1><br>
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
                    </div>

                    <div class="row">
                        <table
                            class="table table-striped table-hover table-lg mb-0 requests-table mt-3 border-1"
                        >
                            <thead>
                            <!-- class="text-white" -->
                            <tr>
                                <th>Funçao</th>
                                <th class="text-right">Qtd Colab</th>
                                <th class="text-right">Horas</th>
                                <th class="text-right">Hora Extras</th>
                                <th class="text-right">Subtotal</th>
                                <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(rowFunc, indexFunc) in funcoes_orcamento" :key="rowFunc.id">
                                <td>{{ rowFunc.nome }}</td>
                                <td class="text-right">{{ numeroBR(rowFunc.qtd_colaboradores) }}</td>
                                <td class="text-right">{{ numeroBR(rowFunc.horas) }}</td>
                                <td class="text-right">{{ numeroBR(rowFunc.horas_extras) }}</td>
                                <td class="text-right">R$ {{numeroBR(rowFunc.subtotal)}}</td>
                                <td v-if="canUpdate" class="text-center">
                                    <a @click="funcoes_Delete(indexFunc)"><i class="far fa-trash-alt text-danger"></i></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>





                    <!-- ********** EQUIPAMENTOS ********** -->

                    <div class="row">
                        <div class="col">
                            <br><br><br><hr>
                            <h3><i class="fas fa-file-invoice-dollar text-success"></i> Total do Orçamento</h3>
                        </div>
                    </div>
                    <div class="row">
                        <table
                            class="table table-striped table-hover table-lg mb-0 requests-table mt-3 border-1"
                        >
                            <tr>
                                <td>Valores totais de Equipamentos</td>
                                <td>R$ {{numeroBR(equipamentoTotal)}}</td>
                            </tr>
                            <tr>
                                <td>Valores totais de Atividades</td>
                                <td>R$ {{numeroBR(atividadeTotal)}}</td>
                            </tr>
                            <tr>
                                <td>Valores totais de Funções</td>
                                <td>R$ {{numeroBR(funcaoTotal)}}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><h5>R$ {{numeroBR(valorTotalOrcamento)}}</h5></td>
                            </tr>
                        </table>
                    </div>






                

                <div class="row"><div class="col">&nbsp;<br></div></div>


            </Widget>
            </b-overlay>
        </div>
    </div>


    <!-- BOTOES - INICIO -->
    <div class="row mt-3">
        <div class="col">
            <Widget    
                customHeader
                style="width:100%"
            >
                <b-button v-if="canUpdate" :disabled="!canSave" size="sm" variant="primary" v-b-tooltip.hover title="Salvar" class="mr-4" @click="orcamento_processar()"><i class="fas fa-save ml-2 mr-2"></i></b-button>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b-button v-if="canUpdate && registry.uuid!=null && !canSave" :disabled="!canSave" size="sm" variant="success" v-b-tooltip.hover title="Finalizar Orçamento" class="mr-4 ml-4" @click="newVersion()">
                    <i class="fas fa-file-signature ml-2 mr-2"></i>
                </b-button>
                <b-button v-if="canUpdate && registry.uuid!=null && !canSave" :disabled="!canSave" size="sm" variant="info" v-b-tooltip.hover title="Enviar para Cliente" class="mr-4 ml-4" @click="newVersion()">
                    <i class="fas fa-file-export ml-2 mr-2"></i>
                </b-button>
                
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b-button v-if="canUpdate && registry.uuid!=null" size="sm" variant="warning" v-b-tooltip.hover title="Nova Versão" class="mr-4 ml-4" @click="newVersion()">
                    <i class="far fa-copy ml-2 mr-2"></i>
                </b-button>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="registry.uuid!=null && !canSave">
                    <span v-if="registry.status=='E'">
                        <b-button v-if="canUpdate" size="sm" variant="success" v-b-tooltip.hover title="Vendido" class="mr-4 ml-4" @click="ativar()">
                            <i class="far fa-thumbs-up ml-2 mr-2"></i>
                        </b-button>
                        <b-button v-if="canUpdate" size="sm" variant="danger" v-b-tooltip.hover title="Encerrado" class="mr-4 ml-4" @click="inativar()">
                            <i class="far fa-thumbs-down ml-2 mr-2"></i>
                        </b-button>
                    </span>
                </span>
                
                <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="registry.uuid!=null">
                    <span v-if="registry.status=='A'">
                        <b-button v-if="canUpdate" size="sm" variant="warning" v-b-tooltip.hover title="Inativar" class="mr-4 ml-4" @click="inativar()">
                            <i class="fas fa-ban ml-2 mr-2"></i>
                        </b-button>
                    </span>
                    <span v-else>
                        <b-button v-if="canUpdate" size="sm" variant="success" v-b-tooltip.hover title="Ativar" class="mr-4 ml-4" @click="ativar()">
                            <i class="fas fa-ban ml-2 mr-2"></i>
                        </b-button>
                    </span>
                </span> -->

                <span class="float-right">
                    <b-button v-if="registry.status=='E'" size="sm" variant="default" v-b-tooltip.hover title="Imprimir" class="mr-4 ml-4" @click="newVersion()">
                        <i class="fas fa-print ml-2 mr-2"></i>
                    </b-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b-button size="sm" variant="default" v-b-tooltip.hover title="Voltar para Lista" class="float-right" @click="backToList()">
                    <i class="far fa-list-alt ml-2 mr-2"></i>
                </b-button>
                </span>

                
            </Widget>
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
            canUpdate: true,
            canGet: false,
            canNovaVersao: true,
            canUpdateCliente: true,
            ////
            processando: false,
            registry: { id: null, index: null, uuid: null, nome: null, status: "D", fk_cliente: {nome: null}, fk_versao: [] },
            // registers: {data: [] },

            clientes: [],
            cliente: {},

            equipamentos: [],
            equipamento: {},
            equipamentos_orcamento: [],
            equipamentoTotal: 0,
            equipamentoQtd: 1,

            atividades_orcamento: [],
            atividadeNova: {descricao: "", qtd: 0, valor_unit: 0 },
            atividadeTotal: 0,

            funcoes:[],
            funcao: {},
            funcaoNova: { qtd_colaboradores: 1, horas: 0, horas_extras: 0},
            funcoes_orcamento: [],
            funcaoTotal: 0,
        }
    },
    methods: {
        getData(){
            if(this.$route.params.uuid){
                this.registry.uuid = this.$route.params.uuid
                this.registry.codigo = 0
                this.registry.versao = 0
                this.registry.status = "E"
                this.registry.nome = "Erro getCliente"
                this.registry.fk_cliente = {nome: null}
                this.canUpdateCliente = false
                //Passou UUID - Procurar na base

                this.processando = true;
                this.$http({
                    method: 'get',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/"+this.$route.params.uuid,
                    // url: "http://127.0.0.1:8000/api/orcamentos/"+this.$route.params.uuid,
                })
                .then((result) => {
                    this.processando = false;
                    this.registry = result.data;
                    // console.log("getOrcamento");
                    // console.log(result)

                    this.atividades_orcamento = this.registry.fk_atividades
                    this.atividadeTotal = this.registry.atividadeTotal

                    this.equipamentos_orcamento = this.registry.fk_equipamentos
                    this.equipamentoTotal = this.registry.equipamentoTotal
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.processando = false;
                    this.showMessage('Erro na conexão [Orcamento]. Acione o suporte.', 'danger');
                    this.erroConexao(error);
                });



            } else {
                this.getClientes()
            }
        },
        getClientes() {
            // this.processando = true;
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API + "/api/cad/clientes?all=1",
            })
            .then((result) => {
                // this.processando = false;
                this.clientes = result.data;
                // this.cliente = this.clientes[0].id
                this.cliente = this.clientes[0]

                // console.log(result)
                // this.getModelos()
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.processando = false;
                this.showMessage('Erro na conexão [Clientes]. Acione o suporte.', 'danger');
                this.erroConexao(error);
            });
        },
        getEquipamentos() {
            if(this.canUpdate){
                // this.processando = true;
                this.$http({
                    method: 'get',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/cad/equipamentos?all=1",
                })
                .then((result) => {
                // this.processando = false;
                this.equipamentos = result.data;
                // this.equipamento = this.equipamentos[0].id
                this.equipamento = this.equipamentos[0]
                // console.log(result)
                // this.getModelos()
                })
                .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                // this.processando = false;
                this.showMessage('Erro na conexão[Equipamentos]. Acione o suporte.', 'danger');
                this.erroConexao(error);
                });
            }
        },
        getFuncoes() {
            if(this.canUpdate){
                // this.processando = true;
                this.$http({
                    method: 'get',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/cad/funcoes?all=1",
                })
                .then((result) => {
                // this.processando = false;
                this.funcoes = result.data;
                // this.funcao = this.funcoes[0].id
                this.funcao = this.funcoes[0]
                // console.log(result)
                // this.getModelos()
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

        //////// ORCAMENTO
        orcamento_processar(){
            if(this.registry.uuid==""||this.registry.uuid==null){
                this.orcamento_save()
            } else {
                this.orcamento_update()
            }
        },
        orcamento_save(){
            this.processando = true;

            let selecionado = this.clientes.find((data) => data.id === this.cliente);

            var bodyFormData = new FormData();
            bodyFormData.append("uuid_cliente", selecionado.uuid);
            bodyFormData.append("contato_nome", this.registry.contato_nome);
            bodyFormData.append("contato_fone", this.registry.contato_fone);
            bodyFormData.append("contato_email", this.registry.contato_email);
            bodyFormData.append("referencia", this.registry.referencia);
            bodyFormData.append("condicao_pagamento", this.registry.condicao_pagamento);
            bodyFormData.append("validade_proposta", this.registry.validade_proposta);

            bodyFormData.append("atividades", JSON.stringify(this.atividades_orcamento) );

            this.$http({
                method: 'post',
                url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos",
                // url: "http://127.0.0.1:8000/api/orcamentos",
                data: bodyFormData
            })
            .then((result) => {
                this.processando = false;
                this.registry = result.data;
                // console.log(result)
                // this.getModelos()
                this.showMessage("Orçamento salvo com sucesso.","success");
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.processando = false;
                this.showMessage('Erro na conexão[Orcamento-Save]. Acione o suporte.', 'danger');
                this.erroConexao(error);
            });
        },

        orcamento_update(){
            this.processando = true 
            this.$http({
                method: 'patch',
                url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos",
                data: this.registry
            })
            .then(() => {
                this.processando = false;
                // this.registry = result.data;
                // console.log(result)
                // this.getModelos()
                this.showMessage("Orçamento atualizado com sucesso.","success");
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.processando = false;
                this.showMessage('Erro na conexão[Orcamento-Patch]. Acione o suporte.', 'danger');
                this.erroConexao(error);
            });
        },

        ///////////// EQUIPAMENTO
        equip_Add(){
            // let selecionado = this.equipamentos.find((data) => data.id === this.equipamento);
            // selecionado.qtd = this.equipamentoQtd
            // this.equipamentoTotal = this.equipamentoTotal + ( parseFloat(selecionado.qtd) * parseFloat(selecionado.valor) )
            // this.equipamentos_orcamento.push(selecionado);

            if(!this.equipamento){
                alert("Selecione um equipamento")
                return
            }

            if(isNaN(this.equipamentoQtd)){
                alert("Digite uma quantidade válida.")
                return
            }
            if(this.equipamentoQtd==null || this.equipamentoQtd==""){
                alert("Digite uma quantidade.")
                return
            }
            if(this.equipamentoQtd<=0){
                alert("Digite uma quantidade maior que zero")
                return
            }

            if(this.equipamento){

                //verifica se equipamento ja foi incluida
                let existe = this.equipamentos_orcamento.find((data) => data.id === this.equipamento.id);
                if(existe){
                    alert("Equipamento já incluído")
                    return
                }
                

                if(this.registry.uuid!=null &&this.registry.uuid!=""&&this.registry.uuid!="null"){
                    // console.log(this.equipamento);
                    this.processando = true
                    var bodyFormData = new FormData();
                    bodyFormData.append("uuid", this.registry.fk_versao[0].uuid);
                    bodyFormData.append("id_equipamento", this.equipamento.id);
                    bodyFormData.append("qtd", this.equipamentoQtd);

                    this.$http({
                        method: 'post',
                        url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentoversaoequipamentos",
                        // url: "http://127.0.0.1:8000/api/orcamentoversaoequipamentos",
                        data: bodyFormData
                    })
                    .then((result) => {
                        this.processando = false;

                        this.equipamento.qtd = this.equipamentoQtd
                        this.equipamentoTotal = this.equipamentoTotal + ( parseFloat(this.equipamento.qtd) * parseFloat(this.equipamento.valor) )
                        this.equipamentos_orcamento.push(this.equipamento)
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.log(error);
                        this.processando = false;
                        this.showMessage('Erro na conexão[Equipamento-Save]. Acione o suporte.', 'danger');
                        this.erroConexao(error);
                    });
                } else {

                    this.equipamento.qtd = this.equipamentoQtd
                    this.equipamentoTotal = this.equipamentoTotal + ( parseFloat(this.equipamento.qtd) * parseFloat(this.equipamento.valor) )
                    this.equipamentos_orcamento.push(this.equipamento)
                }

            } else {
                alert("Selecione um equipamento")
            }

            
            
        },
        equip_Delete(index){
            var mensagem = "Deseja realmente remover o equipamento "+this.equipamentos_orcamento[index].nome+"?"
            if(confirm(mensagem)){

                if(this.equipamentos_orcamento[index].uuid){
                    this.processando = true
                    this.$http({
                        method: 'delete',
                        url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentoversaoequipamentos",
                        // url: "http://127.0.0.1:8000/api/orcamentoversaoequipamentos",
                        data: { uuid: this.equipamentos_orcamento[index].uuid }
                    })
                    .then(() => {
                        this.processando = false;
                        this.equipamentoTotal = this.equipamentoTotal - ( this.equipamentos_orcamento[index].qtd * this.equipamentos_orcamento[index].valor)
                        this.equipamentos_orcamento.splice(index, 1)
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.log(error);
                        this.processando = false;
                        this.showMessage('Erro na conexão[Atividade-Delete]. Acione o suporte.', 'danger');
                        this.erroConexao(error);
                    });
                } else {
                    this.equipamentoTotal = this.equipamentoTotal - ( this.equipamentos_orcamento[index].qtd * this.equipamentos_orcamento[index].valor)
                    this.equipamentos_orcamento.splice(index, 1)
                }


                
            }
        },
        


        ////////////// ATIVIDADE

        atividade_Add(){
            if(this.atividadeNova.descricao.length<3 || this.atividadeNova.descricao==""){
                alert("Digite uma descrição válida.")
                return
            }
            if(this.atividadeNova.qtd<0 || this.atividadeNova.qtd==""){
                alert("Digite uma quantidade válida.")
                return
            }
            if(this.atividadeNova.valor_unit<0 || this.atividadeNova.valor_unit==""){
                alert("Digite um valor válido.")
                return
            }
            if(this.registry.uuid!=null &&this.registry.uuid!=""&&this.registry.uuid!="null"){
                this.processando = true
                var bodyFormData = new FormData();
                bodyFormData.append("uuid", this.registry.fk_versao[0].uuid);
                bodyFormData.append("descricao", this.atividadeNova.descricao);
                bodyFormData.append("valor_unit", this.atividadeNova.valor_unit);
                bodyFormData.append("qtd", this.atividadeNova.qtd);
                bodyFormData.append("codigo", this.atividadeNova.codigo);

                this.$http({
                    method: 'post',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentoversaoatividades",
                    // url: "http://127.0.0.1:8000/api/orcamentoversaoatividades",
                    data: bodyFormData
                })
                .then((result) => {
                    this.processando = false;
                    this.atividades_orcamento.push(result.data)
                    this.atividadeTotal = this.atividadeTotal + (this.atividadeNova.valor_unit * this.atividadeNova.qtd)
                    this.atividadeNova = { descricao: "", codigo: "", valor_unit: 0, qtd: 0 }
                    this.$refs.atividadeNovaDescricao.focus()
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.processando = false;
                    this.showMessage('Erro na conexão[Atividade-Save]. Acione o suporte.', 'danger');
                    this.erroConexao(error);
                });
            } else {
                this.atividades_orcamento.push(this.atividadeNova)
                this.atividadeTotal = this.atividadeTotal + (this.atividadeNova.valor_unit * this.atividadeNova.qtd)
                this.atividadeNova = { descricao: "", codigo: "", valor_unit: 0, qtd: 0 }
                this.$refs.atividadeNovaDescricao.focus()
            }

            // this.atividadeTotal = this.atividadeTotal + 1.3
            //////// Mudar a linha acima para fazer o calculo
        },

        atividade_Delete(index){
            var mensagem = "Deseja realmente remover a atividade?"
            if(confirm(mensagem)){
                if(this.atividades_orcamento[index].uuid){
                    this.processando = true
                    this.$http({
                        method: 'delete',
                        url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentoversaoatividades",
                        // url: "http://127.0.0.1:8000/api/orcamentoversaoatividades",
                        data: { uuid: this.atividades_orcamento[index].uuid }
                    })
                    .then(() => {
                        this.processando = false;
                        this.atividades_orcamento.splice(index, 1)
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.log(error);
                        this.processando = false;
                        this.showMessage('Erro na conexão[Atividade-Delete]. Acione o suporte.', 'danger');
                        this.erroConexao(error);
                    });
                } else {
                    this.atividades_orcamento.splice(index, 1)
                }
            }
        },


        /////////// FUNCOES

        funcoes_Add(){

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

            if(isNaN(this.funcaoNova.horas)){
                alert("Digite uma quantidade de horas válida (número).")
                return
            } 
            if(isNaN(this.funcaoNova.horas_extras)){
                alert("Digite uma quantidade de horas extras válida (número).")
                return
            } 

            if(
                (this.funcaoNova.horas==null || this.funcaoNova.horas=="" || this.funcaoNova.horas<=0) &&
                (this.funcaoNova.horas_extras==null || this.funcaoNova.horas_extras=="" || this.funcaoNova.horas_extras<=0) 
            ){
                alert("Digite alguma quantidade de horas.")
                return
            }

            //verifica se funcao ja foi incluida
            let existe = this.funcoes_orcamento.find((data) => data.id === this.funcao.id);
            if(existe){
                alert("Função já incluída")
                return
            }

            
            
            // else {
            //     if(this.funcaoNova.horas==null || this.funcaoNova.horas=="" || this.funcaoNova.horas<=0){
            //         alert("Digite uma quantidade de horas válida")
            //         return
            //     }
            // }

            // let selecionado = this.funcoes.find((data) => data.id === this.funcao);
            // this.funcaoNova.id = selecionado.id
            // this.funcaoNova.nome = selecionado.nome
            // this.funcaoNova.valor_hora = selecionado.valor_hora
            // this.funcaoNova.valor_hora_noturno = selecionado.valor_hora_noturno
            // this.funcaoNova.subtotal = ( parseFloat(this.funcaoNova.horas) * parseFloat(selecionado.valor_hora) ) +
                            // ( parseFloat(this.funcaoNova.horas_extras) * parseFloat(selecionado.valor_hora_noturno) )
            
            this.funcao.qtd_colaboradores = this.funcaoNova.qtd_colaboradores
            this.funcao.horas = this.funcaoNova.horas
            this.funcao.horas_extras = this.funcaoNova.horas_extras
            this.funcao.subtotal = 
                    (   (parseFloat(this.funcao.horas) * parseFloat(this.funcao.valor_hora))
                        +
                        (parseFloat(this.funcao.horas_extras) * parseFloat(this.funcao.valor_hora_noturno))
                    ) * this.funcao.qtd_colaboradores

            // console.log(this.funcaoNova.subtotal);
            this.funcaoTotal = this.funcaoTotal + this.funcaoNova.subtotal

            // this.funcoes_orcamento.push( this.funcaoNova )
            // this.funcoes_orcamento.push( this.funcao )
            this.funcoes_orcamento.splice(0,0,this.funcao)
            this.funcaoNova = { id: null, nome: null, qtd_colaboradores: 1, horas: 0, horas_extras: 0}
            // this.funcao.qtd_colaboradores = 1
            // this.funcao.horas = 0
            // this.funcao.horas_extra = 0
        },

        funcoes_Delete(index){
            var mensagem = "Deseja realmente remover a função "+this.funcoes_orcamento[index].nome+"?"
            if(confirm(mensagem)){
                this.funcaoTotal = this.funcaoTotal - this.funcoes_orcamento[index].subtotal
                this.funcoes_orcamento.splice(index, 1)
            }
        },



        backToList(){
            this.$router.push({ name: 'orcamento-lista'})
        },
    },
    computed: {
        canSave(){
            if(!this.cliente){
                return false
            }
            if(this.registry.status=="D"){
                if( (this.equipamentoTotal+this.atividadeTotal+this.funcaoTotal)>0 ){
                    return true
                }
            }
            return false
        },
        valorTotalOrcamento(){
            return this.equipamentoTotal+this.atividadeTotal+this.funcaoTotal
        },


    },
    created(){
        //Validando permissao e secao
        // this.mccUsuarioValidar('privilegio_para_acesso_na_pagina')
        this.$store.commit('setNomePagina', '<i class="far fa-file-alt"></i>&nbsp;Orçamento')

        this.getData()
        this.getEquipamentos()
        this.getFuncoes()
    }
};
</script>