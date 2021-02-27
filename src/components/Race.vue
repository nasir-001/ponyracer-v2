<template>
  <div>
    <h2>{{ name }}</h2>
    <p>{{ startInstant }}</p>
    <ul v-for="pony of ponies" :key="pony.id">
      <li>{{ pony.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { RaceModel } from '@/models/RaceModel';
import { defineComponent, PropType, toRefs, computed } from 'vue';
import fromNow from '@/utils/FromNow';

export default defineComponent({
  name: 'Race',

  props: {
    raceModel: {
      type: Object as PropType<RaceModel>,
      required: true
    }
  },

  setup(props) {
    const startInstant = computed(() => fromNow(props.raceModel.startInstant));

    return { ...toRefs(props.raceModel), startInstant };
  }
});
</script>
