<template>
  <div class="text-center" style="margin-top: 100px">
    <div>
      <h1>Ponyracer <small>Always a pleasure to bet on ponies</small></h1>
    </div>

    <div class="mt-4">
      <router-link class="btn btn-primary" :to="{ name: 'login' }">Login</router-link>
    </div>
    <div class="mt-4">
      <router-link class="btn btn-primary" :to="{ name: 'register' }">Register</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home'
});
</script>
