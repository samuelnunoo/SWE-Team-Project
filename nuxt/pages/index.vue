<template>
<v-app>
  <v-main>
    <!-- Splash Screen -->
    <v-parallax
      dark
      height="1000"
      src="https://images.unsplash.com/photo-1618438974496-015b1fb3e2d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1944&q=80"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col class="text-center">
          <h1> Type.io </h1>
          <h4> Simplicity and Power </h4>
          <v-btn
            to="/signup"> Sign-Up </v-btn>
        </v-col>
      </v-row>
    </v-parallax>
  </v-main>
</v-app>
</template>
<script >

export default {
  name: 'Home',
  auth:false,
  beforeCreate() {
   if (this.$auth.loggedIn) {
      this.$router.push("/documents")
    }
  },
  mounted() {

 
 
  }
}
</script>
