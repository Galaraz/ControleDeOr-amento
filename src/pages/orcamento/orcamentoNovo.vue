<template>
  <div>
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

            <div class="row">
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
                    v-model="form.email"
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
                    v-model="form.telefone"
                    placeholder="Telefone"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>

            <b-form-group id="input-group-4" label="Referência:" label-for="input-5" description="">
              <b-form-input
                id="input-5"
                v-model="form.equipamento"
                placeholder="Referência"
                required
              ></b-form-input>
            </b-form-group>

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
                  <tr v-for="(row, index) in equip_selected" :key="row.id">
                    <td>{{ row.nome }}</td>
                    <td>{{ row.descricao }}</td>
                    <td>{{ row.valor }}</td>
                    <td>
                      <b-form-input
                        id="equip_qtd"
                        v-model="row.qtd"
                        required
                      ></b-form-input>
                    </td>
                    <td>{{ row.valor * row.qtd }}</td>
                    <td v-if="canUpdate" class="text-center">
                      <a @click="editRegistry(index)"><i class="far fa-edit text-info"></i></a>
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
                    <td>{{ rowAtv.valor }}</td>
                    <td>{{ rowAtv.qtd }}</td>
                    <td>{{ rowAtv.valor * rowAtv.qtd }}</td>
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
              <div class="col">
                <b-form-group id="input-group-8" label="Incluir Funções" label-for="input-7">
                  <b-form-select
                    id="input-8"
                    v-model="funcao"
                    :options="funcoes"
                    required
                    value-field="id"
                    text-field="nome"
                  ></b-form-select>
                </b-form-group>
                <b-button
                  size="sm"
                  variant="success"
                  v-b-tooltip.hover
                  title="Incluir Função"
                  class="mr-4 ml-4"
                  @click="select_function()"
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
                    <th>Tipo de hora</th>
                    <th>N° Col</th>
                    <th>Horas</th>
                    <th>Valor Hora</th>
                    <th>Subtotal</th>
                    <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in registers.data" :key="row.id">
                    <td class="text-center">
                      <span v-html="colorStatus(index)"></span>
                    </td>
                    <td>{{ row.nome }}</td>
                    <td>{{ row.descricao }}</td>
                    <td>{{ row.valor }}</td>
                    <td v-if="canUpdate" class="text-center">
                      <a @click="editRegistry(index)"><i class="far fa-edit text-info"></i></a>
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
      funcoes: [],
      funcao: [],
      selected_function: [],

      activity_selected: [],
      novaAtividade: {},

      canUpdate: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
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
      this.activity_selected.splice(index, 1)
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.empresa = null;
      this.form.email = '';
      this.form.name = '';
      this.form.telefone = '';
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  created() {
    this.$store.commit('setNomePagina', '<i class="fas fa-plus"></i>&nbsp;&nbsp;Orçamento - Novo');
    this.getEquipamentos();
  },
};
</script>
