<template>
  <div>

    <!-- INFORMACOES TOPO PAGINA - INICIO -->
    <div class="row d-flex justify-content-between mt-0 mb-4 ml-1 mr-1">
        <div style="width: 10rem;">
            <b-card bg-variant="info" text-variant="white" class="text-right p-0 mt-0" body-class="p-0 mr-3 mt-1 mb-1">
                <b-card-text>
                    <span style="font-size:85%;"><i class="fas fa-hashtag"></i></span><br>
                    <span class="p-0 mt-0" style="font-size:170%;">{{orcamento.id}}</span>
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
    <!-- INFORMACOES TOPO PAGINA - FIM -->


    <div class="row">
      <div class="col">
        <b-overlay
          variant="white"
          spinner-variant="primary"
          :show="processando"
          rounded="sm"
          style="width:100%"
        >
          <Widget
            title="<h5><i class='fas fa-clipboard-list text-primary'></i> Novo Orçamento </h5>"
            bodyClass="mt-2"
            customHeader
          >
            <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
            <div class="row">
              <div class="col"><hr /></div>
            </div>

            <div class="row mt-4">
              <div class="col col-6">
                <b-form-group
                  id="input-group-11" label="Cliente:" label-for="input-11"
                >
                  <b-form-select
                    id="input-11"
                    v-model="cliente"
                    :options="clientes"
                    value-field="id"
                    text-field="nome"
                  ></b-form-select>
                </b-form-group>
              </div>
              <!-- <div class="col col-1">
                <h1></h1><br>
                <b-button
                  size="sm"
                  variant="success"
                  v-b-tooltip.hover
                  title="Incluir Cliente"
                  class="mr-4 ml-4"
                  @click="cliente_Add()"
                >
                  <i class="fas fa-plus ml-2 mr-2"></i>
                </b-button>
              </div> -->
              <div class="col col-6">
                <b-form-group id="input-group-4" label="Nome do Responsavel:" label-for="input-4">
                  <b-form-input
                    id="input-2"
                    v-model="form.email"
                    placeholder="Email do Responsável"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>

            <!-- <div class="row">
              <div class="col col-6">
                <b-form-group id="input-group-1" label="Empresa:" label-for="input-1">
                  <b-form-select
                    id="input-1"
                    v-model="form.empresa"
                    :options="empresa"
                    required
                  ></b-form-select>
                </b-form-group>
              </div>

              <div class="col col-6">
                <b-form-group id="input-group-4" label="Nome do Responsavel:" label-for="input-4">
                  <b-form-input
                    id="input-2"
                    v-model="form.email"
                    placeholder="Email do Responsável"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div> -->

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
                    v-model="orcamento.email"
                    type="email"
                    placeholder="Email"
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
                    v-model="orcamento.telefone"
                    placeholder="Telefone"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>

            <!-- <b-form-group id="input-group-4" label="Referência:" label-for="input-5" description="">
              <b-form-input
                id="input-5"
                v-model="form.equipamento"
                placeholder="Referência"
                required
              ></b-form-input>
            </b-form-group> -->

            <div class="row">
              <div class="col">
                <br><br><hr>
                <h5><i class='fas fa-truck text-primary'></i> Equipamentos</h5>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col col-8">
                <b-form-group id="input-group-6" label=" Incluir Equipamentos" label-for="input-6">
                  <b-form-select
                    id="input-6"
                    v-model="equipamento"
                    :options="equipamentos"
                    required
                    value-field="id"
                    text-field="nome"
                  ></b-form-select>
                </b-form-group>
              </div>
              <div class="col col-4">
                <h1></h1><br>
                <b-button
                  size="sm"
                  variant="success"
                  v-b-tooltip.hover
                  title="Incluir Equipamento"
                  class="mr-4 ml-4"
                  @click="select_equip()"
                >
                  <i class="fas fa-plus ml-2 mr-2"></i>
                </b-button>
              </div>
            </div>
            <!-- Primeira tabela -->
            <div class="row">
              <table
                class="table table-striped table-hover table-lg mb-0 requests-table mt-3 border-1"
              >
                <thead>
                  <!-- class="text-white" -->
                  <tr>
                    <th>Codigo NCM</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Quantidade</th>
                    <th>Subtotal</th>
                    <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(rowEqp, indexEqp) in equip_selected" :key="rowEqp.id">
                    <td>{{ rowEqp.nome }}</td>
                    <td>{{ rowEqp.descricao }}</td>
                    <td class="text-right">{{ rowEqp.valor }}</td>
                    <td class="text-right">
                      <b-form-input
                        id="equip_qtd"
                        v-model="rowEqp.qtd"
                        required
                      ></b-form-input>
                    </td>
                    <td class="text-right">{{ rowEqp.valor * rowEqp.qtd }}</td>
                    <td v-if="canUpdate" class="text-center">
                      <a @click="equip_Delete(indexEqp)"><i class="far fa-trash-alt text-danger"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="row">
              <div class="col">
                <br><br><hr>
                <h5><i class='fas fa-tools text-primary'></i> Atividades</h5>
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
                    v-model="novaAtividade.descricao"
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
                    v-model="novaAtividade.codigo"
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
                    v-model="novaAtividade.valor"
                  ></b-form-input>
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
                    v-model="novaAtividade.qtd"
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
                  @click="actvities_add()"
                >
                  <i class="fas fa-plus ml-2 mr-2"></i>
                </b-button>
              </div>
              
            </div>










            <!-- <div class="row mt-4">
              <div class="col">
                <b-form-group id="input-group-7" label="Incluir Atividades" label-for="input-7">
                  <b-form-select
                    id="input-7"
                    v-model="atividade"
                    :options="atividades"
                    required
                    value-field="id"
                    text-field="nome"
                  ></b-form-select>
                </b-form-group>
                <b-button
                  size="sm"
                  variant="success"
                  v-b-tooltip.hover
                  title="Incluir Atividade"
                  class="mr-4 ml-4"
                  @click="select_actvities()"
                >
                  <i class="fas fa-plus ml-2 mr-2"></i>
                </b-button>
              </div>
            </div> -->

            <!-- Segunda tabela 2-->
            <div class="row">
              <table
                class="table table-striped table-hover table-lg mb-0 requests-table mt-3 border-1"
              >
                <thead>
                  <!-- class="text-white" -->
                  <tr>
                            
                   
                    <th>Descriçao da atividade</th>
                    <th>Codigo</th>
                    <th>Valor</th>
                    <th>Quantidade</th>
                    <th>Subtotal</th>
                    <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(rowAtv, indexAtv) in activity_selected" :key="rowAtv.id">
                    <td>{{ rowAtv.descricao }}</td>
                    <td>{{ rowAtv.codigo }}</td>
                    <td class="text-right">{{ rowAtv.valor }}</td>
                    <td class="text-right">{{ rowAtv.qtd }}</td>
                    <td class="text-right">{{ rowAtv.valor * rowAtv.qtd }}</td>
                    <td v-if="canUpdate" class="text-center">
                      <a @click="deleteAtividade(indexAtv)"><i class="far fa-trash-alt text-danger"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>



            <div class="row">
              <div class="col">
                <br><br><hr>
                <h5><i class='fas fa-user-cog text-primary'></i> Funções</h5>
              </div>
            </div>

            <div class="row mt-4">

