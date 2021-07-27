<template>
  <div>
    <div class="row">
        <div class="col">
            <b-overlay variant="white" spinner-variant="primary" :show="processando" rounded="sm" style="width:100%">
            <Widget
                title="<h5><i class='form'></i> Novo Orçamento</h5>"
                bodyClass="mt-2"
                customHeader
            >
    <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
      <div class="row"><div class="col"><hr></div></div>

      <!-- <div class="row">
        <div class="col col-6">
          <b-form-group id="input-group-1" label="Empresa:" label-for="input-1">
            <b-form-select
              id="input-1"
              v-model="form.empresa"
              :options="empresa"
              required
            ></b-form-select>
          </b-form-group>
        </div>
      </div> -->
     
     
    
    <b-form-group
        id="input-group-2"
        label="E-mail do Responsavel:"
        label-for="input-2"
        description=""
      >    
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>  
   
      <b-form-group id="input-group-4" label="Nome do Responsavel:" label-for="input-4">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
<b-form-group
        id="input-group-4"
        label="Telefone do Responsavel:"
        label-for="input-4"
        description=""
      >

           <b-form-input
          id="input-4"
          v-model="form.telefone"
          placeholder="telefone aqui"
          required
        ></b-form-input>
      </b-form-group>

  <b-form-group
        id="input-group-5"
        label="Nome do equipamento:"
        label-for="input-5"
        description=""
      >

           <b-form-input
          id="input-5"
          v-model="form.telefone"
          placeholder="equipamento aqui"
          required
        ></b-form-input>
      </b-form-group>
      
      <!-- <b-form-group id="input-group-5" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->

      
    <!-- </b-form> -->
    
    </Widget>
            </b-overlay>
        </div>
    </div>

    <div class="col">
      <div class="row">
          <div class="col">
            <b-button type="submit" variant="primary">Enviar</b-button>
            <b-button type="reset" variant="danger">Refazer</b-button>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          empresa: null,
          email: '',
          name: '',
          telefone:'',
        },
        empresa: [{ text: 'Selecione uma empresa', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
        processando: false,
        registers: [],
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.empresa = null
        this.form.email = ''
        this.form.name = ''
        this.form.telefone =''
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    created(){
      this.$store.commit('setNomePagina', '<i class="fas fa-plus"></i>&nbsp;&nbsp;Orçamento - Novo')
    }
  }
</script>

