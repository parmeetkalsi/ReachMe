function loadPosts() {
    if(window.localStorage.user){
      const user = JSON.parse(window.localStorage.user)
      let display="show"
      $('#posts-container').append(
        $(`
      <h1 class="h1 text-center" style="color: rgb(166, 90, 236); width: 100vw; padding :12px;">RECENT POSTS</h1>`))
        $.get('/api/posts/', (posts) => {
          console.log(posts)
          for (let p of posts) {
            $('#posts-container').append(
              $(`
              <div class="col-4">
                <div class="card m-2 rounded-0.5">
                  <div class="card-body">
                    <h5 class="card-title" style="text-align: center;">${p.title}</h5>
                    <a id="${p.id}${p.user.username}" class="btn btn-link text-muted" href="/components/profile.html?q1=${p.user.username}">${p.user.username}</a>
                    <p class="card-text">
                      ${p.body.substr(0, 200)}
                      <a style="color: red" href="/components/singlepost.html?q1=${p.id}">...read more</a>
                    </p>
                    <button type="button" class="btn btn-link-warning" style="" id="like${p.id}">Like</button>
                    <i id="nol" class="fa fa-heart" style="font-size:15px;color:purple"> by ${p.likes}</i>
                    <div class="form-inline" id ="collapseExample">
                    
                      <input id="comment-${p.id}" type="text" class="form-control mb-2 mr-sm-2" placeholder="write a comment....">
                      <div>
                      <button type="submit" id= "${p.id}" class=" btn-primary mb-2 btn-sm">comment</button>
                      <a href="/components/singlepost.html?q1=${p.id}">
                      <button type="submit" id= "showcomments" class="badge badge-pill badge-primary" style="float:right; margin-left: 75px;">show comments</button>
                      </a>
                      </div>
                      
                    </div>
                    <div id="ListId-${p.id}">
                  </div>
                  </div>
                </div>
              </div>
              `)
            )
            
            $.get(`api/posts/like/${user.id}/${p.id}`,(data)=>{
                if(data.mssg=="liked"){
                  $(`#like${p.id}`).text("Liked");
                }
                else{$("#like").text("Like");}
            })
    
            $(`#like${p.id}`).click(()=>{
              
              $.post("/api/posts/like",{
                  userid:user.id,
                  postid:p.id
              },(data)=>{
                  $("#nol").text(data.likes);
                  $(`#like${p.id}`).text("Liked");
              })
    
          })
    
            $(`#${p.id}`).click(()=>{
              console.log("=========================================button working============================================")
              
      
              const postId = p.id
              const userId = user.id
              const title = user.username
              const body = $(`#comment-${p.id}`).val()
      
             $.post('/api/comments/', {userId, postId, body}, (data)=>{
                console.log('ok sent', data.postId)
              })
              
            })
    
          }
        })
    }else{
      $('#posts-container').append(
        $(`
      <h1 class="h1 text-center" style="color: rgb(166, 90, 236); width: 100vw; padding :20px;">WELCOME TO ReachMe :)</h1>`))
      $('#posts-container').append(
          $(`<style>
            #posts-container{
              justify-content: center;
            }
          </style>
          <p>
          <a class="btn btn-info" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="true" aria-controls="multiCollapseExample1">OBJECTIVE</a>
          <button class="btn btn-info" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="true" aria-controls="multiCollapseExample2">FEATURES</button>
          </p>
          <div class="row">
          <div class="col">
            <div class="multi-collapse collapse show" id="multiCollapseExample1" style="">
              <div class="card card-body" id="MC">            
                Our aim is to give a platform to you guys,where you can create new posts related to your favourite topics and share your posts to all the users on our platform.If you think ,you are creative with your posts then surely you will get more likes and followers on our platfrom.<br> Go on share your knowledge with others!
              </div>
            </div>
          </div>
          <div class="col">
            <div class="multi-collapse collapse show" id="multiCollapseExample2" style="">
              <div class="card card-body" id="MC">
                  <ul>
                      <li>Create and post your articles,latest posts will be shown first in the trending section.</li>
                      <li>Posts are categorized into specific keywords or topics,and we can search these posts according to these keywords.</li>
                      <li>Like, comment on posts, follow other creators.</li>
                      <li>Enter the chat room and utilize the multiplayer canvas.</li>
                  </ul>
      
              </div>
            </div>
          </div>
        </div>
          `)
      )
    }

  }

