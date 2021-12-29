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

            <div style="width: 1rem;" class="ml-4 mb-0 p-0">
                
            </div>
            <div style="width: 23rem;">
                <b-card :bg-variant="colorStatus()" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
                    <b-card-text>
                        <span style="font-size:85%;"><i class="fas fa-tag"></i> Status</span><br>
                        <span class="p-0 mt-0" style="font-size:170%;">{{textStatus()}}</span>
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
                        <b-form-group
                            id="input-inputtipo" label="Tipo:" label-for="inputtipo"
                        >
                            <v-select
                                v-if="registry.status=='D'"
                                v-model="tipo"
                                :options="listaTipos"
                                value-field="id"
                                inputId="id"
                                label="nome"
                                name="inputtipo"
                                id="inputtipo"
                            ></v-select>
                            <b-form-input
                                v-else
                                id="input-tipo"
                                v-model="tipo.nome"
                                readonly
                            ></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col col-6">
                        <b-form-group id="input-group-4" label="Nome do Responsavel:" label-for="input-4">
                        <b-form-input
                            :disabled="!canUpdate || !canChange"
                            id="input-2"
                            v-model="registry.contato_nome"
                            required
                        ></b-form-input>
                        </b-form-group>
                    </div>
                <!-- </div>

                <div class="row"> -->
                    <div class="col col-6">
                        <b-form-group
                        id="input-group-2"
                        label="E-mail do Responsável:"
                        label-for="input-2"
                        description=""
                        >
                        <b-form-input
                            :disabled="!canUpdate || !canChange"
                            id="input-2"
                            v-model="registry.contato_email"
                            type="email"
                            required
                        ></b-form-input>
                        </b-form-group>
                    </div>

                    <!-- <div class="col col-6">
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
                    </div> -->
                </div>

                <div class="row mt-4">
                    <div class="col col-6">
                        <b-form-group id="input-group-solicitante_nome" label="Nome do Solicitante:" label-for="solicitante_nome">
                        <b-form-input
                            :disabled="!canUpdate || !canChange"
                            id="solicitante_nome"
                            v-model="registry.solicitante_nome"
                            required
                        ></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col col-6">
                        <b-form-group id="input-group-local_execucao" label="Local de Execução:" label-for="local_execucao">
                        <b-form-input
                            :disabled="!canUpdate || !canChange"
                            id="local_execucao"
                            v-model="registry.local_execucao"
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
                            :disabled="!canUpdate || !canChange"
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
                            :disabled="!canUpdate || !canChange"
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
                            :disabled="!canUpdate || !canChange"
                            id="validade_proposta"
                            v-model="registry.validade_proposta"
                            type="text"
                        ></b-form-input>
                        </b-form-group>
                    </div>
                </div>


                <template v-if="registry.uuid!=null">

                <!-- ********** EQUIPAMENTOS ********** -->

                <div class="row">
                    <div class="col">
                        <br><br><hr>
                        <h3><i class='fas fa-truck text-primary'></i> Equipamentos</h3>
                    </div>
                </div>

                <div v-if="canUpdate && canChange" class="row mt-4">
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
                            <th v-if="canUpdate && canChange" style="width:50px" v-b-tooltip.hover title="Editar"></th>
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
                            <td v-if="canUpdate && canChange" class="text-center">
                                <a @click="equip_Delete(indexEqp)"><i class="far fa-trash-alt text-danger"></i></a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>






                    <!-- ********** ATIVIDADES - HORA/HOMEM ********** -->

                    <div class="row">
                        <div class="col">
                            <br><br><hr>
                            <h3><i class='fas fa-tools text-primary'></i>&nbsp;<i class='fas fa-user-friends text-secondary'></i>&nbsp;Atividades - Hora/Homem</h3>
                        </div>
                    </div>

                    <div v-if="canUpdate && canChange" class="row">
                        <div class="col col-8">
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

                        <!-- <div class="col col-2">
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
                        </div> -->

                        <div class="col col-1">
                            <h1></h1><br>
                            <b-button
                                size="sm"
                                variant="success"
                                v-b-tooltip.hover
                                title="Incluir Atividade"
                                class="mr-4 ml-4"
                                @click="atividadeHH_Add()"
                                >
                                <i class="fas fa-plus ml-2 mr-2"></i>
                            </b-button>
                        </div>
                        
                    </div>

                    <div class="row">
                        <!-- table-striped  -->
                        <table
                            class="table table-hover table-lg mb-0 mt-3 border-1 p-0"
                        >
                            <thead>
                            <!-- class="text-white" -->
                            <tr>
                                <th>Descriçao da atividade</th>
                                <th class="text-center">Codigo</th>
                                <!-- <th class="text-right">Valor</th> -->
                                <!-- <th class="text-right">Quantidade</th> -->
                                <th class="text-right">Subtotal</th>
                                <th v-if="canUpdate && canChange" style="width:50px" v-b-tooltip.hover title="Funções"></th>
                                <th v-if="canUpdate && canChange" style="width:50px" v-b-tooltip.hover title="Excluir"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(rowAtv, indexAtv) in atividades_orcamento" :key="rowAtv.id">
                                <td>{{ rowAtv.descricao }}</td>
                                <td class="text-center">{{ rowAtv.codigo }}</td>
                                <!-- <td class="text-right">{{ numeroBR( rowAtv.valor_unit ) }}</td> -->
                                <!-- <td class="text-right">{{ numeroBR(rowAtv.qtd) }}</td> -->
                                <!-- <td class="text-right">R$ {{ numeroBR( rowAtv.valor_unit * rowAtv.qtd) }}</td> -->
                                <td class="text-right">R$ {{ numeroBR( rowAtv.subtotal) }}</td>
                                <td v-if="canUpdate && canChange" class="text-center">
                                    <a @click="atividade_Funcao(indexAtv)"><i class="fas fa-user-cog text-primary"></i></a>
                                </td>
                                <td v-if="canUpdate && canChange" class="text-center">
                                    <a @click="atividade_Delete(indexAtv)"><i class="far fa-trash-alt text-danger"></i></a>
                                </td>
                            </tr>

                            <!-- <tr v-for="(rowAtv, indexAtv) in atividades_orcamento" :key="rowAtv.id" >
                                <td colspan="6">
                                    <table class="w-100 border-0 p-0">
                                        <tr>
                                            <td>{{ rowAtv.descricao }}</td>
                                            <td class="text-center">{{ rowAtv.codigo }}</td>
                                            <td class="text-right">{{ numeroBR( rowAtv.valor_unit ) }}</td>
                                            <td class="text-right">{{ numeroBR(rowAtv.qtd) }}</td>
                                            <td class="text-right">R$ {{ numeroBR( rowAtv.valor_unit * rowAtv.qtd) }}</td>
                                            <td v-if="canUpdate" class="text-center">
                                                <a @click="atividade_Delete(indexAtv)"><i class="far fa-trash-alt text-danger"></i></a>
                                            </td>
                                        </tr>
                                    </table>
                                    <table
                                        class="table table-hover table-lg mb-0 mt-3 border-1 p-0"
                                    >
                                        <thead>
                                        <tr>
                                            <th>Função - Nome</th>
                                            <th class="text-center">Qtd Colab</th>
                                            <th class="text-right">Horas</th>
                                            <th class="text-right">HE 50%</th>
                                            <th class="text-right">HE 100%</th>
                                            <th class="text-right">Adicional Noturnl</th>
                                            <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Excluir"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(rowFunAtv, indexFunAtv) in atividades_orcamento.fk_funcoes" :key="rowFunAtv.id" >
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td v-if="canUpdate" class="text-center">
                                                <a @click="atividadeFuncao_Del(indexFunAtv)"><i class="far fa-trash-alt text-danger"></i></a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <b-button
                                        size="sm"
                                        variant="success"
                                        v-b-tooltip.hover
                                        title="Incluir Função para a Atividade"
                                        class="mr-4 ml-4 mt-4"
                                        @click="atividadeFuncao_Add(indexAtv)"
                                    >
                                        <i class="fas fa-plus ml-2 mr-2"></i>
                                    </b-button>
                                    
                                </td>
                            </tr> -->


                                <!-- <tr>
                                    <td colspan="5" class="text-center"><i class='fas fa-user-cog text-primary'></i> Funções</td>
                                    <td v-if="canUpdate"></td>
                                </tr> -->
                            
                            </tbody>
                        </table>
                    </div>




                    <!-- ********** ATIVIDADES - PRECO FIXO ********** -->

                    <div class="row">
                        <div class="col">
                            <br><br><hr>
                            <h3><i class='fas fa-tools text-primary'></i>&nbsp;<i class='far fa-money-bill-alt text-secondary'></i>&nbsp;Atividades - Preço Fixo</h3>
                        </div>
                    </div>

                    <div v-if="canUpdate && canChange" class="row">
                        <div class="col col-7">
                            <b-form-group
                            id="input-4"
                            label="Descrição:"
                            label-for="descricao"
                            >
                            <b-form-input
                                id="descricao"
                                v-model="atividadeNovaPF.descricao"
                                ref="atividadeNovaPFDescricao"
                            ></b-form-input>
                            </b-form-group>
                        </div>

                        <!-- <div class="col col-2">
                            <b-form-group
                            id="input-5"
                            label="Código:"
                            label-for="codigo"
                            >
                            <b-form-input
                                id="codigo"
                                v-model="atividadeNovaPF.codigo"
                            ></b-form-input>
                            </b-form-group>
                        </div> -->
                        
                        <div class="col col-2">
                            <b-form-group
                            id="input-6"
                            label="Valor:"
                            label-for="valor"
                            >
                            <b-form-input
                                id="valor"
                                v-model="atividadeNovaPF.valor_unit"
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
                                v-model="atividadeNovaPF.qtd"
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
                                @click="atividadePF_Add()"
                                >
                                <i class="fas fa-plus ml-2 mr-2"></i>
                            </b-button>
                        </div>
                        
                    </div>

                    <div class="row">
                        <!-- table-striped  -->
                        <table
                            class="table table-hover table-lg mb-0 mt-3 border-1 p-0"
                        >
                            <thead>
                            <!-- class="text-white" -->
                            <tr>
                                <th>Descriçao da atividade</th>
                                <th class="text-center">Codigo</th>
                                <th class="text-right">Valor</th>
                                <th class="text-right">Quantidade</th>
                                <th class="text-right">Subtotal</th>
                                <th v-if="canUpdate && canChange" style="width:50px" v-b-tooltip.hover title="Excluir"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(rowAtv, indexAtv) in atividadesPF_orcamento" :key="rowAtv.id">
                                <td>{{ rowAtv.descricao }}</td>
                                <td class="text-center">{{ rowAtv.codigo }}</td>
                                <td class="text-right">{{ numeroBR( rowAtv.valor_unit ) }}</td>
                                <td class="text-right">{{ numeroBR(rowAtv.qtd) }}</td>
                                <td class="text-right">R$ {{ numeroBR( rowAtv.valor_unit * rowAtv.qtd) }}</td>
                                <td v-if="canUpdate && canChange" class="text-center">
                                    <a @click="atividade_Delete(indexAtv)"><i class="far fa-trash-alt text-danger"></i></a>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>




                    <!-- ********** FUNCOES ********** -->

                    <!-- <div class="row">
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
                    </div> -->





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
                            <!-- <tr>
                                <td>Valores totais de Funções</td>
                                <td>R$ {{numeroBR(funcaoTotal)}}</td>
                            </tr> -->
                            <tr>
                                <td></td>
                                <td><h5>R$ {{numeroBR(valorTotalOrcamento)}}</h5></td>
                            </tr>
                        </table>
                    </div>

                </template>




                

                <div class="row"><div class="col">&nbsp;<br></div></div>


            </Widget>
            </b-overlay>
        </div>
    </div>


    <!-- BOTOES - INICIO -->
    <div class="row mt-3">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget    
                customHeader
                style="width:100%"
            >

