<template>
  <div id="app" class="headerContainer">
    <header>
      <div class="bannerLogo">
        <img src="./assets/ANDigital_LOGO_LONG_RGB_ON_WHITE.png" alt="TeamBox - AND Digital PWA"/>
      </div>
      <g-signin-button
        :params="googleSignInParams"
        v-if="!isUserAuthenticated()"
        v-on:click="$emit('signIn', $event.target.click)"
        @name="vue-google-signin-button"
        @success="onSignInSuccess"
        @error="onSignInError">
        <span>{{ signIn }}</span>
      </g-signin-button>
      <div class="g-signin-button--logout"
        v-else
        @click="onLogOutSuccess"
        @error="onLogOutError">
        <span>{{ logOut }}</span>
      </div>
    </header>
    <main>
      <router-view v-if="isUserAuthenticated()" ></router-view>
    </main>
  </div>
</template>

<script>
import App from './App'

export default {
  name: 'app',
  props: ['app'],
  components: {
    App
  },
  data () {
    return {
      clientId: '',
      googleSignInParams: {
        client_id: this.clientId
      },
      isSignedIn: false,
      signIn: 'Sign in with AND',
      logOut: 'Log out'
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      if (!this.$root.validateUser(googleUser)) {
        this.$root.logOut()
      } else {
        this.isSignedIn = googleUser.isSignedIn()
      }
    },
    onSignInError (error) {
      // message to notify error in logging In
      console.log('OH SNAP!!', error)
    },
    onLogOutSuccess () {
      this.$parent._data.logOut()
    },
    onLogOutError (error) {
      // message to notify error in logging out
      console.log('OH SNAP!!', error)
    },
    isUserAuthenticated () {
      return this.isSignedIn && this.$parent._data.userSessionIsValid()
    },
    signOut () {
      this.$parent._data.logOut()
    }
  },
  created: function () {
    this.clientId = process.env.CLIENT_ID
    this.googleSignInParams.client_id = this.clientId
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
/* write SCSS here */
img {
  height: 30px;
}
</style>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 40px;
  padding: 0 16px 0 24px;
  color: #ffffff;
  border-bottom: 1px solid #35495E;
}

header div {
  display: inline-block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 2px;
}

.g-signin-button,
.g-signin-button--logout {
  font-size: 12px;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  float: right;
  margin-top: 8px;
}

.g-signin-button--logout{
  background-color: #3c82f7;
}

.bannerLogo {
  width: 100px;
  object-fit: cover;
}

.hidden{
  display: none;
}
</style>
