import axios from "axios"

interface formData {
    email:string;
    password:string
}

export class AuthenticationRequests {
    static signup = async (data:formData) => {
        return await axios.post('/api/auth/signup',data)
    }

    static login = async (data:formData) => {
        return await axios.post('/api/auth/login',data)
    }

    static logout = () => {
        //@todo implement
    }
}

export class DocumentNodeRequests {
    //@todo implement node interface
    static create = () => {
    }

    static update = () => {
    }

    static get = async (id:string) => {
        return await axios.get(`/api/nodes/${id}`)
    }

    static remove = async (id:string) => {
        return await axios.delete(`/api/nodes/${id}`)
    }
}