<!-- inicio da tabela de funçoes --> 
              <div class="col col-5">
                <!-- <b-form-group
                  id="input-4"
                  label="Incluir Funções:"
                  label-for="funcao"
                >
                  <b-form-input
                    id="funcao"
                    v-model="novaAtividade.funcao"
                  ></b-form-input>
                </b-form-group> -->

                <b-form-group
                  id="input-group-41" label="Função:" label-for="input-41"
                >
                  <b-form-select
                    id="input-41"
                    v-model="funcao"
                    :options="funcoes"
                    value-field="id"
                    text-field="nome"
                  ></b-form-select>
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
                    v-model="funcao_registro.qtd_colaboradores"
                    type="number"
                  ></b-form-input>
                </b-form-group>
              </div>
            
              <div class="col col-2">
                <b-form-group
                  id="input-6"
                  label="Horas:"
                  label-for="horas"
                >
                  <b-form-input
                    id="horas"
                    v-model="funcao_registro.horas"
                    type="number"
                  ></b-form-input>
                </b-form-group>
              </div>

              <div class="col col-2">
                <b-form-group
                  id="input-7"
                  label="Horas Extras"
                  label-for="horas_extras"
                >
                  <b-form-input
                    id="horas_extras"
                    v-model="funcao_registro.horas_extras"
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

            <!-- Primeira tabela 3-->
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
                  <tr v-for="(rowFunc, indexFunc) in selected_funcoes" :key="rowFunc.id">
                    <td>{{ rowFunc.nome }}</td>
                    <td class="text-right">{{ rowFunc.qtd_colaboradores }}</td>
                    <td class="text-right">{{ rowFunc.horas }}</td>
                    <td class="text-right">{{ rowFunc.horas_extras }}</td>
                    <td class="text-right">{{rowFunc.subtotal}}</td>
                    <td v-if="canUpdate" class="text-center">
                      <a @click="funcoes_Delete(indexFunc)"><i class="far fa-trash-alt text-danger"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="row"><div class="col">&nbsp;</div></div>
          </Widget>
        </b-overlay>
      </div>
    </div>
    <!--codigo novo aqui   -->

    <div class="row">
      <div class="col">
        <b-overlay
          variant="white"
          spinner-variant="primary"
          :show="processando"
          rounded="sm"
          style="width:100%"
        >
          <Widget style="width:100%">
            <table style="width:100%">
              <tr>
                <td>
                  <b-button
                    @click="modalAddRegistry()"
                    v-b-tooltip.hover
                    title="Incluir Registro"
                    variant="success"
                    size="sm"
                    class="mr-4"
                    ><i class="fas fa-plus ml-2 mr-2"></i
                  ></b-button>
                  <b-button
                    @click="modalAddRegistry()"
                    v-b-tooltip.hover
                    title="Salvar Registro"
                    variant="primary"
                    size="sm"
                    class="mr-4"
                    ><i class="fas fa-save ml-2 mr-2"></i
                  ></b-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        empresa: null,
        email: '',
        name: '',
        telefone: '',
        addEquipamentos: null,
      },
      empresa: [{ text: 'Selecione uma empresa', value: null }, ''],
      addEquipamentos: [{ text: 'Selecione um equipamento', value: null }, ''],
      show: true,
      processando: false,
      registers: [],
      equipamentos: [],
      equip_selected: [],
      equipamento: {},
      atividades: [],
      atividade: [],
      selected_actvity: [],
      
      activity_selected: [],
      novaAtividade: {},

      clientes: [],
      cliente: {},
      orcamento: { id: "_", uuid: null, status: "D"},

      funcoes: [],
      funcao: {},
      funcao_registro: {},
      selected_funcoes: [],

      canUpdate: true,
    };
  },
  methods: {
    // onSubmit(event) {
    //   event.preventDefault();
    //   alert(JSON.stringify(this.form));
    // },

    getClientes() {
      this.processando = true;
      this.$http({
        method: 'get',
        url: 'http://back.naxsysbrasil.com.br/api/cad/clientes?all=1',
      })
        .then((result) => {
          this.processando = false;
          this.clientes = result.data;
          // console.log(result)
          // this.getModelos()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.processando = false;
          this.showMessage('Erro na conexão. Acione o suporte.', 'danger');
          this.erroConexao(error);
        });
    },
    getEquipamentos() {
      this.processando = true;
      this.$http({
        method: 'get',
        url: 'http://back.naxsysbrasil.com.br/api/cad/equipamentos?all=1',
      })
        .then((result) => {
          this.processando = false;
          this.equipamentos = result.data;
          // console.log(result)
          // this.getModelos()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.processando = false;
          this.showMessage('Erro na conexão. Acione o suporte.', 'danger');
          this.erroConexao(error);
        });
    },
    // getFuncoes() {
    //   this.processando = true;
    //   this.$http({
    //     method: 'get',
    //     url: 'http://back.naxsysbrasil.com.br/api/cad/funcoes?all=1',
    //   })
    //     .then((result) => {
    //       this.processando = false;
    //       this.funcoes = result.data;
    //       // console.log(result)
    //       // this.getModelos()
    //     })
    //     .catch((error) => {
    //       // eslint-disable-next-line
    //       console.log(error);
    //       this.processando = false;
    //       this.showMessage('Erro na conexão. Acione o suporte.', 'danger');
    //       this.erroConexao(error);
    //     });
    // },

    getActivitys() {
      this.processando = true;
      this.$http({
        method: 'get',
        url: 'http://back.naxsysbrasil.com.br/api/cad/atividades?all=1',
      })
        .then((result) => {
          this.processando = false;
          this.atividades = result.data;
          // console.log(result)
          // this.getModelos()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.processando = false;
          this.showMessage('Erro na conexão. Acione o suporte.', 'danger');
          this.erroConexao(error);
        });
    },

    getFuncoes() {
      this.processando = true;
      this.$http({
        method: 'get',
        url: 'http://back.naxsysbrasil.com.br/api/cad/funcoes?all=1',
      })
        .then((result) => {
          this.processando = false;
          this.funcoes = result.data;
          // console.log(result)
          // this.getModelos()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.processando = false;
          this.showMessage('Erro na conexão. Acione o suporte.', 'danger');
          this.erroConexao(error);
        });
    },

    select_equip() {
      let selecionado = this.equipamentos.find((data) => data.id === this.equipamento);
      selecionado.qtd = 0
      this.equip_selected.push(selecionado);
    },

    equip_Delete(index){
      var mensagem = "Deseja realmente remover o equipamento "+this.equip_selected[index].nome+"?"
      if(confirm(mensagem)){
        this.equip_selected.splice(index, 1)
      }
    },

    select_activities() {
      let selecionado = this.atividades.find((data) => data.id === this.atividade);
      this.activity_selected.push(selecionado);
    },

    select_function() {
      let selecionado = this.funcoes.find((data) => data.id === this.funcao);
      this.selected_function.push(selecionado);
    },

    actvities_add(){
      this.novaAtividade = { descricao: "", codigo: "", valor: "", qtd: "" }
      this.activity_selected.push(this.novaAtividade)
    },

    deleteAtividade(index){
      var mensagem = "Deseja realmente remover a atividade?"
      if(confirm(mensagem)){
        this.activity_selected.splice(index, 1)
      }
    },

    funcoes_Add(){
      let selecionado = this.funcoes.find((data) => data.id === this.funcao);
      this.funcao_registro.id = selecionado.id
      this.funcao_registro.nome = selecionado.nome
      this.funcao_registro.valor_hora = selecionado.valor_hora
      this.funcao_registro.valor_hora_noturno = selecionado.valor_hora_noturno

      this.funcao_registro.subtotal = (this.funcao_registro.horas * selecionado.valor_hora ) +
                      (this.funcao_registro.horas_extra * selecionado.valor_hora_noturno )

      this.selected_funcoes.push( this.funcao_registro )
      this.funcao_registro = { id: null, nome: null, qtd_colaboradores: null, horas: null, horas_extra: null}
    },

    funcoes_Delete(index){
      var mensagem = "Deseja realmente remover a função "+this.selected_funcoes[index].nome+"?"
      if(confirm(mensagem)){
        this.selected_funcoes.splice(index, 1)
      }
    },

    // onReset(event) {
    //   event.preventDefault();
    //   // Reset our form values
    //   this.form.empresa = null;
    //   this.form.email = '';
    //   this.form.name = '';
    //   this.form.telefone = '';
    //   this.form.checked = [];
    //   // Trick to reset/clear native browser form validation state
    //   this.show = false;
    //   this.$nextTick(() => {
    //     this.show = true;
    //   });
    // },
  },
  computed: {
  //   calculaHoras(indice){
  //     console.log(indice)
  //     console.log(this.selected_funcoes)
  //     return 1
  //     // return 
  //   }
  },
  created() {
    this.$store.commit('setNomePagina', '<i class="fas fa-plus"></i>&nbsp;&nbsp;Orçamento - Novo');
    this.getClientes();
    this.getEquipamentos();
    this.getFuncoes();
  },
};
</script>
