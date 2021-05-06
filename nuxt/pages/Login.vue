/*  eslint-disable */
<template>
    <v-main>
        <v-form
            v-model="valid">
            <!-- Email -->
            <v-text-field
                v-model="email"
                :rules="emailRules"
            />
            <!-- Password -->
            <v-text-field
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
    </v-main>
</template>

<script>

    export default {
        data(){
            return {
                loading:false,
                valid:false,
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
                const response = await this.$auth.login({email:this.email,password:this.password})
                console.log(response)
            }
        }
    }
</script>
