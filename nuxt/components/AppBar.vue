<template>

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
</template>
<script>
export default {
    name:"AppBar",
     data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      title: 'Type.io'
    }
  },
    methods: {
   async logout() {
      const logout = await this.$auth.logout()
      
      
    }
  },
  computed:{
    auth: function () {
      return this.$auth.loggedIn
    }
  }
}
</script>