<!-- listaStatus: [
    { status: "D", descricao: "Em Solicitação", cor:"secondary"},
    { status: "V", descricao: "Aguardando Validação", cor:"secondary"},
    { status: "E", descricao: "Aguardando Aprovação", cor:"primary"},
    { status: "A", descricao: "Aprovado", cor:"success"},
    { status: "R", descricao: "Rejeitado/Cancelado", cor:"danger"},
    { status: "X", descricao: "Executado", cor:"info"},
    { status: "F", descricao: "Faturado", cor:"success"},
], -->

                <b-button :disabled="!(canUpdate && registry.status=='D')" size="sm" variant="primary" v-b-tooltip.hover title="Salvar" class="mr-4" @click="orcamento_processar()"><i class="fas fa-save ml-2 mr-2"></i></b-button>
                <b-button :disabled="!(canUpdate && canSave && registry.status=='D')" size="sm" variant="success" v-b-tooltip.hover title="Finalizar" class="mr-4 ml-4" @click="orcamento_finalizar()"><i class="fas fa-arrow-right ml-2 mr-2"></i></b-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b-button :disabled="!(canUpdate && registry.status!='D')" size="sm" variant="primary" v-b-tooltip.hover title="Mudar Status" class="mr-4" @click="orcamentoStatusChange()"><i class="fas fa-random ml-2 mr-2"></i></b-button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <b-button :disabled="!(canUpdate && registry.status!='D')" size="sm" variant="warning" v-b-tooltip.hover title="Nova Versão" class="mr-4 ml-4" @click="orcamentoNovaVersao()"><i class="far fa-copy ml-2 mr-2"></i></b-button>
                <b-button :disabled="disableBTNVersoes" size="sm" variant="default" v-b-tooltip.hover title="Versões Anteriores" class="mr-4 ml-4" @click="orcamentoVersoes()"><i class="far fa-copy ml-2 mr-2"></i></b-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <!-- <b-button disabled size="sm" variant="primary" v-b-tooltip.hover title="Enviar para Cliente" class="mr-4 ml-4" @click="orcamento_enviar()"><i class="far fa-paper-plane ml-2 mr-2"></i></b-button> -->
                <b-button :disabled="!(canUpdate && registry.status!='D') || disableBTNDownload" size="sm" variant="default" v-b-tooltip.hover title="Download" class="mr-4 ml-4" @click="orcamento_download()"><i class="fas fa-download ml-2 mr-2"></i></b-button>
                <b-button :disabled="!(canUpdate && registry.status!='D')" size="sm" variant="default" v-b-tooltip.hover title="Imprimir" class="mr-4 ml-4" @click="orcamento_imprimir()"><i class="fas fa-print ml-2 mr-2"></i></b-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b-button :disabled="!(canUpdate && registry.status=='D') || registry.uuid==null" size="sm" variant="danger" v-b-tooltip.hover title="Excluir" class="mr-4 ml-4" @click="orcamento_excluir()"><i class="far fa-trash-alt ml-2 mr-2"></i></b-button>



                <!-- <template v-if="canUpdate && registry.status=='D'">
                    <b-button size="sm" variant="primary" v-b-tooltip.hover title="Salvar" class="mr-4" @click="orcamento_processar()"><i class="fas fa-save ml-2 mr-2"></i></b-button>    
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </template>

                <template v-if="canUpdate && registry.status!='D' ">
                    <b-button size="sm" variant="primary" v-b-tooltip.hover title="Mudar Status" class="mr-4" @click="orcamentoStatusChange()"><i class="fas fa-random ml-2 mr-2"></i></b-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b-button size="sm" variant="warning" v-b-tooltip.hover title="Nova Versão" class="mr-4 ml-4" @click="newVersion()">
                        <i class="far fa-copy ml-2 mr-2"></i>
                    </b-button>
                </template> -->
                
                
                <!-- <b-button v-if="canUpdate && registry.uuid!=null" size="sm" variant="warning" v-b-tooltip.hover title="Nova Versão" class="mr-4 ml-4" @click="newVersion()">
                    <i class="far fa-copy ml-2 mr-2"></i>
                </b-button>

                <span v-if="canUpdate && registry.uuid!=null && (registry.status=='D' || registry.status=='E')">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b-button size="sm" variant="primary" v-b-tooltip.hover title="Enviar para Cliente" class="mr-4 ml-4" @click="orcamento_enviar()">
                        <i class="far fa-paper-plane ml-2 mr-2"></i>
                    </b-button>
                    &nbsp;&nbsp;&nbsp;
                    
                    <b-button size="sm" variant="default" v-b-tooltip.hover title="Imprimir" class="mr-4 ml-4" @click="orcamento_imprimir()">
                        <i class="fas fa-print ml-2 mr-2"></i>
                    </b-button>
                </span> -->

                
                <!-- <span v-if="registry.status=='E' && !canSave">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b-button v-if="canUpdate" size="sm" variant="success" v-b-tooltip.hover title="Aprovado pelo cliente" class="mr-4 ml-4" @click="ativar()">
                        <i class="far fa-thumbs-up ml-2 mr-2"></i>
                    </b-button>
                    <b-button v-if="canUpdate" size="sm" variant="danger" v-b-tooltip.hover title="Rejeitado" class="mr-4 ml-4" @click="inativar()">
                        <i class="far fa-thumbs-down ml-2 mr-2"></i>
                    </b-button>
                </span>

                <span v-if="canUpdate && registry.status=='A'">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b-button size="sm" variant="primary" v-b-tooltip.hover title="Marcar Executado" class="mr-4 ml-4" @click="newVersion()">
                        <i class="fas fa-cogs ml-2 mr-2"></i>
                    </b-button>
                </span>
                <span v-if="canUpdate && registry.status=='X'">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b-button size="sm" variant="primary" v-b-tooltip.hover title="Marcar Faturado" class="mr-4 ml-4" @click="newVersion()">
                        <i class="far fa-money-bill-alt ml-2 mr-2"></i>
                    </b-button>
                </span> -->






                <span class="float-right">
                    <!-- <b-button v-if="registry.status!='D' && registry.status!='V'" size="sm" variant="default" v-b-tooltip.hover title="Imprimir" class="mr-4 ml-4" @click="newVersion()">
                        <i class="fas fa-print ml-2 mr-2"></i>
                    </b-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                    <b-button size="sm" variant="default" v-b-tooltip.hover title="Voltar para Lista" class="float-right" @click="backToList()">
                    <i class="far fa-list-alt ml-2 mr-2"></i>
                </b-button>
                </span>

                
            </Widget>
            </b-overlay>
        </div>
    </div>
    <!-- BOTOES - FIM -->


