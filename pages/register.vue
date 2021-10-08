<template>
<div>
  <div>
    <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
  <p>ユーザーは{{ $auth.user }}</p>
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
                      //ログインを実行する
                      console.log("ログインしてみたよ")
                        this.$auth.loginWith('local',{
                            data: this.user
                    })
                    //ホームに移動する
                      console.log("ホームに移動する")
                      this.$router.push('/')

        })
        .catch(error => {
          alert("「"+this.user.email+"」使用済みです");
        });
      },
    }
  }
</script>