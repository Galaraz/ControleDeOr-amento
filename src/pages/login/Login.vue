<template>
  <div class="auth-page fundo">
    <b-container>
      <!-- <h5 class="auth-logo"><img src="/img/MCC.png" height="35px"></h5> -->
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0 text-inverse'><i class='fas fa-key'></i>&nbsp;
Entrar na Aplicação</h3>" customHeader>
        <hr>
        <p class="widget-auth-info">Digite os seus dados abaixo para ter acesso ao sistema.</p>
        <hr class="mb-4">
        <form class="mt text-center" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            <span v-html="errorMessage"></span>
          </b-alert>
          <div role="group" class="input-group mb-4">
            <div class="input-group-prepend input-group-no-border">
              <div class="input-group-text"><font-awesome-icon :icon="['far', 'user']" /></div>
            </div>
            <b-input autofocus required type="text" name="email" id="email" ref="email" placeholder="Seu usuário" v-model="email"></b-input>
          </div>

          <div role="group" class="input-group mb-4">
            <div class="input-group-prepend input-group-no-border">
              <div class="input-group-text"><font-awesome-icon :icon="['fas', 'lock']" /></div>
            </div>
            <b-input required type="password" name="password" id="password" ref="password" placeholder="Sua senha" v-model="password"></b-input>
          </div>
          <b-button type="submit" 
              class="col-md-7 mt-3" 
              variant="inverse" 
              id="btnLogin"
              :disabled=!btnLogin
          ><span v-html="txtBtnLogin"></span></b-button>
          <p>&nbsp;</p>
          <b-progress v-if="!btnLogin" height="7px" :value="progresso" max="100" show-progress animated></b-progress>
          <p>&nbsp;</p>
        </form>
        <router-link class="d-block text-center float-right font-weight-light fonte-peq" to="login">Esqueci minha senha</router-link>
      </Widget>
    </b-container>
    <footer class="auth-footer">
      <font class="font-weight-light text-white" size="1">© Copyright 2014-{{ano}} <a href="https://megaideia.com.br" target="_blank">MegaIdeia.com.br</a>. Todos os direitos reservados.</font>
    </footer>
  </div>
</template>

<style>
.fundo {
    /* background: url("/img/login-bkg.png") no-repeat center top fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover; */
    background-color: #282828;
}
a{
    color:#fff;
    text-decoration:underline;
}
a:hover{
    color:#fff;
}
.fonte-peq{
  font-size: 0.75rem !important;
}
</style>

<script>
import Widget from '@/components/Widget/Widget';
/* eslint-disable */
export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      user: this.$store.state.user,
      txtBtnLogin: '<i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;Entrar',
      btnLogin: true,
      progresso: 15,
      errorMessage: null,
      email: "",
      password: "",
      token: ""
    };
  },
  computed: {
    ano(){
      return new Date().getFullYear()
    }
  },
  methods: {
    login() {
       const email = this.$refs.email.value;
       const password = this.$refs.password.value;
      
      if (this.email.length !== 0 && this.password.length !== 0) {
        this.txtBtnLogin = '<i class="fas fa-spinner fa-spin"></i>&nbsp;&nbsp;Processando...'
        this.btnLogin = false
        this.errorMessage = ""
        console.log(process.env.VUE_APP_URL_BASE_API + "/api/auth/login");
        this.$http({
          method: 'post',
          url: "http://back.naxsysbrasil.com.br/api/auth/login",
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(res => {
          // console.log(res.data)
          this.token = res.data.access_token
          this.$http.defaults.headers.common['Authorization'] = 'Bearer '+this.token
          // this.$store.commit('setAppToken', this.token)

          // var now = new Date();
          // var expira = new Date(now.getTime() + res.data.expires_in*1000);
          // this.$store.commit('setAppTokenExpiration', expira)
          
          this.progresso = 50
          this.getMe()
           window.localStorage.setItem('authenticated', true);
           this.$router.push('/dashboard');
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 401) {
            this.errorMessage = '<i class="fas fa-exclamation-triangle"></i>&nbsp;&nbsp;Acesso Negado (1)!'
          } else {
            this.errorMessage = "Erro na conexão (AXIOS-1)."
          }
          this.txtBtnLogin = '<i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;Entrar'
          this.btnLogin = true
          this.email = ""
          this.password = ""
          // console.log(error)
        })
      }
    },
    getMe() {
      this.txtBtnLogin = '<i class="fas fa-spinner fa-spin"></i>&nbsp;&nbsp;Definindo...'
      this.$http({
        method: 'post',
        url: "http://back.naxsysbrasil.com.br/api/auth/me",
         headers: {'Authorization': 'Bearer'+this.token}, 
      })
      .then(result => {
        this.progresso = 50
        this.$store.commit('setUser', result.data)
        // console.log(this.$store.state.user);
        this.progresso = 60
        this.$router.push({name: 'DashboardPage'}); 
        //this.getPrivilegios()
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.errorMessage = "Acesso Negado (auth/me)!"  
        } else {
          this.errorMessage = "Erro na conexão (AXIOS-auth/me)."
        }
        this.txtBtnLogin = '<i class="fa fas fa-sign-in-alt"></i>&nbsp;&nbsp;Entrar'
        this.btnLogin = true
        this.email = ""
        this.password = ""
        this.token = ""
        console.log(error)
      })
    },
   
  },
  created() {
    this.$store.commit('clearUser')

     if (window.localStorage.getItem('authenticated') === 'true') {
       this.$router.push('/dashboard');
     }
  },
};


//  axios({
//    method: 'post',     //put
//    url: url,
// headers: {'Authorization': 'Bearer'+token}, 
//  data: {
//       firstName: 'Keshav', // This is the body part
//       lastName: 'Gera'
//    }
//  });
</script>
