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
        v-if="!this.auth"
      >
        Login
      </v-btn>
      <!-- SignUp Button -->
      <v-btn
        to="/signup"
        text
        v-if="!this.auth"
        >
        Sign Up
      </v-btn>

      <!-- Logout Button -->
       <v-btn
        @click='logout'
        text
        v-if ="this.auth"
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
  props:{ 
    authMock: {
      type: Boolean,
      default: false 
    }
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      title: 'Type.io'
    }
  },
  computed: {
    auth: function () {
      if (this.authMock) {
        return this.authMock
      }
      else {
        return this.$auth.user 
      }
  
    }
  },
  methods: {
   async logout() {
      const logout = await this.auth.logout()
      
    }
  }

}
</script>
