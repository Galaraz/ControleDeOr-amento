<template>
<div>
<!-- <b-alert show variant="warning"><i class="fas fa-exclamation-triangle"></i> Em Validação.</b-alert> -->

    <div class="row">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget
                title="<h5><i class='fas fa-boxes text-primary'></i> Equipamentos com Estoque Abaixo do Mínimo</h5>"
                bodyClass="widget-table-overflow"
                customHeader
                style="width:100%"
            >
                <div class="widget-controls">
                    <!-- <a v-if="canAdd" data-widgster="collapse" v-b-tooltip.hover title="Incluir Registro" @click="modalAddRegistry()"><i class="fas fa-plus text-success"></i></a>
                    &nbsp; -->
                    <a data-widgster="load" v-b-tooltip.hover title="Refresh" @click="getRegisters()"><i class="fas fa-sync-alt text-primary"></i></a>
                </div>

                <table class="table table-striped table-hover table-lg mb-0 requests-table mt-3 border-1">
                    <thead>
                        <!-- class="text-white" -->
                    <tr>
                        <th class="text-center" style="width: 100px">Código</th>
                        <th>Nome</th>
                        <th class="text-right" style="width: 170px">Estoque Mínimo</th>
                        <th class="text-right" style="width: 170px">Estoque Atual</th>
                        <!-- <th v-if="canUpdate" style="width:50px" v-b-tooltip.hover title="Editar"></th> -->
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row) in registers.data" :key="row.id">
                        <td class="text-right">{{row.id}}</td>
                        <td>{{row.nome}}</td>
                        <td class="text-right">{{numeroBR(row.qtd_estoque_min,0)}}</td>
                        <td class="text-right">{{numeroBR(row.qtd_estoque,0)}}</td>
                        <!-- <td v-if="canUpdate" class="text-center">
                            <a @click="editRegistry(index)"><i class="far fa-edit text-info"></i></a>
                        </td> -->
                    </tr>
                    </tbody>
                </table>
                <span v-if="!processando && registers.data.length<=0">
                    <div class="row">
                        <div class="col m-4">
                            <b-alert show variant="warning"><i class="fas fa-exclamation-triangle"></i> Nenhum equipamento abaixo do estoque mínimo.</b-alert>
                        </div>
                    </div>
                </span>
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
                        <!-- <td>
                            <b-button v-if="canAdd" @click="modalAddRegistry()" v-b-tooltip.hover title="Incluir Registro" variant="success" size="sm" class="mr-4"><i class="fas fa-plus ml-2 mr-2"></i></b-button>
                        </td> -->
                        <td>
                            <pagination v-if="registers.data.length>0" :data="registers" :limit=3 @pagination-change-page="getRegisters"></pagination>
                        </td>
                        <td class="text-right">
                            <b-button :disabled="registers.data.length<=0" v-b-tooltip.hover title="Gerar Excel" variant="default" size="sm" class="mr-2" @click="excel()"><i class="far fa-file-excel ml-2 mr-2"></i></b-button>
                            <!-- &nbsp;&nbsp;&nbsp;
                            <b-button disabled v-b-tooltip.hover title="Imprimir" variant="default" size="sm" class="mr-2"><i class="fas fa-print ml-2 mr-2"></i></b-button> -->
                        </td>
                    </tr>
                </table>

            </Widget>
            </b-overlay>
        </div>
    </div>

<iframe id="iExec" name="iExec" frameborder="0" height="00" width="00" ></iframe>
    
</div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
export default {
    name: 'EstoqueRelatorio',
    components: { Widget },
    data() {
        return {
            processando: false,
            registry: {},
            registers: {data: [] },

            canUpdate: true,
        }
    },
    methods: {
        getRegisters(page = 1){ 
            this.processando = true
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API + "/api/estoque/relabaixominimo?page=" + page,
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

        excel(){
            this.openWindowWithPost(process.env.VUE_APP_URL_BASE_API + "/api/estoque/relabaixominimoexcel", {
                // uuid: this.registry.uuid,
                // key: process.env.VUE_APP_MCC_TOKEN,
                // paciente: this.registers.data[index].id_paciente,
            })
        },
        openWindowWithPost(url, data) {
            var form = document.createElement("form");
            form.target = "iExec";
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
    },
    computed: {
    },
    created(){
        this.$store.commit('setNomePagina', '<i class="fas fa-barcode"></i>&nbsp;Estoque&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-boxes"></i>&nbsp;Relatório de Estoque Abaixo do Mínimo')
        if(! (this.$store.state.user.type=='A' || this.$store.state.user.type=='S')) {
            this.$router.push({ name: 'SemPermissao'}); 
        }

        this.getRegisters()
    }
};
</script>