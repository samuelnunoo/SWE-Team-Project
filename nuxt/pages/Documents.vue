
<template>
    <v-main>
       <v-alert v-if="error" type="error"> {{ error }} </v-alert>
        <v-toolbar
        color="light-blue"
        dark
      >
      
        <v-toolbar-title>Documents</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <v-btn icon
          @click="createDoc">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list
        subheader
        two-line
      >
        <v-subheader inset>Documents</v-subheader>
 
        <v-list-item
          v-for="doc in docs"
          :key="doc.id"
          @click="goToDoc(doc)"
        >
         
          <v-list-item-avatar>
            <v-icon
              dark
            ></v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="doc.title"></v-list-item-title>
            <v-list-item-subtitle v-text="doc.createdOn"></v-list-item-subtitle>
          </v-list-item-content>
            <v-list-item-action>
            <v-btn  @click.prevent="removeDoc(doc)" icon>
              <v-icon color="grey lighten-1">mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-list-item-action>
  
      
        </v-list-item>
      </v-list>


        <!-- Title  Creation Date -->

        <!-- Create New Document -->

    </v-main>
    
</template>

<script>
import { DocumentNodeRequests } from '../services/ClientAPI';
export default {
    auth:true,
    props: {
      setup:{
        type:Function,
        default:null
      }
    },
    data() {
        return {
            error:false,
            docs: []

        }
    },
    mounted() {
      this.getDocs()
      
    },
    methods:{
        getDocs: async function () {

          try {
                 const nodes = await DocumentNodeRequests.get_all()
                 this.docs = nodes.data
            }

            catch  (error) {
                this.error = error
            }
         

        },
        removeDoc: function (doc) {
          console.log('remove' + doc)
         
        },
        goToDoc: function (doc)  {
          this.$router.push(`/editor?id=${doc._id}`)
        },

        createDoc: async function () {
          try {
          const doc = await DocumentNodeRequests.create()
          this.$router.push(`/editor?id=${doc.data._id}`)
          }
          catch(err) {
                console.log(err)
          }

      
        } 
    }
   
}
</script>