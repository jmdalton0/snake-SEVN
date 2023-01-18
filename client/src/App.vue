<template>
  <header>
    <h1>Snake</h1>
  </header>
  <Console/>
  <footer>
    <img src="./assets/logo.svg" alt="Vue Logo" class="logo">
    <a
      href="https://github.com/jmdalton0/snake-vue"
      target="_blank"
      class="link"
      ><img src="./assets/GitHub_Logo_White.png" alt="GitHub Logo">
    </a>
  </footer>
</template>

<script>
import Console from './components/Console.vue';
export default {
  name: 'App',
  components: {
    Console
  }
}
</script>

<style scoped>
footer {
    display: flex;
    justify-content: space-between;
    width: var(--desktop-width);
    margin: 1rem auto;
}

.logo {
  height: 4rem;
}
</style>
