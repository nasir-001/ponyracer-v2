<template>
  <div v-for="race of races" :key="race">
    <race :raceModel="race"></race>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import Race from '@/components/Race.vue';
import { useRaceService } from '@/composables/RaceService';

export default defineComponent({
  name: 'Races',
  components: {
    Race
  },

  async setup() {
    const race = useRaceService();
    const races = ref<Array<RaceModel | null>>();

    races.value = await race.list();

    return { races };
  }
});
</script>
