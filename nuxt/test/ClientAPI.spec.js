import {DocumentNodeRequests,AuthenticationRequests,AuthHeader} from "../services/ClientAPI"
import mockAxios from "jest-mock-axios"

/*

    Test Plan has been modified to take into account
    migration to a new library nuxt and to take into account
    the fact that original tests were duplicates of Serve API.
    These tests test the structure of requests sent to the server.

    Login and Logout tests remove as they are now handled by nuxt library


*/

afterEach( () => {
   mockAxios.reset()
   localStorage.removeItem("auth._token.local")
})

describe("SignUp Method", () => {

 
    it("should be able to send a POST request to the prope URL and data", () => {
        const data ={
            email:'test@mail.com',password:'12345678',
            firstName:'Sam',lastName:"Nunoo"
        }
        const response = AuthenticationRequests.signup(data)
        expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:8080/api/auth/signup', data)
        
    })


})

describe("DocumentNodeRequests", () => {

    it("create: should be able to send a POST request to the proper URL for the create method", () => {
        
            DocumentNodeRequests.create()
            expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:8080/api/nodes",{"title": "New Document", "type": "Document"}, {"headers": {"Content-Type": "application/json"}})



    })

    it("update: should be able to send a PUT rrequest to the proper URL for the update method", () => {
        const id = '12345678'
        const data = {}
        DocumentNodeRequests.update(id,data)
        expect(mockAxios.put).toHaveBeenCalledWith("http://localhost:8080/api/nodes/12345678",data,{"headers": {"Content-Type": "application/json"}})
    })

    it("get: should be able to send a GET request to the proper URL with proper data structure", () => {
        const id = '12345678'

        DocumentNodeRequests.get(id)

        expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:8080/api/nodes/12345678?type=Document",{"headers": {}})
    })

    it("get_all: should be able to send a GET request to the proper URL with the proper structure", () => {
        DocumentNodeRequests.get_all()
        expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:8080/api/nodes",{headers: {}})
    })

    it("remove: should be able to send a DELETE request to the proper URL wwith the prope sturcture", () => {
        const id = '12345678'
        DocumentNodeRequests.remove(id)
        expect(mockAxios.delete).toHaveBeenCalledWith("http://localhost:8080/api/nodes/12345678", {headers:{}})
    })
})

describe("AuthHeader",() => {

    it("should return { } for no token", () => {
        const data = AuthHeader()
        expect(data).toEqual({})
    })

    it("should return token in proper format", () => {
        const token = "Bearer 1234567890"
        localStorage.setItem("auth._token.local",token)
        const data = AuthHeader()
        expect(data).toEqual({"token":"1234567890"})

    })

})