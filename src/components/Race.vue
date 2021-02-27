<template>
  <div>
    <h2>{{ name }}</h2>
    <p>{{ startInstant }}</p>
    <div class="row">
      <div class="col" v-for="pony of ponies" :key="pony.id">
        <pony :ponyModel="pony"></pony>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RaceModel } from '@/models/RaceModel';
import { defineComponent, PropType, toRefs, computed } from 'vue';
import fromNow from '@/utils/FromNow';
import Pony from '@/components/Pony.vue';

export default defineComponent({
  name: 'Race',
  components: {
    Pony
  },

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
