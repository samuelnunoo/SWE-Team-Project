import Editor from "../pages/Editor.vue"
import {createTest} from "./Helper"
import StarterKit from '@tiptap/starter-kit'


export default {
    title:"Editor Page"
}


export const NewEditor = () => createTest(Editor, function () {
    this.error =null 
    this.mounted = () => {
        this.test()
    }
    
})