import EditorV from "../pages/Editor.vue"
import { shallowMount,mount,createLocalVue } from '@vue/test-utils'
import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/vue-2'
import mockAxios from "jest-mock-axios"
import vuetify from "vuetify"



let wrapper 

beforeEach(()=>{
  mockAxios.reset()
  const localVue = createLocalVue()
  localVue.use(vuetify)

  wrapper = shallowMount(EditorV, {
    localVue, mocks:{
      $route: {query: {id:'12345678'}}
    }
  });
})

describe('saveDocument', () => {
  // Handle Responses 
  it("Should error if editor is null", () => {
      
    wrapper.setData({editor:null})
      wrapper.vm.saveDocument()
      expect(wrapper.vm.$data.error).toBe("Editor is not instantialized")
  })

  it("Should send proper response to ClientAPI", () => {

    wrapper.setData({id:"12345678",editor: new Editor({extensions:[StarterKit]})})
    wrapper.vm.saveDocument()
    const data = {title:"New Document", type:"Document",content:wrapper.vm.$data.editor.getJSON()}
    expect(mockAxios.put).toHaveBeenCalledWith("http://localhost:8080/api/nodes/12345678",data,{"headers": {"Content-Type": "application/json"}})
  })

})


describe("loadDocument", () => {

  it('should not call API if id is invalid', () => {
    const wrapper2 = shallowMount(EditorV, {
      mocks: {
        $route: {query: {}}
      }
    })
    mockAxios.reset()
    wrapper2.vm.loadDocument()
    expect(mockAxios.get).not.toHaveBeenCalled()

 
  })

  it("should call API with correct id", () => {
    
    wrapper.vm.loadDocument()
    expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:8080/api/nodes/12345678?type=Document",
    {"headers": {}})
    
  })


})

describe("removeDocument",() => {
  it("should error for invalid id", () => {
    const w2 = shallowMount(EditorV, {
      mocks: {
        $route:{query:{}}
      }
    })

    w2.vm.removeDocument()
    expect(w2.vm.$data.error).toBe("Document has invalid id")
  })

  it("should call the client API with the correct parameters", () => {
     mockAxios.reset()
    wrapper.vm.removeDocument()
    expect(mockAxios.delete).toHaveBeenCalledWith("http://localhost:8080/api/nodes/12345678", {"headers": {}})


  })
})