<b-modal 
    id="mAtividadeFuncoes"
    size="xl"
    :title=this.modalAtividadeFuncoes
    button-size="sm"
    body-bg-variant="white"
    content-class="shadow"
    hide-footer
>
    <atividade-funcoes
        :atividade="atividadefuncao"
        :canUpdate="canUpdate"
        @atividade_Funcao_Atualizacao = "atividade_Funcao_Atualizacao"
    ></atividade-funcoes>

</b-modal>

<!-- size="lg" -->
<b-modal 
    id="mOrcamentoStatus"
    title="Alterar status do Orçamento"
    button-size="sm"
    body-bg-variant="white"
    content-class="shadow"
>
    <div class="row">
        <div class="col">
            <b-form-group
                id="ig-001" label="Novo Status:" label-for="novoStatus"
            >
                <v-select
                    v-model="novoStatus"
                    :options="listaStatus"
                    value-field="status"
                    inputId="status"
                    label="descricao"
                    name="novoStatus"
                    id="novoStatus"
                ></v-select>
            </b-form-group>
        </div>
    </div>

    <template v-slot:modal-footer="{ cancel }">
        <table class="w-100">
            <tr>
                <td class="text-right">
                    <b-button size="sm" variant="warning" v-b-tooltip.hover title="Fechar" @click="cancel()">
                        <i class="fas fa-times ml-2 mr-2"></i>
                    </b-button>
                    &nbsp;&nbsp;&nbsp;
                    <b-button size="sm" variant="primary" v-b-tooltip.hover title="Salvar" @click="OrcamentoStatusChangeExec()">
                        <i class="fas fa-save ml-2 mr-2"></i>
                    </b-button>
                </td>
            </tr>

        </table> 
    </template>

