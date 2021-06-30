const { Router } = require('express')
const { 
  createAnonUser,
  getUserById,
  getUserByUsername,
  updatestatus,
  checkcurrentpassword,
  updatepassword,
  updateemail,
  showuserallusers,
  newuser,
  login,
  follow,
  createmap,
  checkmap,
  updateusername
} = require('../../controllers/users')

const route = Router()

route.get('/:q', async (req, res) => {
  let query = req.params.q;
  let user;
  console.log(query)

  if (isNaN(parseInt(query))) {
    // when param is username
    user = await getUserByUsername(query)
  } else {
    // when param is user id
    user = await getUserById(query)
  }

  res.send(user)

  /* if (user) {
    res.status(200).send(user)
  } else {
    res.status(404).send({
      error: 'No such user id or username'
    })
  } */
})

route.post('/', async (req, res) => {
  /* const user = await createAnonUser()
  res.status(201).send(user) */
  let user = await getUserByUsername(req.body.username);
  if(user)
  {
    res.send(null);
  }
  else{
    user = await newuser(req.body.username,req.body.password,req.body.email);
    console.log("user created");
    res.send({
      id: user.id,
      username: user.username
    });
  }
})

route.get('/', async (req,res) => {
  let user = await showuserallusers();
  res.send(user);
})

route.post('/login', async (req,res) => {
  user = await login(req.body.username,req.body.password);
  if(user){
    res.send({
      id: user.id,
      username: user.username
    });

  }
  else{
    res.send(null);
  }
})

route.get('/follow/:currentuser/:userid', async(req,res) => {
  let map = await checkmap(req.params.currentuser,req.params.userid);
  if(map.length==0){
    res.send("follow");
  }else{
    res.send("followed");
  }
})

route.post('/follow', async(req,res) => {
  let data = await follow(req.body.currentuser,req.body.userid);
  res.send(data);
})

route.post('/edit/username', async(req,res) => {
  let user = await getUserByUsername(req.body.newusername);
  if(user){
    res.send(null)
  }
  {
    let user = await updateusername(req.body.newusername,req.body.id);
    if(user){res.send({
      id: user.id,
      username: user.username
    })
    };
  }
})

route.post('/edit/mail', async(req,res) => {
  await updateemail(req.body.newemail,req.body.id);
  res.send("done");
})

route.post('/edit/password', async(req,res) => {
  await updatepassword(req.body.newpassword,req.body.id);
  res.send("done")
})

route.post('/checkcurrentpassword', async(req,res) => {
  let user = await checkcurrentpassword(req.body.password,req.body.id);
  res.send(user)
})

route.post('/edit/status', async(req,res) => {
  await updatestatus(req.body.status,req.body.id)
  res.send("done")
})

module.exports = {
  usersRoute: route
}