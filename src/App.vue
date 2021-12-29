<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    // const currentPath = this.$router.history.current.path;

    // if (window.localStorage.getItem("authenticated") === "false") {
      //  this.$router.push("/login");
    //  }

    // if (currentPath === "/" || currentPath === "/") {
    //   this.$router.push("/dashboard");
    //   //this.$router.push("/login");
    // }
    // console.log("App - User: ");
    // console.log(this.$store.state.user);
    if(this.$store.state.user.name=="" || this.$store.state.user.name==null){
      // this.$router.push('/login');
      this.$router.push({ name: 'Logout'}); 
    } else {
      this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.$store.state.appToken
      this.$router.push({ name: 'PaginaInicial'}); 
    }
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
