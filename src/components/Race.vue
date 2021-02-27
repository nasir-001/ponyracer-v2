<template>
  <div>
    <h2>{{ name }}</h2>
    <ul v-for="pony of ponies" :key="pony.id">
      <li>{{ pony.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { RaceModel } from '@/models/RaceModel';
import { defineComponent, PropType, toRefs } from 'vue';

export default defineComponent({
  name: 'Race',

  props: {
    raceModel: {
      type: Object as PropType<RaceModel>,
      required: true
    }
  },

  setup(props) {
    return { ...toRefs(props.raceModel) };
  }
});
</script>
