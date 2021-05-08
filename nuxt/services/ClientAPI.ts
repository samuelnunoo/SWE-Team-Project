import axios from "axios"


const TEST_URL = "http://localhost:8080"

const AuthHeader = () => {
    const storedUser =  localStorage.getItem("user")
    let user = JSON.parse(storedUser ? storedUser: "")
    if (user && user.accessToken) {
        return {Authorization: "Bearer " +  user.accessToken}
    }
    return {}
}

export class AuthenticationRequests {
    static signup = async (data:any) => {
        return await axios.post(TEST_URL + '/api/auth/signup',data).then(response => {   
        })
    }

    static login = async (data:any) => {
         return await axios.post(TEST_URL + '/api/auth/login',data).then(response => {
             if (response.data.accessToken) {
                 localStorage.setItem("user",JSON.stringify(response.data))
             }

          //  store.commit('auth')
             return response.data
         })
    }
    //@todo switch to use auth 
    static logout = () => {
        localStorage.removeItem("user")
      //  store.commit('logout')
    }
}

export class DocumentNodeRequests {
    //@todo implement node interface
    static create = () => {
    }

    //@todo finish this 
    static update = () => {
    }

    static get = async (id:string) => {
        return await axios.get(TEST_URL + `/api/nodes/${id}`, {headers: AuthHeader()})
    }

    static get_all = async () => {
        return await axios.get(TEST_URL + `/api/nodes/all`, {headers: AuthHeader()})
    }

    static remove = async (id:string) => {
        return await axios.delete(TEST_URL + `/api/nodes/${id}`,{headers: AuthHeader()})
    }
}

