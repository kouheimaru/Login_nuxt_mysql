<template>
<div>
  <div>
  <h1>ログインユーザ</h1>
  <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
  <p>ユーザーは{{ $auth.user }}</p>
  <form @submit.prevent="loginUser">
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="user.email">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" v-model="user.password">
    </div>
    <button type="submit">ログイン</button>
  </form>
    <nuxt-link to="/register">アカウント登録</nuxt-link>
  </div>
</div>
</template>

<script>
  export default {
    data(){
      return {
        user:{
          email:'',
          password:''
        }
      }
    },
    methods:{
      loginUser(){
        this.$auth.loginWith('local',{
          data:this.user
        })
        
      },
    }
  }
</script>