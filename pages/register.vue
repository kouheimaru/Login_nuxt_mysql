<template>
<div>
  <div>
  <h1>ユーザ登録</h1>
  <form @submit.prevent="registerUser">
    <div class="form-group">
      <label for="name">Name:</label>
      <input v-model="user.name">
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="user.email">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" v-model="user.password">
    </div>
    <button type="submit">登録</button>
  </form>
  </div>
</div>
</template>

<script>
  export default {
    data(){
      return {
        user:{
          name:'Steve Harry',
          email:'steve@test.com',
          password:'password'
        }
      }
    },
    methods:{
      registerUser(){
        this.$axios.post('/api/auth/register',this.user)
                    .then((response) => {
                        this.$auth.loginWith('local',{
                            data: this.user
                    })
        })
      },
    }
  }
</script>