</b-modal>


<!-- MODAL - Versoes do Orcamento -->
<b-modal 
    id="mVersoes"
    size="xl"
    title="Versões do Orçamento"
    button-size="sm"
    body-bg-variant="white"
    content-class="shadow"
    
>
    <orcamento-versoes
        :orcamento="registry"
        :canUpdate="canUpdate"
        @atividade_Funcao_Atualizacao = "atividade_Funcao_Atualizacao"
    ></orcamento-versoes>

    <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="warning" v-b-tooltip.hover title="Fechar" @click="cancel()">
            <i class="fas fa-times ml-2 mr-2"></i>
        </b-button>
        <!-- <table class="w-100">
            <tr>
                <td class="text-right">
                    <b-button size="sm" variant="warning" v-b-tooltip.hover title="Fechar" @click="cancel()">
                        <i class="fas fa-times ml-2 mr-2"></i>
                    </b-button>
                    &nbsp;&nbsp;&nbsp;
                    <b-button size="sm" variant="primary" v-b-tooltip.hover title="Salvar" @click="OrcamentoStatusChangeExec()">
                        <i class="fas fa-save ml-2 mr-2"></i>
                    </b-button>
                </td>
            </tr>

        </table>  -->
    </template>

</b-modal>

<iframe id="iExec" name="iExec" frameborder="0" height="00" width="00" ></iframe>

