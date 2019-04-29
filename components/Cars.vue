<template>
  <b-card-group deck>
    <b-card
      v-for="car in cars"
      img-top
      tag="article"
      style="min-width: 30rem;"
      class="mb-2">
      <b-card-img :src="require('~/assets/car.png')" class="rounded-0"></b-card-img>
      <b-card-title>{{ formatLincesePlate(car.licensePlateNumber) }}</b-card-title>
      <b-card-sub-title>{{ car.type.text }}</b-card-sub-title>
    </b-card>
  </b-card-group>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: ['cars'],
  methods: {
    formatLincesePlate (string: String) {
      let licensePlateParts:any = string.match(/([A-z]+)(\d+)/);

      return `${licensePlateParts[1]}-${licensePlateParts[2]}`.toUpperCase();
    }
  }
})

export default class Cars extends Vue {}
</script>

<style lang="scss">

</style>
