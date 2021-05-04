import {  mount } from '@vue/test-utils'
import Editor from "@/components/Editor.vue"

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(Editor)
    expect(wrapper.text()).toMatch("123")
  })
})
