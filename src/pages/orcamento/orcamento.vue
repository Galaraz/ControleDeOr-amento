<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
     
     <b-form-group id="input-group-1" label="Empresa:" label-for="input-1">
        <b-form-select
          id="input-1"
          v-model="form.empresa"
          :options="empresa"
          required
        ></b-form-select>
      </b-form-group>
    
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
      
      <b-form-group id="input-group-5" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
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
        show: true
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
    }
  }
</script>

