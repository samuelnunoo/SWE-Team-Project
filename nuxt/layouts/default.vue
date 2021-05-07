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
        text
        v-if="!$auth.user"
      >
        Login
      </v-btn>
      <!-- SignUp Button -->
      <v-btn
        to="/signup"
        text
        v-if="!$auth.user"
        >
        Sign Up
      </v-btn>

      <!-- Logout Button -->
       <v-btn
        to="/signup"
        text
        v-if ="$auth.user"
        >
        Logout
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
