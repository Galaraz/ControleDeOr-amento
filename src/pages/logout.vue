<template>
    <div>

    </div>
</template>

<script>
export default {
    name: 'Logout',
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    created(){

        this.$http({
            method: 'post',
            url: '/api/auth/logout',
        })
        .then( () => {
            
        })
        .catch( error => {
            // eslint-disable-next-line
            console.log(error)
        })


        // console.log("Logout...")
        this.$store.commit('clearUser')
        this.$router.push('/login');
    }
};
</script>