'use strict'

const code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script({ output: process.stdout })
const build = require('../')

lab.experiment('Hello', () => {
  let server

  lab.beforeEach((done) => {
    build({ port: 8989 }, (err, s) => {
      server = s
      done(err)
    })
  })

  lab.test.skip('Testing for "Hello World"', (done) => {
    const options = { method: 'GET', url: '/' }
    server.inject(options, function (response) {
      const result = response.result
      code.expect(result).to.equal('Hello World')
      done()
    })
  })

  lab.test('Should add point', (done) => {
    var expected = {
      timestamp: new Date(),
      value: 1.0
    }
    const options = { method: 'POST', url: '/add', payload: JSON.stringify(expected) }
    server.inject(options, function (response) {
      const result = response.result
      code.expect(result).to.equal('done')
      done()
    })
  })
})
