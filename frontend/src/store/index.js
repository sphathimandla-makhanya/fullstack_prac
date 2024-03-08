import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router';
axios.defaults.withCredentials=true  //store cookies in developer tools application tab
const baseUrl = 'http://localhost:7000'

export default createStore({
  state: {
    Friends: null,
    Updatedb: null,
    Users: null,
    loggedIn: false
  },
  getters: {

  },
  mutations: {
    setFriends(state,payload){
      state.Friends=payload
    },
    setUpdatedb(state, payload){
      state.Updatedb=payload
    },
    setUsers(state, payload){
      state.Users=payload
    },
    setLogged(state, payload){
      state.loggedIn=payload
    }
  },
  actions: {
    async getFriends({commit}){
      let {data}= await axios.get(baseUrl+'/friends')
           console.log(data);
           commit('setFriends', data)
     },
     async addFriend(a, newfriend){
      await axios.post(baseUrl+'/friends', newfriend)
      window.location.reload()
     },
     async deleteFriend({commit}, name){
      await axios.delete(baseUrl+`/friends/${name}`)
      window.location.reload()
     },
     async editFriend({commit}, update){
      await axios.patch(baseUrl+'/friends' + update.name, update)
      window.location.reload()
     },
     async addUser({commit}, newUser){
      //console.log(newUser);
      let {data}=await axios.post(baseUrl+'/users', newUser)
      alert(data.msg)
      window.location.reload()
    },
    async checkUser({commit}, currentUser){
      //console.log(newUser);
      let {data}=await axios.post(baseUrl+'/login', currentUser)
      $cookies.set('jwt',data.token) //data.token is the value of the token being sent from axios
      // alert(data.msg)
      await router.push('/') // to redirect the page after logging/signing up  
      //commit('setLogged',true)
      window.location.reload()
    },
    async logout(context){
      let cookies = $cookies.keys()
      console.log(cookies)
      $cookies.remove('jwt')  //deleting from frontend
      window.location.reload()
      // let {data}= await axios.delete(baseUrl+'/logout')  //deleting from backend
      // alert(data.msg)
    }

  },
  modules: {
  }
})

