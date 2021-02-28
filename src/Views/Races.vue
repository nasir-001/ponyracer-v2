<template>
  <!-- <div v-if="(error = true)" class="alert alert-danger">
    An error occurred while loading.
    <button @click="error = false" type="button" class="close" aria-label="Close"><span aria-hidden="true">&#215;</span></button>
  </div> -->
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
    const error = ref<boolean>(false);

    try {
      onMounted(async () => {
        races.value = await race.list();
      });
    } catch (err) {
      error.value = true;
    }

    return { races };
  }
});
</script>
