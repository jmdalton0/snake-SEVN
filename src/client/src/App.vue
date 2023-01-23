<template>
  <header>
    <h1>Snake</h1>
  </header>
  <Console/>
  <footer>
    <a
      href="https://github.com/jmdalton0/snake-sevn"
      target="_blank"
      class="link"
      ><img src="./assets/GitHub_Logo_White.png" alt="GitHub Logo" class="logo">
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
    justify-content: flex-end;
    width: var(--dim);
    margin: 1rem auto;
}

.logo {
  height: 3rem;
}

@media (max-width: 1024px) {
  footer {
    width: var(--dim);
  }
}
</style>
