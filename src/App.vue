<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    const currentPath = this.$router.history.current.path;

   // if (window.localStorage.getItem("authenticated") === "false") {
    //  this.$router.push("/login");
  //  }

    // if (currentPath === "/" || currentPath === "/") {
    //   this.$router.push("/dashboard");
    //   //this.$router.push("/login");
    // }

    if(this.$store.state.user.name=="" || this.$store.state.user.name==null){
      this.$router.push('/login');
    }
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
