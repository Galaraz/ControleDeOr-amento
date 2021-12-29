<template>
<div>

    <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
    <div class="row">
        <div class="col">
            <table
                class="table table-striped table-hover table-lg mt-3 border-1"
            >
                <thead>
                <!-- class="text-white" -->
                <tr>
                    <th class="text-center">Versão</th>
                    <th class="text-center">Data</th>
                    <th class="text-right">Valor</th>
                    <th style="width:50px" v-b-tooltip.hover title="Gerar PDF"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(linha, indice) in registers" :key="linha.id">
                    <td class="text-center">{{ linha.versao }}</td>
                    <td class="text-center">{{ dataHoraBR(linha.created_at) }}</td>
                    <td class="text-right">{{ numeroBR(linha.valor_total) }}</td>
                    <td class="text-center">
                        <a @click="orcamento_imprimir(indice)"><i class="far fa-file-pdf text-primary"></i></a>
                    </td>
                </tr>
                </tbody>
            </table>
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
    props: [ 'orcamento'],
    data() {
        return {
            processando: false,
            registry: {},
            // registers: {data: [] },
            registers: [],

        }
    },
    methods: {
        getData() {
            this.processando = true;
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/versoes/"+this.orcamento.uuid,
            })
            .then((result) => {
                // console.log(result);
                this.processando = false;
                this.registers = result.data;
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                this.processando = false;
                this.showMessage('Erro na conexão [Versões]. Acione o suporte.', 'danger');
                this.erroConexao(error);
            });
        },


        orcamento_imprimir(indice){
            this.openWindowWithPost(process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/printv2", {
                uuid: this.orcamento.uuid,
                versao: this.registers[indice].versao
            })
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

        
    },
    computed: {
    },
    created(){    
        this.getData()
    }
};
</script>