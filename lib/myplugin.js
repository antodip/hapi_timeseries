'use strict'

var timeService = require('@antodip/timeseries')
var memdb = require('memdb')
var Joi = require('joi')

module.exports.register = function (server, options, next) {
  var service = timeService(memdb())

  server.route({
    method: 'POST',
    path: '/add',
    config: {
      validate: {
        payload: Joi.object().keys({
          timestamp: Joi.date().required(),
          value: Joi.number().required()
        })
      }
    },
    handler: function addPoint (request, reply) {
      console.log(request.payload)
      service.add(request.payload, function (err) {
        if (err) return reply(err)
        reply('done')
      })
    }
  })

  server.route({
    method: 'GET',
    path: '/get',
    config: {
      validate: {
        query: Joi.object().keys({
          start: Joi.date().required(),
          end: Joi.date().required()
        })
      }
    },
    handler: function getPoint (request, reply) {
      var start = request.query.start
      var end = request.query.end

      console.log(start)
      console.log(end)

      service.points(start, end, function (err, res) {
        if (err) return reply(err)

        reply(JSON.stringify(res))
      })
    }
  })

  next()
}

module.exports.register.attributes = {
  name: 'myplugin',
  version: '0.0.1'
}
