<template>
  <div class="home">
    <div class="banner-home">
      <h1>Tenha mais controle da manutenção da sua frota.</h1>
      <div class="mid">
        <div class="gestor-banner">
          <h5>GESTOR DE FROTA</h5>
          <img alt="Gestor logo" src="../assets/gestor.png">
        </div>
        <div class="paragrafo">
        <p>Usando o Painel Inteligente você irá aprimorar a organização de manutenções preventivas, reduzindo a necessidade de manutenções corretivas, resultando em economia para a sua empresa.</p>
        <p>É grátis e fácil de usar! Experimente agora</p>
        </div>
      </div>
      <form class="login-form" @submit.prevent="login">
        <label for="API">Chave API</label>
        <input type="text" v-model="APIkey" id="API" name="API" minlength="8" />
        <button>Entrar</button>
        <a href="https://suporte.cobli.co/pt-BR/articles/5569498-como-gerar-chaves-para-consumir-as-apis-da-cobli">Onde encontro a minha Chave API?</a>
        <a href="https://faqpainelinteligente.tawk.help/category/perguntas-frequentes">Tire suas principais dúvidas aqui</a>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '../store'
import axios from 'axios';
import { computed } from '@vue/reactivity'

export default {
  name: 'Home',
  data() {
    return {
      APIkey: '',
    }
  },
  methods: {
    login() {
      const headers = {
        'cobli-api-key': this.APIkey,
      }
      axios
        .get("https://backend-app-challenge-jvbfelix.vercel.app/manutencao",{
            headers:headers,
        })
        .then(() => {
            store.dispatch('login',this.APIkey)
            this.$router.push('/dash')
        }).catch(() => {
            alert("Erro ao validar a chave, favor verificar e tentar novamente")
        })
    }
  },
  setup(props) {
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    console.log(props.img)
    return {
      isAuthenticated
    }
  },
  mounted() {
    if(this.isAuthenticated) {
      this.$router.push('/dash')
    }
  }
}
</script>

<style lang="scss">

.home {
  display: flex;
  min-height: 100vh;
  align-items: center;
}

.banner-home {
  background-color: #F5F3F3;
  margin: 40px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 10px #0000001A;
  height: fit-content;

  img {
    max-width: 250px;
  }

  h1 {
    font-size: 2.5em;
    width: 70%;
    text-align: left;
    margin: 0 0 30px 0;
  }
}

.mid {
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .gestor-banner{
    margin-right: 20px;

    h5 {
      margin: 0;
    }
  }

  .paragrafo{
    max-width: 40%;
    margin-right: 40px;
  }

  p {
    text-align: justify;
    margin: 0;
    font-size: 1.2em;
    line-height: 1.5em;
  }
}

.login-form {
  display: flex;
  flex-direction: column;

  button {
    background-color: #00BFA6;
    color: #FFFFFF;
    padding: 15px;
    border-radius: 7px;
    border: none;
    margin: 20px 0;
    outline: none;
  }

  input {
    background-color: #FFFFFF;
    border: 1px solid #DDE5ED;
    font-size: 1.1em;
    font-weight: 100;
    padding: 12px;
    border-radius: 7px;
  }

  label,a{
    justify-self: flex-start;
    align-self: flex-start;
    font-weight: 700;
    text-decoration: none;
    margin: 10px 0;
  }

  a {
    color: #317AF6;
  }
}

@media (min-width: 1500px){
  .banner-home {
    margin: 40px 140px;
    font-size: 1.2em;
    img {
      max-width: 350px;
    }
  }
}

</style>