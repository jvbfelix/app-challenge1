<template>
  <div class="Number">
    <h3>{{ num }}</h3>
    <h3>{{ name }}</h3>
  </div>
</template>

<script>
export default {
  name: 'DashNumber',
  props: {
    num: String,
    name: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.Number{
    padding: 20px;
    border-radius: 7px;
    margin: 15px;
    background: linear-gradient(30deg, #CACACA, #317AF6);
    color: #FFFFFF;
    box-shadow: 0 0 10px #0000002A;
    h3 {
        font-weight: 600;
        margin: 10px 0 0;
        text-align: left;
    }
}
@media (max-width: 1500px){
  
  .Number{
    padding: 15px;
    border-radius: 7px;
    margin: 15px 10px;
    background: linear-gradient(30deg, #CACACA, #317AF6);
    color: #FFFFFF;
    box-shadow: 0 0 10px #0000002A;
    h3 {
        font-weight: 600;
        margin: 10px 0 0;
        text-align: left;
        font-size: .9em;
    }
  } 
}
</style>
