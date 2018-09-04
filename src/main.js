// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import GSignInButton from 'vue-google-signin-button'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.config.productionTip = false

Vue.use(GSignInButton)
Vue.use(VueResource)
Vue.use(Vuex)

var gUser = null
const store = new Vuex.Store({
  state: {
    access_token: '',
    id_token: ''
  },
  mutations: {
    updateAccessToken (state, value) {
      state.access_token = value
    },
    updateIdToken (state, value) {
      state.id_token = value
    }
  }
})

Vue.mixin({
  data: function () {
    return {
      clearIdToken () {
        store.commit('updateIdToken', '')
      },
      clearAccessToken () {
        store.commit('updateAccessToken', '')
      },
      isTokenValid () {
        if (this.getParameterByName('expires_at') - 340 <= (Date.now() / 10).toFixed(0)) {
          gUser.getAuthResponse(true)
          this.setAccessToken()
          this.setIdToken()
        }
        var request = axios.get(process.env.URL_VALIDATETOKEN + store.state.id_token)
        return request.then(response => {
          return response.status === 200
        })
      },
      getParameterByName (name) {
        let match = gUser.getAuthResponse()[name]
        return match
      },
      getAndisUrl: process.env.URL_GETANDIS,
      logOut () {
        gUser.disconnect()
        this.clearIdToken()
        this.clearAccessToken()
        router.go('/')
      },
      setAccessToken () {
        var accessToken = this.getParameterByName('access_token')
        accessToken = accessToken === undefined ? gUser.Zi.access_token : accessToken
        store.commit('updateAccessToken', accessToken)
      },
      setIdToken () {
        var idToken = this.getParameterByName('id_token')
        store.commit('updateIdToken', idToken)
      },
      setUser (obj) {
        gUser = obj
      },
      userSessionIsValid () {
        if (gUser === null) {
          return false
        } else {
          return this.isTokenValid()
        }
      },
      validateUser (googleUser) {
        var isValid = googleUser.getBasicProfile().getEmail().split('@')[1] === process.env.VALID_DOMAIN && googleUser.getHostedDomain() === process.env.VALID_DOMAIN
        if (!isValid) {
          try {
            googleUser.disconnect()
          } catch (err) {
          }
        } else {
          this.setUser(googleUser)
          this.setAccessToken()
          this.setIdToken()
        }
        return isValid
      }
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data () {
    return {
      results: []
    }
  },
  methods: {
    getapiKey () {
      return process.env.APY_KEY
    },
    getclientID () {
      return process.env.CLIENT_ID
    },
    getclientSecret () {
      return process.env.CLIENT_SECRET
    }
  },
  mounted () {
  }
})
