import axios from "axios"
//@note Review 

const TEST_URL = "http://localhost:8080"

const AuthHeader = () => {
    const token =  localStorage.getItem("auth._token.local")?.split("Bearer ")[1]
    return token ? {token} : {}

}

interface nodeObj {
    title:string,
    type:string,
    content:Object
}

export class AuthenticationRequests {

    /*
        Loging and Logout were depreciated from the AuthRequests model and
        is now handled by the nuxt auth model 
    */

    static signup = async (data:any) => {
        return await axios.post(TEST_URL + '/api/auth/signup',data)
    }

  

}

export class DocumentNodeRequests {

    /* 

        This method creates a new document and returns it 

    */

    static create = async () => {
        return await axios.post(TEST_URL + "/api/nodes",{title:"New Document", type:"Document"}, {headers: {  'Content-Type': 'application/json',...AuthHeader()}})
    }


    /*

        This method updates the specified document 

    */

    static update = async (id:string,data:nodeObj) => {
        return await axios.put(TEST_URL  + `/api/nodes/${id}`, data, {headers: { 'Content-Type': 'application/json', ...AuthHeader() } })

    }

    /*

        This method gets a specified document (id)

    */

    static get = async (id:string) => {
        return await axios.get(TEST_URL + `/api/nodes/${id}`, {headers: AuthHeader()})
    }


    /*
        This method returns all docs owned by a user

    */
    static get_all = async () => {
        return await axios.get(TEST_URL + `/api/nodes`, {headers: AuthHeader()})
    }

    /*
        This method removes a specified document 

    */
    static remove = async (id:string) => {
        return await axios.delete(TEST_URL + `/api/nodes/${id}`,{headers: AuthHeader()})
    }
}

