const http = require('http')
const express = require('express')

const fs = require('fs').promises

/* ===============================================================uploading part============================================== */

const multer  =   require('multer');

const upload =  multer({ dest: 'uploads/'})
 

/* =======================================================================uploading part end========================================== */
const PORT = process.env.PORT || 4444

const { db } = require('./db/models')
const { usersRoute } = require('./routes/users')
const { postsRoute } = require('./routes/posts/index')
const { commentsRoute } = require('./routes/posts/comments')

const app = express()
const socketio = require('socket.io')

let users = {}
let socketMap = {}

const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/api/comments', commentsRoute)

io.on('connection', (socket) => {
  console.log('connected with socket id =', socket.id)

  function login(s, u) {
    s.join(u)
    s.emit('logged_in')
    socketMap[s.id] = u
    console.log(socketMap)
  }

  socket.on('login', (data) => {
    u1 = data.username
    console.log('====================================='+u1.username+'================================')
    login(socket, u1.username)
})

socket.on('msg_send', (data) => {
data.from = socketMap[socket.id]
if (data.to) {
  io.to(data.to).emit('msg_rcvd', data)
} else {
  io.emit('msg_rcvd', data)
}
})

  socket.on('mouse',
      function(data) {
        console.log("Received: 'mouse' " + data.x + " " + data.y);
      
        socket.broadcast.emit('mouse', data);
      }
    );

  
})

app.use('/', express.static(__dirname + '/public'))

app.post('/upload', upload.single('avatar'), async (req, res) => {

  console.log('req.body', req.body)
  console.log('req.file', req.file)

  const oldPath = __dirname + '/uploads/' + req.file.filename
  const newPath = __dirname + '/public/images/' + req.file.originalname

  await fs.rename(oldPath, newPath) 

  //res.send('upload done')
  res.location('/')
})


db.sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`started on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error(new Error('Could not start database'))
    console.error(err)
  })