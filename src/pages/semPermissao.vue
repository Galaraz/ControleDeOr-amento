<template>
<div>
    <b-alert show variant="danger">Voce não tem permissão para este acesso.</b-alert>
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
        this.$store.commit('setNomePagina', '<i class="fas fa-exclamation-triangle"></i>&nbsp;Sem permissão')
    }
};
</script>