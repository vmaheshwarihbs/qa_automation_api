const fs = require('fs'),
      concat = require('concat-stream'),
      joiMachine = require('joi-machine')

var generator = joiMachine.obj()

generator.pipe(concat({encoding: 'string'}, console.log))

generator.write(require('./data.json'))
generator.end()
