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
                    <th class="text-left" colspan="2">Status</th>
                    <th class="text-center">Data</th>
                    <th class="text-center">Usuário</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(linha, index) in registers" :key="linha.id">
                    <td width="50px" class="text-center"><span v-html="colorStatus(index)"></span></td>
                    <td class="text-left">{{ textStatus(linha.status) }}</td>
                    <td class="text-center">{{ dataHoraBR(linha.created_at) }}</td>
                    <td class="text-center">{{ linha.fk_usuario.name }}</td>
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
                url: process.env.VUE_APP_URL_BASE_API + "/api/orcamentos/mudancasstatus/"+this.orcamento.uuid,
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
                this.showMessage('Erro na conexão [MudancasStatus]. Acione o suporte.', 'danger');
                this.erroConexao(error);
            });
        },


        textStatus(status){
            if(status=='D') {
                return 'Em Solicitação'
            } else if(status=='V') {
                return 'Aguardando Validação'
            } else if(status=='E') {
                return 'Aguardando Aprovação'
            } else if(status=='A') {
                return 'Aprovado'
            } else if(status=='R') {
                return 'Rejeitado/Cancelado'
            } else if(status=='F') {
                return 'Faturado'
            } else {
                return 'Erro: '+status
            }
        },

        colorStatusOld(){
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

        colorStatus(index){
            if(this.registers[index].status=='D'){
                return '<i class="fas fa-circle text-secondary"></i>'
            } else if(this.registers[index].status=='V'){
                return '<i class="fas fa-circle text-info"></i>'
            } else if(this.registers[index].status=='E'){
                return '<i class="fas fa-circle text-warning"></i>'
            } else if(this.registers[index].status=='A'){
                return '<i class="fas fa-circle text-success"></i>'
            } else if(this.registers[index].status=='R'){
                return '<i class="fas fa-circle text-danger"></i>'
            } else if(this.registers[index].status=='F'){
                return '<i class="fas fa-circle text-dark"></i>'
            } else {
                return '<i class="fas fa-circle text-danger"></i>'
            }
        },


        
    },
    computed: {
    },
    created(){    
        this.getData()
    }
};
</script>