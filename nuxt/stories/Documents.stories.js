import Documents from "../pages/Documents.vue"
import {createTest} from "./Helper"


export default {
    title:" Documents"
}


export const Empty = () => createTest(Documents, function () {
    this.getDocs = () => true 
}
)

export const OneDocument = () => createTest(Documents, function () {
    this.getDocs =  () => true 
    this.docs = [{title:"Example", createdOn:"2021-02-05 Tuesday"}]
})

export const ManyDocs = () => createTest(Documents, function () {
    this.getDocs = () => true 
    const array = []

    for (let i = 0; i < 50; i++) {
        array.push({createdOn:"2021-02-05 Tuesday", title:"Example"})
    }
    this.docs = array
    
})