<template>
<div>
    <b-alert show variant="secondary">Bem vindo ao sistema.</b-alert>

    <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
    <div v-for="(row) in registers" :key="row.id">
        <b-alert show :variant="colorMensagem(row)"><span v-if="row.icone!=null" v-html="row.icone"></span><span v-if="row.icone!=null">&nbsp;&nbsp;</span><span v-html="row.mensagem"></span></b-alert>
    </div>
    </b-overlay>

    <b-button v-if="v3" size="sm" variant="primary" v-b-tooltip.hover @click="showRegistry()">
        <i class="fas fa-arrow-right ml-2 mr-2"></i>
    </b-button>
</div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
export default {
    name: 'MaterialBusca',
    components: { Widget },
    data() {
        return {
            processando: false,
            // registry: {},
            registers: [],
            v3: false,
        }
    },
    methods: {
        getRegisters(){ 
            this.processando = true
            
            this.$http({
                method: 'get',
                url: process.env.VUE_APP_URL_BASE_API+'/api/sys/mensagens',
            })
            .then(result => {
                this.processando = false
                this.registers = result.data
                // console.log(result)
            })
            .catch((error) => {
                this.processando = false
                this.erroConexao(error)
            })
        },
        colorMensagem(registry){
            if(registry.tipo=='D') {
                return 'secondary'
            } else if(registry.tipo=='W') {
                return 'warning'
            } else if(registry.tipo=='S') {
                return 'success'
            } else if(registry.tipo=='D') {
                return 'danger'
            } else if(registry.tipo=='I') {
                return 'info'
            } else {
                return 'default'
            }
        },

        showRegistry(){
            this.$router.push({ 
                        name: 'OrdemServicoDetalhePage', 
                        params: { uuid: "eb080252-492f-4f58-b2a5-89f3f06e8d52"}
            })
        },
    },
    computed: {
    },
    created(){
        this.$store.commit('setNomePagina', '<i class="fas fa-map-marker-alt"></i>&nbsp;Página Inicial')

        this.getRegisters()
    }
};
</script>