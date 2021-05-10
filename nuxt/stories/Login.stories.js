import Login from "../pages/Login.vue"
import {createTest} from "./Helper"

export default {
    title: "Login"
}


export const Default = () => createTest(Login,() => console.log('ok'))



export const ValidDetails = () => createTest(Login, function () {
    this.email = 'test@mail.com'
    this.password = '12345678'
}
)

export const InvalidUser = () => createTest(Login,function () {
    this.error = "This user does not exist"
})


