<template>
  <div class="container">
    <div>
      <h1 class="title">
        ユーザ管理画面
      </h1>
      <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
      <p>ユーザーは{{ $auth.user }}</p>
      <p>{{user}}</p>
      <p>{{ user.name}}</p>
      <p>{{ user.email}}</p>
      <p>{{ user.password}}</p>
    </div>
    <div>
      <button @click="logoutUser()">Logout</button>
    </div>
    <div>
      <button @click="deleteUser()">アカウント削除</button>
    </div>
    <div>
       <nuxt-link to="/update">パスワードの更新</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  data(){
      return {
        user:{
          name:this.$auth.user.name,
          email:this.$auth.user.email,
          password:this.$auth.user.password
        }
      }
    },
  methods:{
      logoutUser(){
        this.$auth.logout()
        this.$router.push('/login')
      },
      deleteUser(){
        this.$axios.post('/api/delete',this.user)
                    .then((response) => {
                    //ホームに移動する
                      console.log("削除成功")
                      console.log("ログアウトする")
                      this.logoutUser()

        })
        .catch(error => {
          alert("sippai");
        });
      },
    }
};
</script>