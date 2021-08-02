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
            title="<h5><i class='far fa-list-alt text-primary'></i> Lista de Servicos</h5>"
            bodyClass="widget-table-overflow"
            customHeader
            style="width:100%"
          >
            <div class="widget-controls">
              <a
                v-if="canAdd"
                data-widgster="collapse"
                v-b-tooltip.hover
                title="Incluir Registro"
                @click="modalAddRegistry()"
                ><i class="fas fa-plus text-success"></i
              ></a>
              &nbsp;
              <a data-widgster="load" v-b-tooltip.hover title="Refresh" @click="getRegisters()"
                ><i class="fas fa-sync-alt text-primary"></i
              ></a>
            </div>

            <table
              class="table table-striped table-hover table-lg mb-0 requests-table mt-3 border-1"
            >
              <thead>
                <!-- class="text-white" -->
                <tr>
                  <th class="text-center" style="width:50px">
                    <i class="fas fa-circle text-secondary fa-lg"></i>
                  </th>
                  <th>Nome</th>
                  <th>codigo Atividade</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in registers.data" :key="row.id">
                  <td class="text-center"><span v-html="colorStatus(index)"></span></td>
                  <td>{{ row.nome }}</td>
                  <td>{{ row.codigo_atividade }}</td>
                  <td>{{ row.descricao }}</td>
                  <td>{{ row.valor }}</td>
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
                    v-if="canAdd"
                    @click="modalAddRegistry()"
                    v-b-tooltip.hover
                    title="Incluir Registro"
                    variant="success"
                    size="sm"
                    class="mr-4"
                    ><i class="fas fa-plus ml-2 mr-2"></i
                  ></b-button>
                </td>
                <td>
                  <pagination
                    v-if="registers.data.length > 0"
                    :data="registers"
                    :limit="3"
                    @pagination-change-page="getRegisters"
                  ></pagination>
                </td>
                <td class="text-right">
                  <b-button
                    disabled
                    v-b-tooltip.hover
                    title="Gerar Excel"
                    variant="default"
                    size="sm"
                    class="mr-2"
                    ><i class="far fa-file-excel ml-2 mr-2"></i
                  ></b-button>
                  &nbsp;&nbsp;&nbsp;
                  <b-button
                    disabled
                    v-b-tooltip.hover
                    title="Imprimir"
                    variant="default"
                    size="sm"
                    class="mr-2"
                    ><i class="fas fa-print ml-2 mr-2"></i
                  ></b-button>
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
      :title="this.modalTitle"
      button-size="sm"
      body-bg-variant="white"
      content-class="shadow"
      @shown="focusNome"
    >
      <div class="row">
        <div class="col">
          <b-form-group id="grp-nome" label="Nome" label-for="nome" :state="stateNome">
            <b-form-input
              id="nome"
              ref="focusNome"
              v-model="registry.nome"
              :state="stateNome"
              trim
            ></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group id="grp-codigo_atividade" label="Codigo Atividade" label-for="codigo_atividade" :state="state_codigo_atividade">
            <b-form-input
              id="codigo_atividade"
              ref=""
              v-model="registry.codigo_atividade"
              :state="stateCodigo_atividade"
              trim
            ></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group id="grp-valor" label="Valor" label-for="valor" :state="stateValor">
            <b-form-input
              id="valor"
              ref="focusValor"
              v-model="registry.valor"
              :state="stateValor"
              trim
            ></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group id="grp-descricao" label="Descrição" label-for="descricao">
            <b-form-textarea
              id="descricao"
              v-model="registry.descricao"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </div>
      </div>

      <template v-slot:modal-footer="{ cancel }">
        <table class="w-100">
          <tr>
            <td>
              <b-button
                v-if="btnDeleteRecord"
                size="sm"
                variant="danger"
                v-b-tooltip.hover
                title="Excluir"
                @click="deleteRecord()"
                class="ml-2"
              >
                <i class="fas fa-trash-alt ml-2 mr-2"></i>
              </b-button>
              <span v-if="registry.status == 'A'">
                <b-button
                  v-if="canUpdate"
                  size="sm"
                  variant="warning"
                  v-b-tooltip.hover
                  title="Inativar"
                  class="mr-4 ml-4"
                  @click="inativar()"
                >
                  <i class="fas fa-ban ml-2 mr-2"></i>
                </b-button>
              </span>
              <span v-else>
                <b-button
                  v-if="canUpdate"
                  size="sm"
                  variant="success"
                  v-b-tooltip.hover
                  title="Ativar"
                  class="mr-4 ml-4"
                  @click="ativar()"
                >
                  <i class="fas fa-ban ml-2 mr-2"></i>
                </b-button>
              </span>
            </td>
            <td class="text-right">
              <b-button
                size="sm"
                variant="warning"
                v-b-tooltip.hover
                title="Fechar"
                @click="cancel()"
              >
                <i class="fas fa-times ml-2 mr-2"></i>
              </b-button>
              &nbsp;&nbsp;&nbsp;
              <b-button
                :disabled="disableBtnSaveRegistry"
                size="sm"
                variant="primary"
                v-b-tooltip.hover
                title="Salvar dados"
                @click="processRegistry()"
              >
                <i class="fas fa-save ml-2 mr-2"></i>
              </b-button>
              <!-- :disabled="disableBtnSaveRegistry" -->
            </td>
          </tr>
        </table>
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
      registry: { nome: '', obs: '' },
      registers: { data: [] },
      modalTitle: null,
      btnDeleteRecord: false,
      btnSaveRecord: false,
    };
  },
  methods: {
    focusNome() {
      this.$refs.focusNome.focus();
    },
    colorStatus(index) {
      if (this.registers.data[index].status == 'A') {
        return '<i class="fas fa-circle text-success"></i>';
      } else {
        return '<i class="fas fa-circle text-warning"></i>';
      }
    },
    getRegisters(page = 1) {
      this.processando = true;
      this.$http({
        method: 'get',
        url: 'http://back.naxsysbrasil.com.br/api/cad/servicos?page=' + page,
      })
        .then((result) => {
          this.processando = false;
          this.registers = result.data;
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

    editRegistry(index) {
      this.modalTitle = 'Seção: ' + this.registers.data[index].id;
      this.registry = this.registers.data[index];
      this.registry.action = 'U';
      this.registry.pos = index;
      // this.btnDeleteRecord = true
      this.$bvModal.show('mRegistry');
    },
    modalAddRegistry() {
      this.modalTitle = 'Nova Seção';
      this.registry = {
        action: 'I',
        nome: '',
        descricao: '',
      };
      this.$bvModal.show('mRegistry');
    },

    processRegistry() {
      this.processando = true;
      this.$bvModal.hide('mRegistry');
      if (this.registry.action == 'U') {
        this.$http({
          method: 'patch',
          url: 'http://back.naxsysbrasil.com.br/api/cad/servicos?',
          data: this.registry,
        })
          .then(() => {
            this.processando = false;
            // this.registers.push(result.data)
            this.showMessage('Registro alterado com sucesso.');
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
            this.processando = false;
            this.erroConexao(error);
          });
      } else {
        var bodyFormData = new FormData();
        bodyFormData.append('nome', this.registry.nome);
        bodyFormData.append('codigo_atividade', this.registry.codigo_atividade);
        bodyFormData.append('descricao', this.registry.descricao);
        bodyFormData.append('valor', this.registry.valor);

        this.$http({
          method: 'post',
          url: 'http://back.naxsysbrasil.com.br/api/cad/servicos',
          data: bodyFormData,
        })
          .then((result) => {
            this.processando = false;
            this.registers.data.push(result.data);
            this.showMessage('Registro incluído com sucesso.');
          })
          .catch((error) => {
            // eslint-disable-next-line
            // console.log(error)
            this.processando = false;
            this.erroConexao(error);
          });
      }
    },

    inativar() {
      var mensagem = 'Deseja realmente INATIVAR este registro?\n\n';
      if (confirm(mensagem)) {
        this.processando = true;
        this.$http({
          method: 'patch',
          url: process.env.VUE_APP_URL_BASE_API + '/api/jps/examesecao/inativar',
          data: { uuid: this.registry.uuid },
        })
          .then(() => {
            this.processando = false;
            this.registry.status = 'I';

            // eslint-disable-next-line
            // console.log(result)
            // this.registry.fk_endereco.push(result)
            this.showMessage('Registro alterado com sucesso.');
            this.$bvModal.hide('mRegistry');
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
            this.processandoEndereco = false;
            this.erroConexao(error);
          });
      }
    },

    ativar() {
      var mensagem = 'Deseja ATIVAR o registro?\n\n';
      if (confirm(mensagem)) {
        this.processando = true;
        this.$http({
          method: 'patch',
          url: process.env.VUE_APP_URL_BASE_API + '/api/jps/examesecao/ativar',
          data: { uuid: this.registry.uuid },
        })
          .then(() => {
            this.processando = false;
            this.registry.status = 'A';

            // eslint-disable-next-line
            // console.log(result)
            // this.registry.fk_endereco.push(result)
            this.showMessage('Registro alterado com sucesso.');
            this.$bvModal.hide('mRegistry');
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
            this.processandoEndereco = false;
            this.erroConexao(error);
          });
      }
    },
  },
  computed: {
    stateNome() {
      return this.registry.nome.length >= 4;
    },
    disableBtnSaveRegistry() {
      if (!this.stateNome) {
        return true;
      }
      return false;
    },
  },
  created() {
    //Validando permissao e secao
    // this.mccUsuarioValidar('jps.exametipo.list')
    this.$store.commit(
      'setNomePagina',
      '<i class="fas fa-cogs"></i>&nbsp;Cadastros&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-truck"></i>&nbsp;Servicos'
    );
    // this.canAdd = this.usuarioTemPermissao('jps.exametipo.add')
    // this.canUpdate = this.usuarioTemPermissao('jps.exametipo.update')
    // this.canGet = this.usuarioTemPermissao('privilegio_para_get')

    this.getRegisters();
    // this.getSecoes()
  },
};
</script>
