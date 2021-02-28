<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="navbar-link">
      <router-link class="navbar-brand text-dark" :to="{ name: 'home' }">PonyRacer</router-link>
    </div>
    <button type="button" class="navbar-toggler" @click="toggleNavbar()">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbar" class="navbar-collapse" :class="{ collapse: navbarCollapsed }">
      <ul class="navbar-nav mr-auto">
        <li class="nav-link">
          <router-link class="navbar-brand text-dark" :to="{ name: 'races' }">Races</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Navbar',

  setup() {
    const navbarCollapsed = ref<boolean>(true);

    const toggleNavbar = () => {
      navbarCollapsed.value = !navbarCollapsed.value;
    };

    return { toggleNavbar, navbarCollapsed };
  }
});
</script>
