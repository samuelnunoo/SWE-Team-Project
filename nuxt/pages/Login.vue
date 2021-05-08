/*  eslint-disable */
<template>
    <v-main>
          <!-- Splash Screen -->
    <v-parallax
      dark
      height="1000"
      src="https://images.unsplash.com/photo-1618438974496-015b1fb3e2d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1944&q=80"
    >
        <v-alert v-if="error" type='error'> {{ error }} </v-alert>
        <v-card class="pa-12 card-style">
            <v-form
                ref='form'
                v-model="valid">
                <!-- Email -->
                <v-text-field
                label="Email"
                    v-model="email"
                    :rules="emailRules"
                />
                <!-- Password -->
                <v-text-field
                    label="Password"
                    v-model="password"
                    :rules="passRules"
                    type="password"
                />
                <!-- Submit -->
                <v-btn
                    :disabled="!valid"
                    color="success"
                    @click="onSubmit"
                > 
                    Submit
                </v-btn>
            </v-form>
        </v-card>
    </v-parallax>
    </v-main>
    
</template>

<script>

    export default {
        data(){
            return {
                loading:false,
                valid:false,
                error:false,
                email:"",
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ],
                password:"",
                passRules:[
                    v => !!v || 'Password is required',
                    v => v.length > 8 || "Password must be 8 or more characters"
                ],
            }
        },
        methods:{
           async  onSubmit (){
                this.loading = true
                this.error = false;

                try{
        const response = await this.$auth.loginWith('local',{email:this.email,password:this.password})
                }

                catch(error) {
                    this.error = error
                    this.$refs.form.reset()
                }
        
                
        
            }
        }
    }
</script>

<style scoped>


    .card-style{
        max-width: "40px";
    }
</style>