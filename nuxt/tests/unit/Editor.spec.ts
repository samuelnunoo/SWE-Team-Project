import EditorV from "@/components/Editor.vue"
import { mount } from '@vue/test-utils'
import { Editor } from '@tiptap/vue-2'

describe('Editor.vue', () => {
    it('can recognize default text', () => {
      const wrapper = mount(EditorV)
    
      expect(wrapper.vm.$data.editor.getHTML()).toBe('<p>Hello</p>')
    })
  })