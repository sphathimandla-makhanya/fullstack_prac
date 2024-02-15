<template>
  <div class="home">
    <table>
      <th>
        Name
      </th>
      <tr>
        <tbody v-for="item in $store.state.Friends" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <button @click="deleteFriend(item.name)">Delete</button>
          <button @click="editFriend(item.name)">Edit</button>
        </tbody>
      </tr>
    </table>
    <input type ='text' placeholder="name" required v-model="name">
    <input type ='text' placeholder="age" required v-model="age">
    <button @click="addFriend()">Submit</button>
  </div>
</template>

<script>

export default {
  data(){
    return{
      name: null,
      age: null
    }
  },
  methods:{
      deleteFriend(name){
      this.$store.dispatch('deleteFriend', name)
    },
    editFriend(id){
      let edit = {
        id: id,
        name: this.name,
        age: this.age
      }
      this.$store.dispatch('editFriend', edit)
    }
    },
  computed: {
    getFriends(){
      this.$store.dispatch('getFriends')
    }, 
    addFriend(){
      this.$store.dispatch('addFriend', this.$data)
    }
  },mounted(){
    this.getFriends
  }
  }
</script>
