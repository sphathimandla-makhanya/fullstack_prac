<template>
    <div class="view">
      <h1>This is an Sign-Up page</h1>
      <input type ='name' placeholder="name" required v-model="name">
      <br><br>
      <input type ='email' placeholder="email" required v-model="email">
      <br><br>
      <input type ='password' placeholder="password" required v-model="password">
      <br><br>
      <input type ='textarea' placeholder="message" required v-model="message">
      <br><br>
      <button @click="submitData()">Submit</button>
    </div>
  </template>

  <script>
    export default{
        computed: {
  fetchData(){
    this.$store.dispatch('fetchData')
  }
},
  data() {
return{
  name:'Sphathi',
  email:'',
  password:'',
  message:"hi there buddy"
}
  },
  methods:{
    submitData(){
    console.log(this.$data.email)
    this.$store.dispatch('login',this.$data)
    }
  }
}
</script>