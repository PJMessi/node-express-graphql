<template>
  <div class="login">
    <input type="email" placeholder="Email" v-model="authData.email">
    <input type="password" placeholder="Password" v-model="authData.password">
  </div>
</template>

<script>
export default {
  name: "Login",

  data () {
    return {
      authData: {
        email: 'pjmessi10@gmail.com',
        password: 'prajwal10'
      }
    }
  }
}
</script>
