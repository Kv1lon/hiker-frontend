import {createStore} from 'vuex'
import axios from 'axios'
import { useToast } from 'vue-toastification'


export default createStore({
state:{
    backendUrl:"http://0.0.0.0:8000/",
    status: '',
    access: localStorage.getItem('access') || '',
    refresh: localStorage.getItem('refresh') || '',
    cuser:JSON.parse(localStorage.getItem('cuser')) || {},
    tickets_arr:JSON.parse(localStorage.getItem('tickets_arr')) || [],
    ticket:JSON.parse(localStorage.getItem('ticket')) || [],

},
mutations: {
  auth_request(state){
    state.status = 'loading'
  },
  auth_success(state, access, refresh){
    state.status = 'success'
    state.access = access
          state.refresh = refresh

  },
  auth_error(state){
    state.status = 'error'
  },
  logout(state){
    state.status = ''
    state.access = ''
      state.refresh = ''
      state.cuser = {}

  },
set_user(state,cuser){
        state.cuser = cuser
      },
    tickets_arr(state,data){
    state.tickets_arr = data
    },
    ticket(state,data){
    state.ticket = data
    }
},
    actions:{
    tickets_arr({commit},data){
            commit('tickets_arr',data.data)
localStorage.setItem('tickets_arr', JSON.stringify(data.data)    )
    },
    ticket({commit},data){
            commit('ticket',data.data)
localStorage.setItem('ticket', JSON.stringify(data.data)    )
    },
        login({commit}, user){return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({url: this.state.backendUrl+'auth/jwt/create', data: user, method: 'POST' })
      .then(resp => {
        const access = resp.data.access
          const refresh =resp.data.refresh

        localStorage.setItem('access', access)
                  localStorage.setItem('refresh', refresh)
        commit('auth_success', access,refresh)
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('access')
                  localStorage.removeItem('refresh')
                  localStorage.removeItem('cuser')
        reject(err)
      })
    })},
        set_user({commit},token){
              return new Promise((resolve, reject) => {
                axios({url: this.state.backendUrl+`auth/users/me/`, method: 'GET', headers: {
                            'Content-type': 'application/json',
                            'Authorization':`JWT ${token}`
					}
						,}).then(response => {
                    const cuser = response.data
                    localStorage.setItem('cuser', JSON.stringify(cuser))
                            commit('set_user', cuser)
                    resolve(response)
                })
    .catch(err => {
      commit('auth_error', err)
      reject(err)
  })
 })},
 register({commit}, user){
  return new Promise((resolve, reject) => {
    commit('auth_request')
    axios({url: this.state.backendUrl+'auth/users/', data: user, method: 'POST' })
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      commit('auth_error', err)
      reject(err)
    })
  })
 },
     logout({commit}){
  return new Promise((resolve, reject) => {
    commit('logout')
    localStorage.removeItem('access')
          localStorage.removeItem('refresh')
      localStorage.removeItem('cuser')
    resolve()
  })
 },
        refresh({commit},user){
    return new Promise((resolve, reject) => {
        console.log("refresh!!!"+this.state.cuser.username)
      commit('auth_request')
      axios({url: this.state.backendUrl+'auth/jwt/refresh/', data: user, method: 'POST' })
      .then(resp => {
        const access = resp.data.access
          const refresh =resp.data.refresh


        localStorage.setItem('access', access)
                  localStorage.setItem('refresh', refresh)
        commit('auth_success', access,refresh)
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('access')
                  localStorage.removeItem('refresh')
                  localStorage.removeItem('cuser')
        reject(err)
      })
    })},
},
modules:{},
getters:{
    getServerUrl:state=>{
    return state.backendUrl
    },
  isLoggedIn: state => !!state.access,
  authStatus: state => state.status,
}
})

