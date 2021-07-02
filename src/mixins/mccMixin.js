// import config from '../config';

export default {
  data: () => {
      return {
          // appConfig: config.app,
      }
  },
  methods: {

    //Validacao de Usuario
    mccUsuarioValidar(permissao){
      //Verifica se existe usuário na secao
      if(this.$store.state.user.name==null){ 
        this.$router.push({ name: 'Login'}); 
        // return 'usuário nulo'
      }
      if(permissao!=null){
        if(!this.usuarioTemPermissao(permissao)){
          this.$store.commit('setSistemaMensagemHome', 'Sem permissão na funcionalidade ['+permissao+'].')
          this.$router.push({ name: 'mcc'}); 
        }
      }
      //Usuario ativo
      //Reautorizando appToken no AXIO
      this.$http.defaults.headers.common['Authorization'] = 'Bearer'+ this.$store.state.appToken
    },

    mccUsuarioPermissao(permissao){
      if(permissao!=null){
        if(this.usuarioTemPermissao(permissao)){
          return true
        }
      } 
      return false
    },


    erroConexao(error){
      // eslint-disable-next-line
      console.log(error)
      if(error.response){
        if(error.response.status === 401) {
          this.$router.push({ name: 'Logout'}); 
        }
      } else {
        this.showMessage('Erro na conexão. Favor acione o suporte.', 'danger')
      }
    },


    usuarioTemPermissao(privilegio){
      var todos = this.$store.state.privilegios
      var tem = todos.find(x => x.nome_interno === privilegio);
      if(tem){
        return true
      }
      return false
    },




    decodeHtml(html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },

    //Mostra Mensagem na Tela
    showMessage(mensagem='mensagem', variant='success', titulo=null) {
      const h = this.$createElement
      let datahora = new Date().toLocaleString('pt-BR')
      if(titulo==null){
        if(variant=='danger'){
          titulo = h(
              'div',
              { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
              [
                h('i', { class: 'fas fa-bomb' }),
                h('span', '_'),
                h('strong', { class: 'mr-2' }, 'Erro'),
                h('small', { class: 'ml-auto text-italics' }, datahora)
              ]
            )
        } else if(variant=='success'){
          titulo = h(
              'div',
              { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
              [
                h('i', { class: 'far fa-thumbs-up' }),
                h('span', '_'),
                h('strong', { class: 'mr-2' }, 'Sucesso'),
                h('small', { class: 'ml-auto text-italics' }, datahora)
              ]
            )
        } else if(variant=='warning'){
          titulo = h(
              'div',
              { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
              [
                h('i', { class: 'fas fa-exclamation-triangle' }),
                h('span', '_'),
                h('strong', { class: 'mr-2' }, 'Alerta'),
                h('small', { class: 'ml-auto text-italics' }, datahora)
              ]
            )
        } else if(variant=='info'){
          titulo = h(
              'div',
              { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
              [
                h('i', { class: 'fas fa-exclamation-triangle' }),
                h('span', '_'),
                h('strong', { class: 'mr-2' }, 'Informação'),
                h('small', { class: 'ml-auto text-italics' }, datahora)
              ]
            )
        }
      }
      this.$bvToast.toast(mensagem, {
        title: titulo,
        variant: variant,
        solid: false,
        'auto-hide-delay': 70000,
        // 'toast-class': "toastrmcc",
        toaster: "b-toaster-top-center",
      })
    },

    dataHoraBR(data) {
      if(data==null ||data=="" ){ return null }
      return (data.substr(0, 10).split('-').reverse().join('/') +" "+ data.substr(11,8) );
    },
    dataBR(data) {
      if(data==null ||data=="" ){ return null }
      return (data.substr(0, 10).split('-').reverse().join('/') );
    },
    numeroBR(numero){
      numero = parseFloat(numero)
      numero = numero.toFixed(2).split('.');
      numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
      return numero.join(',');
    }
   
  }

};
