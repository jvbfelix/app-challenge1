<template>
  <nav id="nav">
    <div></div>
    <img alt="Painel logo" src="./assets/logo.png">
    <div class="nav-link"><a class="nav-btn" href="https://faqpainelinteligente.tawk.help/category/perguntas-frequentes">
    Precisa de ajuda?</a>
    <p class="nav-btn" v-if="isAuthenticated" v-on:click="logout()">Sair</p></div>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import store from './store'
import { computed } from '@vue/reactivity'

export default {
  name: 'app',
  setup(props) {
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    console.log(props.img)
    return {
      isAuthenticated
    }
  },
  methods: {
    logout() {
      store.dispatch('logout')
      this.$router.push('/')
    }
  },
  updated () {
    console.log('Nova versão disponível')
    window.location.reload(true)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700&display=swap');

#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

.container {
  display: flex;
  min-height: 100vh;
  margin-left: calc(10vw + 60px);
}

#nav {
  padding: 30px;
  background-color: #00BFA6;
  width: 10vw;
  height: calc(100% - 60px);
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 90%;
    object-fit: contain;
  }

  .nav-link {
    min-height: 80px;
    width: fit-content;
    justify-self: flex-end;
  }

  .nav-btn {
    color: #FFFFFF;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
