const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')
const usersRouter = require('./routes/users')
const fs = require('fs-extra')
const rfs = require('rotating-file-stream')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// set log
const logDirectory = path.join(__dirname, './log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
logger.token('custom_token', function getId(req) {
  const return_log =
    'first:' + req.body['first'] + '\t second:' + req.body['second']
  return return_log
})
// log rotate settings
const accessLogStream = rfs('access.log', {
  size: '10MB',
  interval: '1d',
  compress: 'gzip',
  path: logDirectory
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api', apiRouter)
app.use(logger('short', { stream: accessLogStream }))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
