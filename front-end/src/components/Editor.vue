<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import { defaultExtensions } from '@tiptap/starter-kit'


export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      documentID: null
    }
  },

  methods: {
    saveDocument() {
      // get JSON from editor instance
      if (this.editor) {
        const editorJSON = this.editor.getJSON()
        // @todo replace placeholder
        ClientAPI.update(documentID, editorJSON)
      }
    },
    
    loadDocument() {

    }

  },

  mounted() {
    this.editor = new Editor({
      content: '<p>Hello</p>',   // @todo have it load in content from document
      extensions: defaultExtensions(),
      documentID: this.$route.query.documentID
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  
}
</script>