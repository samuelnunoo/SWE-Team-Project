import appBar from "../components/AppBar.vue"
import {createTest} from "./Helper"


export default {
    title:"App Bar"
}


export const notSignedIn = () => createTest(appBar, function () {

    this.title = "Type.io "
    /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
        to modify the $auth property 
    */
    Object.defineProperty(this,'auth',{
        value: {loggedIn:false},
        writable:true
    })

})


export const signedIn = () => createTest(appBar, function () {

    this.title = "Type.io"
    /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
        to modify the $auth property 
    */
    Object.defineProperty(this,'auth',{
        value: {loggedIn:true},
        writable:true
    })

    console.log(this.$auth.loggedIn)

 

})