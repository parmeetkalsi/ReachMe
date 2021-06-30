let socket = io()

$('#navbar').load('/components/navbar.html')
$('#footer').load('/components/footer.html')
$('#loginBox').show()
$('#chatBox').hide()

function loadusers() {
  $.get('/api/users/', (users) => {
    for(u of users){
      $('#usersav').append($('<a href="#">').text(
        ` || ${u.username} || `
      ))
    }
  })
}

loadusers()

function setup() {
  var myCanvas = createCanvas(1000, 800);
    myCanvas.parent("canvasbx");
  //createCanvas(1000, 400);
  background(32);
  $('#defaultCanvas0').hide()

  socket.connect('http://localhost:8383');

  socket.on('mouse',
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      fill(0,0,255);
      noStroke();
      ellipse(data.x, data.y, 10, 10);
    }
  );
}

function draw() {
}

function mouseDragged() {
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,10,10);
  sendmouse(mouseX,mouseY);
}

function sendmouse(xpos, ypos) {
  console.log("sendmouse: " + xpos + " " + ypos);
  var data = {
    x: xpos,
    y: ypos
  };

  socket.emit('mouse',data);
}

$('#btnStart').click(() => {
  $('#defaultCanvas0').show()
    if(window.localStorage.user){
        user = JSON.parse(window.localStorage.user)
        socket.emit('login', {
          username: user
          })
        console.log(user.username)
    }
})

socket.on('logged_in', () => {
  console.log("=======================================loggedin========================================")
  $('#loginBox').hide()
  $('#chatBox').show()
})

socket.on('login_failed', () => {
  window.alert('LOGIN TO YOUR ACCOUNT OR SIGNUP TO ENTER CHAT ROOM')
})

$('#btnSendMsg').click(() => {
  socket.emit('msg_send', {
    to: $('#inpToUser').val(),
    msg: $('#inpNewMsg').val()
  })
})

socket.on('msg_rcvd', (data) => {
  $('#ulMsgs').append($('<li>').text(
    `[${data.from}] : ${data.msg}`
  ))
})