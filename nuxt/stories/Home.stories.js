import Home from "../pages/index.vue"
import {createTest} from "./Helper"



export default {
    title: "Home Page"
}


export const Default = () => createTest(Home,() => true)