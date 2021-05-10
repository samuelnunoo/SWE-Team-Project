import axios from "axios"
//@note Review 

const SERVER_URL = "http://localhost:8080"

interface nodeObj {
    title:string,
    type:string,
    content:Object
}

/* 
    This method gets the auth token and removes Bearer to be compatible with the REST API

*/
export const AuthHeader = () => {
    const token =  localStorage.getItem("auth._token.local")?.split("Bearer ")[1]
    return token ? {token} : {}

}



export class AuthenticationRequests {

    /*
        Loging and Logout were depreciated from the AuthRequests model and
        is now handled by the nuxt auth model 
    */

    static signup = async (data:any) => {
        return await axios.post(SERVER_URL + '/api/auth/signup',data)
        .catch(error => {
            console.log(error)
        })
    }

  

}

export class DocumentNodeRequests {

    /* 

        This method creates a new document and returns it 

    */

    static create = async () => {
        return await axios.post(SERVER_URL + "/api/nodes",{title:"New Document", type:"Document"}, {headers: {  'Content-Type': 'application/json',...AuthHeader()}})
    }


    /*

        This method updates the specified document 

    */

    static update = async (id:string,data:nodeObj) => {
        return await axios.put(SERVER_URL  + `/api/nodes/${id}`, data, {headers: { 'Content-Type': 'application/json', ...AuthHeader() } })

    }

    /*

        This method gets a specified document (id)

    */

    static get = async (id:string) => {
        return await axios.get(SERVER_URL + `/api/nodes/${id}?type=Document`, {headers: AuthHeader()})
    }


    /*
        This method returns all docs owned by a user

    */
    static get_all = async () => {
        return await axios.get(SERVER_URL + `/api/nodes`, {headers: AuthHeader()})
    }

    /*
        This method removes a specified document 

    */
    static remove = async (id:string) => {
        return await axios.delete(SERVER_URL + `/api/nodes/${id}`,{headers: AuthHeader()})
    }
}

