const { Posts, Users, likesmapper } = require('../db/models')

async function createNewPost(userid, title, body, keyword, fileName) {
  const post = await Posts.create({
    title,
    body,
    userId: userid,
    likes:0,
    keyword: keyword,
    file: fileName
  })
  console.log(post)
  return post
}

/**
 * showAllPosts({username: ''})
 * showAllPosts({title: ''})
 */

async function createmap(userId,postId){
  let map = await likesmapper.create({
    userId,
    postId
  })
  return map
}

async function checkmap(userId,postId){
  let map = await likesmapper.findAll({where:{userId,postId}});
  return map
}

async function findAllPosts(query) {
  let where = {}
  if (query.userId) { where.userId = query.userId }
  
  const posts = await Posts.findAll({
    include: [ Users ],
    where
  })

  return posts
}

async function showpostbyuserid(id){
  const p = await Posts.findAll({where:{userId:id},include:[Users]});
  return p
}

async function showpostbypostid(id)
{
    const p=await Posts.findOne({where:{id},
        include:[Users]});
        return p;
}

async function showpostsbykeyword(keyword){
  const p = await Posts.findAll({where:{keyword},include:[Users]});
  return p
}

async function showpostbytitle(title){
  const p = await Posts.findOne({where:{title}},{include:[Users]});
  return p
}

async function like(userid,postid){
  let cm = await checkmap(userid,postid);
  if(cm.length==0){
    await createmap(userid,postid);
    await Posts.increment("likes",{by:1,where:{id:postid}});
  }
  const p = await showpostbypostid(postid)
  return p
}

async function task(){
  let p = await checkmap(2,1);
  console.log(p);
}

module.exports = {
  createNewPost,
  findAllPosts,
  showpostbypostid,
  showpostbytitle,
  showpostbyuserid,
  like,
  checkmap,
  createmap,
  showpostsbykeyword
}

/* Test Code */
/*
async function task() {
  // console.log(
  //   await createNewPost(
  //     1,
  //     'This is a sample post',
  //     'Body of the post goes here'
  //   )
  // ),
  // console.log(
  //   await createNewPost(
  //     2,
  //     'Another sample post',
  //     'Some body example here as well'
  //   )
  // )
  const posts = await showAllPosts()
  for (let p of posts) {
    console.log(`${p.title}\nauthor: ${p.user.username}\n${p.body}\n==========\n`)
  }
}
task()
*/