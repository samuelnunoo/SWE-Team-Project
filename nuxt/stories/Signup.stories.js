import SignUp from "../pages/signup.vue"
import {createTest} from "./Helper"


export default {
    title:"Sign Up"
}



export const validDetails = () => createTest(SignUp, function () {
    this.firstName = 'Jane'
    this.lastName = "Doe"
    this.email = 'janedoe@gmail.com'
    this.password1 = '12345678'
    this.password2 = '12345678'
})



export const missingName = () => createTest(SignUp,function () {
    this.email = 'janedoe@gmail.com'
    this.firstName = ''
    this.lastName = ""
    this.password1 = '12345678'
    this.password2 = '12345678'
    this.valid = true 


})

export const InvalidEmail = () => createTest(SignUp,function () {
    this.email = 'janedoe'
    this.firstName = 'Jane'
    this.lastName = "Doe"
    this.password1 = '12345678'
    this.password2 = '12345678'
    this.valid = true 
    console.log(this.$refs.form)

})

export const InvalidPasswordLength = () => createTest(SignUp,function () {
    this.email = 'janedoe@mail.com'
    this.firstName = 'Jane'
    this.lastName = "Doe"
    this.password1 = '1234567'
    this.password2 = '1234567'
    this.valid = true 
    console.log(this.$refs.form)

})

export const NotSamePassword = () => createTest(SignUp, function () {
    this.email = 'janedoe@mail.com'
    this.firstName = 'Jane'
    this.lastName = "Doe"
    this.password1 = '123456789'
    this.password2 = '123456798'
    this.valid = true 
})

export const EmailInUse = () => createTest(SignUp, function () {
    this.error = "This email is already in use"
})


