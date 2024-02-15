<template>
  <div>
    <h1>This is an Login page</h1>
      <input type ='name' placeholder="username" required v-model="username">
      <br><br>
      <!-- <input type ='email' placeholder="email" required v-model="email">
      <br><br> -->
      <input type ='password' placeholder="password" required v-model="password">
      <br><br>
      <button @click="signUp">Sign Up</button>
      <br><br>{{ $store.state.loggedIn }}
      <button @click="login">Login</button>
  </div>
</template>

<script>

export default {
    data(){
        return{
            username: null,
            password: null
        }
    },
    computed: {
  signUp(){
    // console.log(this.$data)
    this.$store.dispatch('addUser', this.$data)
  },
  login(){
    this.$store.dispatch('checkUser', this.$data)
  }
}
}
</script>

<style>

</style>