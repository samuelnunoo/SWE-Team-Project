import Vue from "vue"

/*
    Hooks won't affect each other:
    https://vuejs.org/v2/guide/mixins.html

    Hook functions with the same name are merged into an array so that all of them will be called. 
    Mixin hooks will be called before the component’s own hooks.

*/


Vue.mixin({
    props: {
        storybookDataInject: {
            type: Function,
            default: null
        }
    },
    beforeMount() {
        console.log("I am Running:Storybook")
        if (this.storybookDataInject) {
            this.storybookDataInject()
    }
}
})