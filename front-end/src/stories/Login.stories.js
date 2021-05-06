import Login from "../views/Login.vue"

export default {
    title:"Login"
}

export const Default = () => ({
    components: {"login":Login},
    template: "<login/>"
})