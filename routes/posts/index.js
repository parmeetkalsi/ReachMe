const { Router } = require('express')

const multer  =   require('multer');

const upload =  multer({ dest: 'uploads/'})


const {
  createNewPost,
  findAllPosts,
  showpostbypostid,
  showpostbytitle,
  showpostbyuserid,
  like,
  checkmap,
  createmap,
  showpostsbykeyword
} = require('../../controllers/posts')

const {
  createNewComment,
  showAllComments
} = require('../../controllers/comments')

const route = Router()

route.get('/', async (req, res) => {
  const posts = await findAllPosts(req.query)
  
  res.status(200).send(posts)
})

route.get("/:id",async(req,res)=>{
  let post;
  if(isNaN(parseInt(req.params.id)))
  {
      post=await showpostsbykeyword(req.params.id);
  }
  else
  {
      post=await showpostbypostid(req.params.id);
  }
 
  res.send(post);
})

route.get("/p/:id", async(req,res) => {
  let post = await showpostbyuserid(req.params.id);
  res.send(post)
})

route.get("/comments/:id", async(req,res) => {
  let comm = await showAllComments(req.params.id)
  res.send(comm)
})

route.post("/comments/:postid/:userid", async(req,res) => {
  await createNewComment(req.params.userid,req.params.id,req.body.comment);
  res.send("done");
})

route.post('/', async (req, res) => {
  console.log(`POST /api/posts`, req.body)
  
  //const { userId, title, body } = req.body
  
  /* if ((!userId) || (!title) || (!body)) {
    return res.status(400).send({
      error: 'Need userid, title and body to create post'
    })
  } */

  const post = await createNewPost(req.body.userId,req.body.title,req.body.post,req.body.keyword,req.body.fileName)
  res.status(201).send(post)
})

route.post("/like", async(req,res) => {
  let data = await like(req.body.userid,req.body.postid);
  res.send(data)
})

route.get("/like/:userid/:postid", async(req,res) => {
  let data = await checkmap(req.params.userid,req.params.postid);
  let mssg;
  if(data.length==0){mssg = "like"}
  else {mssg = "liked"}
  res.send({mssg});
})


module.exports = {
  postsRoute: route
}