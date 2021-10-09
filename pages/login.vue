<template>
  <!-- <div>
    <div>
      <h1>ログインユーザ</h1>
      <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
      <p>ユーザーは{{ $auth.user }}</p>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="user.email" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="user.password" />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <nuxt-link to="/register">アカウント登録</nuxt-link>
    </div>
  </div> -->
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">ログイン</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            ref="email_form"
            prepend-icon="mdi-account-circle"
            label="メールアドレス"
            v-model="user.email"
            :rules="[emailRules.required, emailRules.regex]"
            lazy-validation
          />
          <v-text-field
            ref="password_form"
            :rules="[passwordRules.required, passwordRules.regex]"
            @click:append="showPassword = !showPassword"
            prepend-icon="mdi-lock"
            v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            v-bind:type="showPassword ? 'text' : 'password'"
            label="パスワード"
            v-model="user.password"
            lazy-validation
          />
          <v-card-actions>
            <v-btn class="info" @click="loginUser">ログイン</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="success" to="/register">アカウント作成する</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      emailRules: {
        required: v => !!v || `E-mail を入力してください`,
        regex: v =>
          /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail 形式が不適切です"
      },
      passwordRules: {
        required: v => !!v || `パスワード を入力してください`,
        regex: v => /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)[a-zA-Z\\d]{8,32}$/.test(v) || '半角の大文字/小文字/記号をそれぞれ1つ以上含む8文字以上32文字以下の文字列'
      },
      user: {
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    this.$refs.email_form.resetValidation();
    this.$refs.password_form.resetValidation();
  },
  methods: {
    loginUser() {
      if (this.$refs.email_form.resetValidation() && this.$refs.password_form.resetValidation()) {
        this.$auth
          .loginWith("local", {
            data: this.user
          })
          .then(response => {
            //ホームに移動する
            this.$router.push("/");
          })
          .catch(err => {
            alert("入力した値が不適切です");
            //モーダルをアラートを表示する
          });
      }
    }
  }
};
</script>
