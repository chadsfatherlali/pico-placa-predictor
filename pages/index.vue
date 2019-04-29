<template>
  <section class="container">
    <h1>Predictor de pico y placa</h1>

    <div>
      <b-form @submit="onSubmit">
        <b-form-group v-for="inputType in inputTypes"
          :id="inputType.group.id"
          :label="inputType.group.label"
          :label-for="inputType.group.labelFor"
          :description="inputType.group.description">
        
          <b-form-input
            :id="inputType.input.id"
            v-model="userCarInformation[inputType.input.model]"
            :type="inputType.input.type"
            :required='inputType.input.required'
            :placeholder="inputType.input.placeholder"
            :minlength="inputType.input.minlength"
            :maxlength="inputType.input.maxlength"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Consultar</b-button>
      </b-form>
    </div>

    <hr />

    <div v-if="carsList">
      <div>
        <div class="alert alert-danger" role="alert">
          Carros que no pueden circular
        </div>
        <Cars :cars="carsList.notAllowed"/>
      </div>

      <div>
        <div class="alert alert-success" role="alert">
          Carros que pueden circular
        </div>
        <Cars :cars="carsList.allowed"/>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';
import Cars from '~/components/Cars.vue';
import Car from '~/class/Car.ts' ;

@Component({
  data () {
    return {
      carsList: null,
      userCarInformation: {
        licensePlateNumber: '',
        date: '',
        time: ''
      },
      inputTypes: [
        //License plate
        {
          group: {
            id: 'group1',
            label: 'Número de placa:',
            labelFor: 'input1',
            description: 'Por favor ingrese su número de placa sin el último dígito'
          },
          input: {
            id: 'input1',
            model: 'licensePlateNumber',
            type: 'text',
            required: true,
            placeholder: 'PCG757',
            minlength: 5,
            maxlength: 6
          }
        },
        //Date
        {
          group: {
            id: 'group2',
            label: 'Fecha:',
            labelFor: 'input2',
            description: 'Por favor ingresa una fecha de verficicación'
          },
          input: {
            id: 'input2',
            model: 'date',
            type: 'date',
            required: true,
            placeholder: '',
            minlength: '',
            maxlength: ''
          }
        },
        //Time
        {
          group: {
            id: 'group3',
            label: 'Hora:',
            labelFor: 'input3',
            description: 'Por favor ingresa una hora'
          },
          input: {
            id: 'input3',
            model: 'time',
            type: 'time',
            required: true,
            placeholder: '',
            minlength: '',
            maxlength: ''
          }
        }
      ]
    }
  },
  components: {
    Cars
  },
  methods: {
    onSubmit (e) {
      e.preventDefault();
      
      this.$data.carsList = null;

      const timeZone:string = 'America/Guayaquil';

      const data:any = {
        licensePlateNumber: this.$data.userCarInformation.licensePlateNumber, 
        time: moment(`${this.$data.userCarInformation.date} ${this.$data.userCarInformation.time}`).tz(timeZone).unix(),
        dayOfWeek: moment(`${this.$data.userCarInformation.date}`).tz(timeZone).day(), 
        allowedHours: {
          min: moment(`${this.$data.userCarInformation.date} 09:31`).tz(timeZone).unix(),
          max: moment(`${this.$data.userCarInformation.date} 15:59`).tz(timeZone).unix(),
          start: moment(`${this.$data.userCarInformation.date} 7:00`).tz(timeZone).unix(),
          end: moment(`${this.$data.userCarInformation.date} 19:30`).tz(timeZone).unix()
        }
      };
      
      const carsList = new Car(data);

      this.$data.carsList = carsList.getList();
    }
  }
})

export default class Home extends Vue {}
</script>

<style lang="scss">
h1 {
  margin-bottom: 1em;
}
pre {
  margin-top: 2em;
}
#input1 {
  text-transform: uppercase;
}
</style>
