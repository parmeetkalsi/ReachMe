const { Posts, Users, Comments } = require('../db/models')

async function createNewComment(userId, postId, body) {
    let comment = await Comments.create({
      userId,
      postId,
      body,
      title:""
    })
  
    return comment
  }


  async function showAllComments(query) {

    //let postId = query.postId
    let where = {}
    if (query.postId) { where.postId = query.postId }
    
    const comment = await Comments.findAll({
      include: [ Users ],
      where
    })
    return comment
  }

  module.exports = {
      createNewComment,
      showAllComments
  }