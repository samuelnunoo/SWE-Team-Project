import Login from "../pages/Login.vue"


export default {
    title: "Login"
}


export const Default = () => ({
    components: { "login":Login},
    template: '<login/>'
})