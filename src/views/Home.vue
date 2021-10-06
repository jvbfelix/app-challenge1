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
      <form class="login-form">
        <label for="API">Chave API</label>
        <input type="text" id="API" name="API" />
        <button>Entrar</button>
        <a href="#">Onde encontro a minha Chave API?</a>
        <a href="#">Saiba com encontrar o ID do seu motorista</a>
      </form>
    </div>

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">

.banner-home {
  background-color: #F5F3F3;
  margin: 40px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 10px #0000001A;

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
      margin: 0 0 5px 0;
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
}

</style>