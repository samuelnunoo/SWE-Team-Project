import EditorV from "../pages/Editor.vue"
import { mount } from '@vue/test-utils'
import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/vue-2'

describe('Editor.vue', () => {
    it('can recognize default text', () => {
      //@todo 

     const editor =  new Editor({content:'<p>Hello </p>',extensions: [StarterKit]})

     expect(editor.getHTML()).toBe("<p>Hello </p>")
    })
  })
