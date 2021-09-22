<template>
<div>
    <b-alert show variant="danger">Em Construção</b-alert>
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
            registry:   {},
        }
    },
    methods: {
    },
    computed: {
    },
    created(){
        this.$store.commit('setNomePagina', '<i class="fas fa-exclamation-triangle"></i>&nbsp;Em construção')
    }
};
</script>