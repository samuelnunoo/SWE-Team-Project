<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
   
   
      <v-btn
        to="/"
        text
      >
       Type.io
      </v-btn>
      <v-spacer />
      <!-- Login Button -->
      <v-btn
        to="/login"
        text>
        Login
      </v-btn>
      <!-- SignUp Button -->
      <v-btn
        to="/signup"
        text>
        Sign Up
      </v-btn>
   
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      title: 'Type.io'
    }
  }
}
</script>
