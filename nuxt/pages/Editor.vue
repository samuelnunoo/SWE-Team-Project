<template>
<v-main>

<client-only>
  <v-alert v-if="alert" color='green'> Save Successful </v-alert>
  <v-alert v-if='error'> {{error}} </v-alert>
    <v-toolbar>
        <!-- @todo add padding --> 
            <v-text-field v-model="title"/>  
            <v-spacer/>
            <v-btn 
            color='blue'
            @click="saveDocument"> Save </v-btn>

            <v-dialog
              v-model="dialog" 
              persistent
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  text 
                  v-bind="attrs"
                  v-on="on"
                >
                  Delete
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  Remove Document?
                </v-card-title>
                <v-card-text> You can not undo this action</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
        
                  <v-btn
                    color="red"
                    text
                    @click="removeDocument"
                  >
                    Agree
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                  >
                    Disagree
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
    </v-toolbar>
    </v-row>
  <editor-content :editor="editor" />
</client-only>

</v-main>

</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import {DocumentNodeRequests} from "../services/ClientAPI"

export default {
  auth:true,
  components: {
   "editor-content": EditorContent,
  },

  data() {
    return {
        title:"New Document",
        dialog:false,
        alert:false,
        content: '<p> um ok </p>',
        id: "",
        error:false,
        editor: null,
    }
  },

   methods: {
    async saveDocument() {
        // get JSON from editor instance
      if (this.editor) {
        const editorJSON = this.editor.getJSON()
        try {
              const response =  await DocumentNodeRequests.update(this.id, {content:editorJSON,title:this.title,type:"Document"})
              this.alert = true 
              setTimeout(() => console.log("Saved"),1000)
              this.alert = false 

        }

        catch(err) {
          this.error = err 
        }
       

      }
    },
    
    async loadDocument() {
      //to get id 
      if (this.$route.query && this.$route.query.id) {
        const id = this.$route.query.id
        this.id = id

        try {

        const doc = await DocumentNodeRequests.get(id)
        if (doc.data.title) this.title = doc.data.title
        if (doc.data.content){
          console.log(this.content)
            this.content = doc.data.content
        } 
      
        }
        catch (err) {
          this.error = err  
      }

      this.editor = new Editor({
      content:this.content,
      extensions: [StarterKit,Heading]
    })

      }
      // to make sue you can't use it if you dont load a document
      else {
        this.$router.push("/documents")
      }

    },

    async removeDocument() {

        //Check if valid id

          if (this.id !== "") {
              //try to remove

            try {
            console.log(this.id,"This Testing")
            const doc = await DocumentNodeRequests.remove(this.id)
            this.dialog = false 
            this.$router.push("/documents")
          
            } 
            
          
            catch (err) {
              this.error = err  
          }


          }

          else {
            this.error = "Document has invalid id"
          }
    }
   },

  mounted() {

    this.loadDocument()
    
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>