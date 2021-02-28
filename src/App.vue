<template>
  <navbar></navbar>
  <div class="container" style="margin-top: 70px">
    <router-view v-slot="{ Component }">
      <alert v-if="errorMessage" :variant="'danger'">An error occurred while loading.</alert>
      <suspense timeout="100">
        <component :is="Component" />
        <template #fallback>Loading...</template>
      </suspense>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Races from '@/Views/Races.vue';
import Alert from '@/components/Alert.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Races,
    Alert
  },

  setup() {
    const errorMessage = ref<string | null>(null);

    onErrorCaptured(() => {
      errorMessage.value = 'errorOccured';
      return false;
    });

    return { errorMessage };
  }
});
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';
</style>
