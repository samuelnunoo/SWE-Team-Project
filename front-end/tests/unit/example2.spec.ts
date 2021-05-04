import App from "@/App.vue"
import { shallowMount } from '@vue/test-utils'

describe("Test", ()+> {

    it("Can get editor content", () => {
        const w = shallowMount(App,{
            
        })
        expect(w.text()).toEqual("Hello orld")
    })
})