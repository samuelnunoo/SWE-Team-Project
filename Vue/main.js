const Vue = require("vue")
const VueRouter = require("vue-router")
const App = require("./test.vue")
const routes = require("./routes")


Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    routes
}).$mount("#app")
