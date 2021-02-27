<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <a class="navbar-brand">PonyRacer</a>
    <button type="button" class="navbar-toggler" @click="toggleNavbar()">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbar" class="navbar-collapse" :class="{ collapse: navbarCollapsed }">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link">Races</a>
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
