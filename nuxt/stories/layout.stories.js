import layout from "../layouts/default.vue"


export default {
    title:"Layout"
}




const mock_auth = function () {

    this.title = "Mock"
    this.$data.title = "Mock2"
    /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
        to modify the $auth property 
    */
    Object.defineProperty(this,'$auth',{
        value: {loggedIn:true},
        writable:true
    })

    console.log(this.title)

}

export const notSignedIn = () => ({
    props: {
        storybookDataInject: {
            type: Function,
            default: mock_auth
        }
    },
    components: {'layout':layout},
    template:'<layout :storybookDatasInject=storybookDataInject />'
})


export const signedIn = () => ({
    props: {
        authMock: {
            type: Boolean,
            default: true
        }
    },
    components: {layout},
    template: '<layout :authMock="authMock" />'
})