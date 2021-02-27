<template>
  <div v-for="race of races" :key="race">
    <race :raceModel="race"></race>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import Race from '@/components/Race.vue';
import { useRaceService } from '@/composables/RaceService';

export default defineComponent({
  name: 'Races',
  components: {
    Race
  },

  setup() {
    const race = useRaceService();
    const races = ref<Array<RaceModel | null>>();

    onMounted(async () => {
      races.value = await race.list();
    });

    return { races };
  }
});
</script>
