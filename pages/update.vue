<template>
<div>
  <div>
    <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
  <p>ユーザーは{{ $auth.user }}</p>
  <p>ユーザーは{{ user.email }}</p>
  <h1>パスワードの更新</h1>
  <form @submit.prevent="updateUser">
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" v-model="user.password">
    </div>
    <button type="submit">パスワードの更新</button>
  </form>
  </div>
</div>
</template>
<script>
export default{
  middleware: "auth",
    data(){
      return {
        user:{
          name:this.$auth.user.name,
          email:this.$auth.user.email,
          password:''
        }
      }
    },
     methods:{
      updateUser(){
        this.$axios.post('/api/update',this.user)
                    .then((response) => {
                    //ホームに管理画面へ移動する
                      alert("更新成功")
                      this.$router.push('/user')

        })
        .catch(error => {
          var aryStringify = JSON.stringify(this.user);
          alert(aryStringify);
        });
      },
    }
}
</script>