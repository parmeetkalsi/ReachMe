$(() => {
    const user = JSON.parse(window.localStorage.user)
    let display="show"
    $('#navbar').load('/components/navbar.html')
    $('#footer').load('/components/footer.html')
    $('#content').load('/Components/keypcontent.html', ()=>{
        const params = new URLSearchParams(location.search);
        const keyword=params.get('q');
        console.log(keyword)
        $.get(('/api/posts/'+keyword), (posts)=> {
            if( posts.length==0)
            {
                $("#container").append($(`
                <div class="card " id="c" style="text-align:center;">
                <div class="card-header" style="width: 800px">
                <h5 class="card-title">Sorry!! No results Found!!</h5>
                <img src="/pics/notfound2.gif" width="500px" height="500px">
                </div>
                </div>
                `));
                

            }
            for(let p of posts){
                console.log("post")
                $('#container').append(
                    $(`
                    <div class="col-4">
                      <div class="card m-2">
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
                            <button type="submit" id= "${display}-${p.id}" class="badge badge-pill badge-primary" style="float:right; margin-left: 75px;">show comments</button>
                            </div>
                            
                          </div>
                          <div id="ListId-${p.id}">
                        </div>
                        </div>
                      </div>
                    </div>
                    
                    `)
                  )

                  let url=`/api/posts/like/${user.id}/${p.id}`
                  $.get((url),(data)=>{
                    if(data.mssg=="liked"){
                      $(`#like${p.id}`).text("Liked");
                    }
                    else{$("#like").text("Like");}
                })
        
                $(`#like${p.id}`).click(()=>{
                  /* if(user.id==0)
                  {
                      window.alert("Login First!!");
                      return;
                  } */
                  $.post("/api/posts/like",{
                      userid:user.id,
                      postid:p.id
                  },(data)=>{
                      $("#nol").text(data.likes);
                      $(`#like${p.id}`).text("Liked");
                  })
        
              })


              $(`#${p.id}${p.user.username}`).click(()=>{
                console.log("============================================username button working=================================")
              })
      
              $(`#${p.id}`).click(()=>{
                console.log("=========================================button working============================================")
        
                const postId = p.id
                const userId = p.user.id
                const title = p.user.username
                const body = $(`#comment-${p.id}`).val()
        
               $.post('/api/comments/', {userId, postId, body}, (data)=>{
                  console.log('ok sent', data.postId)
                })
      
              })


              function comments(){
                let date = null
                let time = null
                $(`#ListId-${p.id}`).empty()
                $.get(`/api/comments?postId=${p.id}`, (comments)=>{
                  $(`#ListId-${p.id}`).empty()
                  
                  for(let c of comments){
                   /*  for(let l of `${c.createdAt}`){
                    
                    } */
                    
                    console.log('==========================' + `${c.createdAt}` + '===============================')
                    $(`#ListId-${p.id}`).append(
                      $(`
                      
                      <div class="card" style="width: 18rem;" id="comment-card">
                        <div class="card-body">
                          <h6 class="card-subtitle mb-2 text-muted">${c.user.username}</h6>
                          <p class="card-text">${c.body}</p>
                          
                        </div>
                      </div>
                      `)
                    )
                  }
                  
                 })
              }

              $(`#${display}-${p.id}`).click(()=>{
                if(display==='show'){
                  comments()
                  $(`#ListId-${p.id}`).show()
                  //console.log($(`#${display}-${p.id}`).text('hide'))
                  $(`#${display}-${p.id}`).text('hide comments')
                  console.log($(`#${display}-${p.id}`).text())
                  display='hide'
                  
                }
                else if(display==='hide'){
                  display='show'
                  $(`#${display}-${p.id}`).text('show comments')
                  $(`#ListId-${p.id}`).hide()
                  
                  console.log($(`#${display}-${p.id}`).text())
                  
                  console.log($(`#${display}-${p.id}`).text())
                }
      
              })


            }
        })
    })
})