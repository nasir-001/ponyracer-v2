<template>
  <div v-for="race of races" :key="race">
    <h2>{{ race.name }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RaceModel } from '@/models/RaceModel';

export default defineComponent({
  name: 'Races',

  setup() {
    const races = ref<Array<RaceModel>>([{ name: 'Lyon' }, { name: 'London' }]);

    return { races };
  }
});
</script>
