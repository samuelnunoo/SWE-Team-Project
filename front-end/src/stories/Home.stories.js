import Home from "../views/Home.vue"


export default {
    title:"Home"
}


export const Default = () => ({
    components: {"home":Home},
    template: "<home/>"
})