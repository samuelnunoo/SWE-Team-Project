
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
  
        <v-btn icon>
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
            <v-list-item-subtitle v-text="doc.date"></v-list-item-subtitle>
          </v-list-item-content>
            <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">close-circle-outline</v-icon>
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
    auth:false,
    data() {
        return {
            error:false,
            docs: [ {id:1, title:"Hello World",date: new Date()}, {id:2,title:"Doc2", date: new Date()}]

        }
    },
    mounted() {
      
    },
    methods:{
        getDocs: async () => {
            try {
                 const nodes = await DocumentNodeRequests.get_all()
            }

            catch  (error) {
                this.error = error
            }
         

        },
        goToDoc: (doc) => {
            console.log(doc)
        }
    }
   
}
</script>