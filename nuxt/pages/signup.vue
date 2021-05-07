<template>
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
        <v-col>
            <v-card class="pa-12" style="max-width:500px">
                        <v-alert v-if="error" type='error'> {{ error }} </v-alert>
                        <v-form
                            ref='form'
                            v-model="valid">
                            <!-- Email -->
                            <v-text-field
                            label="Enter your Email"
                                v-model="email"
                                :rules="emailRules"
                            />
                            <!-- Password -->
                            <v-text-field
                                label="Enter a password"
                                v-model="password1"
                                :rules="passRules1"
                                type="password"
                            />
                            <v-text-field
                                label="Please confirm password"
                                v-model="password2"
                                :rules="passRules2"
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
        </v-col>
    </v-row>
    </v-parallax>
    </v-main>
</template>

<script>
import {AuthenticationRequests} from "../services/ClientAPI"

    export default {
        auth:false,
        data(){
            return {
                loading:false,
                valid:false,
                error: false,
                email:"",
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ],
                password1:"",
                password2:"",
                passRules1:[
                    v => !!v || 'Password is required',
                    v => v.length > 7 || "Password must be 8 or more characters",
                ],
                   passRules2:[
                    v => !!v || 'Password is required',
                    v => v.length > 7 || "Password must be 8 or more characters",
                    v => v === this.password1 && v === this.password2 || "Passwords are not the same"
                ],
            }
        },
        methods:{
           async  onSubmit (){
                this.loading = true
                this.error = false
                try{

                    const response = await AuthenticationRequests.signup({email:this.email,password:this.password1})
                }
                catch(error) {
                    this.error = error
                    this.reset()
                }
       
            },
            reset() {
                this.password1 = ""
                this.password2 = ""
                this.email = ""
                this.$refs.form.resetValidation()
            }
        }
    }
</script>

<style scoped>

    .width {
        max-width: "500px";
    }


</style>