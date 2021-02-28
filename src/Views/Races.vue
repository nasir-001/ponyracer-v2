<template>
  <Alert v-if="error" @dismissed="error = false" dismissible :variant="'success'">Races component</Alert>
  <div v-for="race of races" :key="race">
    <race :raceModel="race"></race>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { RaceModel } from '@/models/RaceModel';
import Race from '@/components/Race.vue';
import { useRaceService } from '@/composables/RaceService';
import Alert from '@/components/Alert.vue';

export default defineComponent({
  name: 'Races',
  components: {
    Race,
    Alert
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
