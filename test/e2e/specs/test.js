// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Step one e2e test - Login page - fail path()': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.bannerLogo')
      .assert.elementPresent('header .g-signin-button')
      .assert.elementNotPresent('header .g-signin-button--logout')
      .assert.elementCount('.bannerLogo img', 1)
      .assert.elementPresent('main')
      .assert.elementNotPresent('main .clubview')
      .assert.elementPresent('#ssIFrame_google')
      .click('header .g-signin-button')
      .pause(2000)
      browser.windowHandles(function(result) {
         var handle = result.value[1]
         this.switchWindow(handle)
          .pause(2000)
          .assert.elementPresent('#identifierNext')
          // fake account created: tets Test12 : email: tets3673@gmail.com' pwd:t3st@acC0nt
          .setValue('input[type=email]', 'tets3673@gmail.com')
          .click('#identifierNext')
          .pause(2000)
          .setValue('input[type=password]', 't3st@acC0nt')
          .click('#passwordNext')
           browser.switchWindow(result.value[0])
      })
      .pause(2000)
      .assert.elementPresent('header .g-signin-button')
      .assert.elementNotPresent('header .g-signin-button--logout')
      .assert.elementPresent('main')
      .assert.elementNotPresent('main .clubview')
      .end()
  }
  /*,
  'Step two e2e test - Login page - happy path()': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.bannerLogo')
      .assert.elementPresent('header .g-signin-button')
      .assert.elementNotPresent('header .g-signin-button--logout')
      .assert.elementCount('.bannerLogo img', 1)
      .assert.elementPresent('main')
      .assert.elementNotPresent('main .clubview')
      .assert.elementPresent('#ssIFrame_google')
      .click('header .g-signin-button')
      .pause(2000)
      browser.windowHandles(function(result) {
         var handle = result.value[1]
         this.switchWindow(handle)
          .pause(1000)
          .assert.elementPresent('#identifierNext')
          // log in with test account
          .setValue('input[type=email]', 'test1@and.digital')
          .click('#identifierNext')
          .pause(1000)
          .setValue('input[type=password]', 't3st@acC0nt')
          .click('#passwordNext')
           browser.switchWindow(result.value[0])
      })
      .pause(5000)
      .assert.elementNotPresent('header .g-signin-button')
      .assert.elementPresent('header .g-signin-button--logout')
      .assert.elementPresent('main')
      .assert.elementPresent('main .clubview')
      .end()
  }
  */
}
