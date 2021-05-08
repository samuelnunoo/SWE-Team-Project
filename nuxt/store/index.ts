
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    isAuthenticated: false

})
export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  auth: (state) => {
    const storedUser = localStorage.getItem('user')
    const user = JSON.parse(storedUser || '')
    if (user && user.accessToken) state.isAuthenticated = true
    else state.isAuthenticated = false
  },
  logout: (state) => {
    state.isAuthenticated = false
  }
}

