<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
   
   
      <v-btn
        to="/documents"
        text
      >
       {{this.title}}
      </v-btn>
      <v-spacer />
      <!-- Login Button -->
      <v-btn
        to="/login"
        text
        v-if="!this.$auth.loggedIn"
      >
        Login
      </v-btn>
      <!-- SignUp Button -->
      <v-btn
        to="/signup"
        text
        v-if="!this.$auth.loggedIn"
        >
        Sign Up
      </v-btn>

      <!-- Logout Button -->
       <v-btn
        @click='logout'
        text
        v-if ="this.$auth.loggedIn"
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
  },
  computed: {
    auth: function () {
      if (this.authMock) {
        return this.authMock
      }
      else {
        return this.$auth.loggedIn
      }
  
    }
  },
  methods: {
   async logout() {
      const logout = await this.$auth.logout()
      //@todo figure out how to refresh page 
      
    }
  },

  mounted() {

  }

}
</script>
