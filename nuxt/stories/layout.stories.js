import layout from "../layouts/default.vue"


export default {
    title:"Layout"
}



export const notSignedIn = () => ({
    props: {
        authMock: {
            type: Boolean,
            default: false
        }
    },
    components: {'layout':layout},
    template:'<layout :authMock="authMock"/>'
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