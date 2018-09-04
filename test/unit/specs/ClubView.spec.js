import Vue from 'vue'
import Clubview from '@/components/Club.vue'
import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

describe('ClubView', () => {
  it('should render correct contents: talent dashboard title', () => {
    const Constructor = Vue.extend(Clubview)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.talentdashboard h2').textContent)
      .to.equal('List of club ANDis')
    expect(vm.$el.querySelector('.talentdashboard h2').length).to.equal(undefined)
  })
})

describe('ClubView', () => {
  const mockResponse = {
    data: [
      {
        'id': 0,
        'name': 'paul',
        'email': 'paul@and.digital',
        'skills': [
          {
            'name': 'java',
            'level': 1,
            'interest': 4
          },
          {
            'name': 'react',
            'level': 2,
            'interest': 3
          }
        ]
      }]
  }

  var sandbox = sinon.sandbox.create()
  const mockAxios = {
    get: sandbox.stub()
      .withArgs(process.env.URL_GETANDIS)
      .returns(Promise.resolve(mockResponse))
  }

  beforeEach(() => {
    Clubview.__Rewire__('axios', mockAxios)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('club ANDis list returned by the request is rendered', async () => {
    const wrapper = shallowMount(Clubview, {
      mocks: {
        $http: mockAxios
      }
    })

    setImmediate(() => {
      expect(wrapper.vm.$el.querySelectorAll('.member').length).to.be.equal(mockResponse.data.length)
    })
  })
})
