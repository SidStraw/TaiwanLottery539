<template>
  <v-row class="h-100 align-center">
    <v-col cols="12" id="firebaseui-auth-container"></v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
const ui = new firebaseui.auth.AuthUI(firebase.auth())
export default {
  mounted() {
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.$router.push('/')
          return false
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      // signInSuccessUrl: '/',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  },
}
</script>

<style lang="scss" scoped>
.h-100 {
  height: calc(100vh - 64px);
}
</style>
