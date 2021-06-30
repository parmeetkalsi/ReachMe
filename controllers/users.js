const { Users, followersmapper } = require('../db/models')
const { genRandomUsername } = require('../utils/username')

async function createAnonUser() {
  const user = await Users.create({
    username: genRandomUsername(),
  })

  return user
}

async function updatestatus(status,id){
  await Users.update({status:status},{where:{id}})
}

async function checkcurrentpassword(password,id)
{
   let user=await Users.findOne({where:{id,password}})
   return user;
}

async function updatepassword(newpassword,id){
  await Users.update({password:newpassword},{where:{id:id}});
}

async function updateusername(newusername,id){
  await Users.update({username:newusername},{where:{id:id}});
  let user = await getUserById(id);
  return user
}

async function updateemail(newemail,id){
  await Users.update({email:newemail},{where:{id:id}})
}

async function createmap(currentuser,userId){
  let map = await followersmapper.create({
    userId,
    currentuser
  })
  return map
}

async function checkmap(currentuser,userId){
  let map = await followersmapper.findAll({where:{userId,currentuser}});
  return map;
}

async function newuser(username,password,email){
  const user = await Users.create({
    username: username,
    password: password,
    followers: 0,
    email: email
  })
  return user
}

async function login(username,password){
  let user = await Users.findOne({where:{username:username,password:password}});
  return user
}

async function getUserById(id) {
  return await Users.findOne({ where: { id } })
}

async function getUserByUsername(username) {
  return await Users.findOne({ where: { username } })
}

async function showuserallusers(){
  const user = await Users.findAll({limit:100,order:[["followers","DESC"]]});
  return user
}

async function follow(currentuser,userId){
  let map = await checkmap(currentuser,userId);
  if(map.length==0){
    await Users.increment("followers",{by:1,where:{id:userId}});
    await createmap(currentuser,userId);
  }

  let user = await getUserById(userId);
  return user
}

async function task(){
  let user = await checkcurrentpassword('2123',1);
  console.log(user);
}

module.exports = {
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
}

/*  Test Code */
/*
async function task () {
    console.log(await createAnonUser())
    console.log('---------------------')
    console.log(await createAnonUser())
    console.log('---------------------')
    console.log(await createAnonUser())
    console.log('---------------------')
    console.log(await createAnonUser())
    console.log('---------------------')
}
task() 
*/