</div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import atividadeFuncoes from '@/components/orcamento/atividadefuncoes'
import orcamentoVersoes from '@/components/orcamento/versoes'
export default {
    name: 'NomePagina',
    components: { Widget, atividadeFuncoes, orcamentoVersoes },
    data() {
        return {
            //// Privilegios
            canAdd: false,
            canUpdate: true,
            canGet: false,
            canNovaVersao: true,
            canUpdateCliente: true,
            canChange: true,
            ////
            processando: false,
            registry: { id: null, index: null, uuid: null, nome: null, status: "D", fk_cliente: {nome: null}, fk_versao: [] },
            // registers: {data: [] },
            // listaStatus: [
            //     { status: "V", descricao: "Aguardando Validação", cor:"secondary"},
            //     { status: "E", descricao: "Aguardando Aprovação", cor:"primary"},
            //     { status: "A", descricao: "Aprovado", cor:"success"},
            //     { status: "R", descricao: "Rejeitado/Cancelado", cor:"danger"},
            //     { status: "X", descricao: "Executado", cor:"info"},
            //     { status: "F", descricao: "Faturado", cor:"success"},
            // ],
            

            clientes: [],
            cliente: {},

            equipamentos: [],
            equipamento: {},
            equipamentos_orcamento: [],
            equipamentoTotal: 0,
            equipamentoQtd: 1,

            atividades_orcamento: [ ],
            atividadeNova: {descricao: "", qtd: 0, valor_unit: 0 },
            atividadeTotal: 0,
            atividadefuncao: {},
            modalAtividadeFuncoes: null,
            atividadeIndex: null,

            atividadesPF_orcamento: [ ],
            atividadeNovaPF: {descricao: "", qtd: 0, valor_unit: 0 },

            funcoes:[],
            funcao: {},
            funcaoNova: { qtd_colaboradores: 1, horas: 0, horas_extras: 0},
            funcoes_orcamento: [],
            funcaoTotal: 0,

            listaStatus: [
                // { status: "D", descricao: "Em Solicitação", cor:"secondary"},
                { status: "V", descricao: "Aguardando Validação", cor:"secondary"},
                { status: "E", descricao: "Aguardando Aprovação", cor:"primary"},
                { status: "A", descricao: "Aprovado", cor:"success"},
                { status: "R", descricao: "Rejeitado/Cancelado", cor:"danger"},
                { status: "X", descricao: "Executado", cor:"info"},
                { status: "F", descricao: "Faturado", cor:"success"},
            ],
            novoStatus: null,
            stsDescricao: null,
            stsCor: null,


            listaTipos: [
                {id: "D", nome: "On Demand"},
                {id: "C", nome: "Corretiva"},
            ],
            tipo: {},

            disableBTNDownload: false,

            disableBTNVersoes: true,

        }
    },
    methods: {
        // { status: "D", descricao: "Em Solicitação", cor:"secondary"},
        // { status: "V", descricao: "Aguardando Validação", cor:"secondary"},
        // { status: "E", descricao: "Aguardando Aprovação", cor:"primary"},
        // { status: "A", descricao: "Aprovado", cor:"success"},
        // { status: "R", descricao: "Rejeitado/Cancelado", cor:"danger"},
        // { status: "X", descricao: "Executado", cor:"info"},
        // { status: "F", descricao: "Faturado", cor:"success"},
        // displayStatus(registry){
        //     if(registry.status=='D') {
        //         return '<i class="fas fa-circle text-secondary"></i>'
        //     } else if(registry.status=='V') {
        //         return '<i class="fas fa-circle text-info"></i>'
        //     } else if(registry.status=='E') {
        //         return '<i class="fas fa-circle text-primary"></i>'
        //     } else if(registry.status=='A') {
        //         return '<i class="fas fa-circle text-success"></i>'
        //     } else if(registry.status=='R') {
        //         return '<i class="fas fa-circle text-danger"></i>'
        //     } else if(registry.status=='F') {
        //         return '<i class="fas fa-circle text-dark"></i>'
        //     } else {
        //         return '<i class="fas fa-circle text-warning"></i>'
        //     }
        // },
        
        textStatus(){
            if(this.registry.status=='D') {
                return 'Em Solicitação'
            } else if(this.registry.status=='V') {
                return 'Aguardando Validação'
            } else if(this.registry.status=='E') {
                return 'Aguardando Aprovação'
            } else if(this.registry.status=='A') {
                return 'Aprovado'
            } else if(this.registry.status=='R') {
                return 'Rejeitado/Cancelado'
            } else if(this.registry.status=='F') {
                return 'Faturado'
            } else {
                return 'Erro: '+this.registry.status
            }
        },

        colorStatus(){
            if(this.registry.status=='D') {
                return 'secondary'
            } else if(this.registry.status=='V') {
                return 'info'
            } else if(this.registry.status=='E') {
                return 'warning'
            } else if(this.registry.status=='A') {
                return 'success'
            } else if(this.registry.status=='R') {
                return 'danger'
            } else if(this.registry.status=='F') {
                return 'dark'
            } else {
                return 'danger'
            }
        },

        getData(){
            if(this.$route.params.uuid){
                this.registry.uuid = this.$route.params.uuid
                this.registry.codigo = 0
                this.registry.versao = 0
                this.registry.status = "D"
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
                    this.atividadesPF_orcamento = this.registry.fk_atividadesPF
                    this.atividadeTotal = this.registry.atividadeTotal

                    this.equipamentos_orcamento = this.registry.fk_equipamentos
                    this.equipamentoTotal = this.registry.equipamentoTotal

                    this.tipo = this.listaTipos.find((data) => data.id === this.registry.tipo)

                    if(this.registry.status!="D"){
                        this.canChange = false
                    }

                    if(this.registry.versao>1){
                        this.disableBTNVersoes = false
                    }
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
                this.tipo = this.listaTipos[0]
                this.registry.validade_proposta = "3 dias"
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
        // getFuncoes() {
        //     if(this.canUpdate){
        //         // this.processando = true;
        //         this.$http({
        //             method: 'get',
        //             url: process.env.VUE_APP_URL_BASE_API + "/api/cad/funcoes?all=1",
        //         })
        //         .then((result) => {
        //         // this.processando = false;
        //         this.funcoes = result.data;
        //         // this.funcao = this.funcoes[0].id
        //         this.funcao = this.funcoes[0]
        //         // console.log(result)
        //         // this.getModelos()
        //         })
        //         .catch((error) => {
        //         // eslint-disable-next-line
        //         console.log(error);
        //         this.processando = false;
        //         this.showMessage('Erro na conexão [Funcoes]. Acione o suporte.', 'danger');
        //         this.erroConexao(error);
        //         });
        //     }
        // },

        //////// ORCAMENTO
        orcamento_processar(){
            // if(this.cliente==null){
            //     alert("Selecione o cliente do orçamento.")
            //     return
            // }
            // if(this.tipo==null){
            //     alert("Selecione o tipo do orçamento.")
            //     return
            // }
            if(this.registry.uuid==""||this.registry.uuid==null){
                this.orcamento_save()
            } else {
                this.orcamento_update()
            }
        },
        orcamento_save(){
            this.processando = true;

            // let selecionado = this.clientes.find((data) => data.id === this.cliente);

            var bodyFormData = new FormData();
            // bodyFormData.append("uuid_cliente", selecionado.uuid);
            bodyFormData.append("uuid_cliente", this.cliente.uuid);
            bodyFormData.append("tipo", this.tipo.id);
            bodyFormData.append("contato_nome", this.registry.contato_nome);
            bodyFormData.append("contato_fone", this.registry.contato_fone);
            bodyFormData.append("contato_email", this.registry.contato_email);
            bodyFormData.append("referencia", this.registry.referencia);
            bodyFormData.append("condicao_pagamento", this.registry.condicao_pagamento);
            bodyFormData.append("validade_proposta", this.registry.validade_proposta);
            bodyFormData.append("solicitante_nome", this.registry.solicitante_nome);
            bodyFormData.append("local_execucao", this.registry.local_execucao);

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

        orcamento_excluir(){
            var mensagem = "Deseja realmente apagar este orçamento?\n\nEle será eliminado da base de dados.\n\n"
            if(!confirm(mensagem)){ return }
            this.processando = true 
            this.$http({
                method: 'delete',
                url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos",
                data: this.registry
            })
            .then(() => {
                this.processando = false;
                this.backToList()
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.processando = false;
                this.showMessage('Erro na conexão[Orcamento-Delete]. Acione o suporte.', 'danger');
                this.erroConexao(error);
            });
        },

        orcamentoStatusChange(){
            this.novoStatus = this.listaStatus[0]
            this.$bvModal.show("mOrcamentoStatus")

        },

        OrcamentoStatusChangeExec(){
            this.$bvModal.hide("mOrcamentoStatus")
            this.processando = true 
            let dados = {}
            dados.uuid = this.registry.uuid
            dados.status = this.novoStatus.status 
            
            this.$http({
                method: 'patch',
                url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/statuschange",
                data: dados
            })
            .then(() => {
                this.processando = false;
                this.registry.status = dados.status
                this.showMessage("Orçamento atualizado com sucesso.","success");
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.processando = false;
                this.showMessage('Erro na conexão[Orcamento-StatusChange]. Acione o suporte.', 'danger');
                this.erroConexao(error);
            });
        },

        orcamentoNovaVersao(){
            var mensagem = "Deseja realmente criar nova versão para este orçamento?\n\nVoce não poderá mais acessar esta versão.\n\n"
            if(confirm(mensagem)){
                this.processando = true 
                this.$http({
                    method: 'patch',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/novaversao/"+this.registry.uuid,
                })
                .then(() => {
                    this.processando = false;
                    // this.$router.push("/orcamento/orcamento/"+this.registry.uuid)
                    this.$router.push("/orcamento/lista")
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.processando = false;
                    this.showMessage('Erro na conexão[Orcamento-StatusChange/finalizar]. Acione o suporte.', 'danger');
                    this.erroConexao(error);
                });
            }
        },

        orcamentoVersoes(){
            this.$bvModal.show("mVersoes")
        },

        orcamento_finalizar(){
            var mensagem = "Deseja realmente finalizar este orçamento/versão?\n\nVoce não poderá alterar o arçamento após finalizado.\n\n"
            if(confirm(mensagem)){
                this.processando = true 
                let dados = {}
                dados.uuid = this.registry.uuid
                dados.status = "V"
                
                this.$http({
                    method: 'patch',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/statuschange",
                    data: dados
                })
                .then(() => {
                    this.processando = false;
                    this.registry.status = dados.status
                    this.showMessage("Orçamento atualizado com sucesso.","success");
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.processando = false;
                    this.showMessage('Erro na conexão[Orcamento-StatusChange/finalizar]. Acione o suporte.', 'danger');
                    this.erroConexao(error);
                });
            }
        },

        orcamento_imprimir(){
            // if(this.registry.status=="D"){
            //     var mensagem = "Deseja fechar o orçamento e imprimir?\n\nImportante: esta versão será fechada para alterações."
            //     if(!confirm(mensagem)){
            //         return
            //     }
                
                this.openWindowWithPost(process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/printv2", {
                    uuid: this.registry.uuid,
                    // key: process.env.VUE_APP_MCC_TOKEN,
                    // paciente: this.registers.data[index].id_paciente,
                })
            // }
        },
        openWindowWithPost(url, data, target="_blank") {
            var form = document.createElement("form");
            form.target = target;
            form.method = "POST";
            form.action = url;
            form.style.display = "none";

            for (var key in data) {
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = data[key];
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        },

        orcamento_download(){
            this.openWindowWithPost(process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/printv2", {
                uuid: this.registry.uuid,
                download: "S"
                // key: process.env.VUE_APP_MCC_TOKEN,
                // paciente: this.registers.data[index].id_paciente,
            }, 'iExec')
            this.disableBTNDownload = true
            setTimeout(() => {  
                window.open(process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/download/"+this.registry.uuid, "iExec")
                this.disableBTNDownload =  false
            }, 20000);



            // if(this.registry.status=="D"){
            //     var mensagem = "Deseja fechar o orçamento e imprimir?\n\nImportante: esta versão será fechada para alterações."
            //     if(!confirm(mensagem)){
            //         return
            //     }
                
                // this.openWindowWithPost(process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/print", {
                //     uuid: this.registry.uuid,
                //     download: 'S'
                //     // key: process.env.VUE_APP_MCC_TOKEN,
                //     // paciente: this.registers.data[index].id_paciente,
                // })


            // }
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
                // console.log(this.equipamentos_orcamento);
                // alert("Equipamento ID: "+this.equipamento.id)
                //verifica se equipamento ja foi incluida
                let existe = this.equipamentos_orcamento.find((data) => data.id_equipamento === this.equipamento.id);
                if(existe){
                    alert("Equipamento já incluído no orçamento")
                    return
                }
                // alert("Existe: "+existe)
                

                // if(this.registry.uuid!=null &&this.registry.uuid!=""&&this.registry.uuid!="null"){
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
                    .then( result => {
                        this.processando = false;
                        this.equipamento.uuid = result.data.uuid
                        // console.log("Equipamento UUID: "+this.equipamento.uuid)

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
                // } else {

                //     this.equipamento.qtd = this.equipamentoQtd
                //     this.equipamentoTotal = this.equipamentoTotal + ( parseFloat(this.equipamento.qtd) * parseFloat(this.equipamento.valor) )
                //     this.equipamentos_orcamento.push(this.equipamento)
                // }

            } else {
                alert("Selecione um equipamento")
            }

            
            
        },
        equip_Delete(index){
            // alert(this.equipamentos_orcamento[index].uuid)
            var mensagem = "Deseja realmente remover o equipamento "+this.equipamentos_orcamento[index].nome+"?"
            if(confirm(mensagem)){

                // if(this.equipamentos_orcamento[index].uuid){
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
                // } else {
                //     this.equipamentoTotal = this.equipamentoTotal - ( this.equipamentos_orcamento[index].qtd * this.equipamentos_orcamento[index].valor)
                //     this.equipamentos_orcamento.splice(index, 1)
                // }


                
            }
        },
        


        ////////////// ATIVIDADE

        atividadeHH_Add(){
            if(this.atividadeNova.descricao.length<3 || this.atividadeNova.descricao==""){
                alert("Digite uma descrição válida.")
                return
            }
            this.atividadeNova.tipo = "H"
            this.atividadeNova.subtotal = 0
            
            if(this.registry.uuid!=null &&this.registry.uuid!=""&&this.registry.uuid!="null"){
                this.processando = true
                var bodyFormData = new FormData();
                bodyFormData.append("uuid", this.registry.fk_versao[0].uuid);
                bodyFormData.append("descricao", this.atividadeNova.descricao);
                bodyFormData.append("valor_unit", 0); //this.atividadeNova.valor_unit);
                bodyFormData.append("qtd", 1); //this.atividadeNova.qtd);
                bodyFormData.append("codigo", "14.06"); //this.atividadeNova.codigo);
                bodyFormData.append("tipo", "H");

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
                this.atividadeNova.codigo = "14.06"
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






        atividadePF_Add(){
            if(this.atividadeNovaPF.descricao.length<3 || this.atividadeNovaPF.descricao==""){
                alert("Digite uma descrição válida.")
                return
            }
            if(this.atividadeNovaPF.qtd<0 || this.atividadeNovaPF.qtd==""){
                alert("Digite uma quantidade válida.")
                return
            }
            if(this.atividadeNovaPF.valor_unit<0 || this.atividadeNovaPF.valor_unit==""){
                alert("Digite um valor válido.")
                return
            }

            this.atividadeNovaPF.tipo = "P"
            this.atividadeNovaPF.codigo = "14.06"
            if(this.registry.uuid!=null &&this.registry.uuid!=""&&this.registry.uuid!="null"){
                this.processando = true
                var bodyFormData = new FormData();
                bodyFormData.append("uuid", this.registry.fk_versao[0].uuid);
                bodyFormData.append("descricao", this.atividadeNovaPF.descricao);
                bodyFormData.append("valor_unit", this.atividadeNovaPF.valor_unit);
                bodyFormData.append("qtd", this.atividadeNovaPF.qtd);
                bodyFormData.append("codigo", "14.06"); //this.atividadeNovaPF.codigo);
                bodyFormData.append("tipo", "P");

                this.$http({
                    method: 'post',
                    url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentoversaoatividades",
                    // url: "http://127.0.0.1:8000/api/orcamentoversaoatividades",
                    data: bodyFormData
                })
                .then((result) => {
                    this.processando = false;
                    this.atividadesPF_orcamento.push(result.data)
                    this.atividadeTotal = this.atividadeTotal + (this.atividadeNovaPF.valor_unit * this.atividadeNovaPF.qtd)
                    this.atividadeNovaPF = { descricao: "", codigo: "", valor_unit: 0, qtd: 0 }
                    this.$refs.atividadeNovaPFDescricao.focus()
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.processando = false;
                    this.showMessage('Erro na conexão[Atividade-Save]. Acione o suporte.', 'danger');
                    this.erroConexao(error);
                });
            } else {
                this.atividadesPF_orcamento.push(this.atividadeNovaPF)
                this.atividadeTotal = this.atividadeTotal + (this.atividadeNovaPF.valor_unit * this.atividadeNovaPF.qtd)
                this.atividadeNovaPF = { descricao: "", codigo: "", valor_unit: 0, qtd: 0 }
                this.$refs.atividadeNovaPFDescricao.focus()
            }

            // this.atividadeTotal = this.atividadeTotal + 1.3
            //////// Mudar a linha acima para fazer o calculo
        },


        /////////// FUNCOES

        atividadeFuncao_Add(index){
            let regadd = {nome: ""}
            this.atividades_orcamento[index].fk_funcoes.push(regadd)
        },

        atividade_Funcao(index){
            // console.log("index= "+index);
            this.atividadeIndex = index
            this.atividadefuncao = this.atividades_orcamento[index]
            this.modalAtividadeFuncoes = "Atividade: "+this.atividadefuncao.descricao.substr(0,40)
            // console.log(this.atividadefuncao)
            this.$bvModal.show("mAtividadeFuncoes")
        },

        atividade_Funcao_Atualizacao(funcoesAtualizadas){

            // console.log(funcoesAtualizadas);
            // console.log("atividade_Funcao_Atualizacao");
            // console.log("index2= "+this.atividadeIndex);
            // console.log(this.atividades_orcamento[this.atividadeIndex]);
            let totAtiv = 0;
            funcoesAtualizadas.forEach(element => {
                totAtiv += element.subtotal
                // console.log("Total="+ totAtiv);
            });
            this.atividades_orcamento[this.atividadeIndex].fk_funcoes = funcoesAtualizadas
            this.atividades_orcamento[this.atividadeIndex].subtotal = totAtiv

            // this.atividadesPF_orcamento.forEach(element =>{
            //     totAtiv += (element.qtd * element.valor_unit)
            // })
            // this.atividadeTotal = totAtiv
            this.atividadesAtualizaTotal()
            
            
            // console.log(this.atividades_orcamento);
            let atividades_orcamento_novo = this.atividades_orcamento
            this.atividades_orcamento = []
            this.atividades_orcamento = atividades_orcamento_novo
            // console.log("atividade_Funcao_Atualizacao");
            // console.log(funcoesAtualizadas);
        },

        atividadesAtualizaTotal(){
            // console.log("atividadesAtualizaTotal");
            let total = 0
            this.atividades_orcamento.forEach(element =>{
                total += element.subtotal //(element.qtd * element.valor_unit)
            })
            this.atividadesPF_orcamento.forEach(element =>{
                total += (element.qtd * element.valor_unit)
            })
            this.atividadeTotal = total
        },


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
            if(!this.tipo){
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

        if(this.$store.state.user.type=="A" || this.$store.state.user.type=="S"){
            this.caUpdate = true
        }

        this.getData()
        this.getEquipamentos()
        // this.getFuncoes()
    }
};
</script>