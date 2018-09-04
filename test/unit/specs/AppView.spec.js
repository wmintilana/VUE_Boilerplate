import Vue from 'vue'
import Appview from '@/App.vue'
import Vuex from 'vuex'
import sinon from 'sinon'
import { shallowMount } from '@vue/test-utils'
import 'es6-promise/auto'
import 'babel-polyfill'

Vue.use(Vuex)
describe('Home screen', () => {
  const Constructor = Vue.extend(Appview)
  const vm = new Constructor().$mount()
  afterEach(() => {
    // Destroy the mounted component
    vm.$destroy()
  })

  it('expected banner item contents: logo is present', async () => {
    expect(vm.$el.querySelectorAll('.bannerLogo').length).to.equal(1)
  })

  it('expected banner item contents: contains a header section', async () => {
    expect(vm.$el.querySelectorAll('header').length).to.equal(1)
  })

  it('expected banner item contents: sign button', async () => {
    expect(vm.$el.querySelectorAll('g-signin-button').length).to.equal(1)
  })

  it('expected banner item contents: logout button is not displayed', async () => {
    expect(vm.$el.querySelectorAll('.g-signin-button--logout').length).to.equal(0)
  })

  it('expected layout contents: body main section is available', async () => {
    expect(vm.$el.querySelectorAll('main').length).to.equal(1)
  })

  it('should render correct styling: header background is correct', () => {
    expect(vm.$el.querySelectorAll('.headerContainer').bgColor).to.equal(undefined)
  })

  it('Login button emits "signIn" event on click', () => {
    // given
    const wrapper = shallowMount(Appview)
    const spy = sinon.spy()
    wrapper.setMethods({
      $emit: spy
    })

    // when
    wrapper.find('g-signin-button').trigger('click')

    // then
    expect(spy.called).to.equal(true)
    expect(spy.args[0][0]).to.equal('signIn')
  })

  it('On user authenticated, logout button visible', () => {
    // given
    const wrapper = shallowMount(Appview)
    const isUserAuthenticatedStub = sinon.stub(wrapper.vm, 'isUserAuthenticated').returns(true)

    // when
    wrapper.find('g-signin-button').trigger('click')
    const result = wrapper.vm.isUserAuthenticated()
    wrapper.vm.isSignedIn = true

    // then
    expect(result).to.equal(true)
    expect(wrapper.vm.$el.querySelectorAll('g-signin-button').length).to.equal(0)
    expect(wrapper.vm.$el.querySelectorAll('.g-signin-button--logout').length).to.equal(1)

    isUserAuthenticatedStub.restore()
  })
})
