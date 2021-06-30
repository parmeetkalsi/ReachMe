$(()=>{
    $('#navbar').load('/components/navbar.html')
    $('#footer').load('/components/footer.html')
    $("#content").load("/components/Content.html",()=>{
        const user = JSON.parse(window.localStorage.user)
        const params = new URLSearchParams(location.search);
        const postid=params.get('q1');
        console.log(postid)
        //const userid=params.get('q2');
        let url="/api/posts/"+postid;
        $.get(url,(p)=>{
              if(p.file){
                $('#container').append(
                  $(`
                  <div>
                    <div style="width: fit-content;" class="card m-2">
                      <div class="card-body" style="max-width: 1000px;">
                        <h5 class="card-title">${p.title}</h5><br>
                        <h6 class="card-subtitle mb-2 text-muted">${p.user.username}</h6>
                        <img src="/images/${p.file}" alt="PIC" width="500" height="300">
                        <p class="card-text">
                          ${p.body}
                          
                        </p>
                        <button type="button" class="btn btn-link-warning" style="" id="like${p.id}">Like</button>
                         <i id="nol" class="fa fa-heart" style="font-size:15px;color:purple"> by ${p.likes}</i>
                        <div id ="collapseExample">
                          <input id="comment-${p.id}" type="text" class="form-control mb-2 mr-sm-2">
                          <button type="submit" id= "${p.id}" class=" btn-primary mb-2 btn-sm">comment</button>
                          
                        </div>
                        <div id="ListId-${p.id}">
                      </div>
                      </div>
                    </div>
                  </div>
                  
                  `)
                )
              }else{
                $('#container').append(
                  $(`
                  <div>
                    <div style="width: fit-content;" class="card m-2">
                      <div class="card-body" style="max-width: 1000px;">
                        <h5 class="card-title">${p.title}</h5><br>
                        <h6 class="card-subtitle mb-2 text-muted">${p.user.username}</h6>
                        <p class="card-text">
                          ${p.body}
                          
                        </p>
                        <button type="button" class="btn btn-link-warning" style="" id="like${p.id}">Like</button>
                        <i id="nol" class="fa fa-heart" style="font-size:15px;color:purple"> by ${p.likes}</i>
                        <div id ="collapseExample">
                          <input id="comment-${p.id}" type="text" class="form-control mb-2 mr-sm-2">
                          <button type="submit" id= "${p.id}" class=" btn-primary mb-2 btn-sm">comment</button>
                          
                        </div>
                        <div id="ListId-${p.id}">
                      </div>
                      </div>
                    </div>
                  </div>
                  
                  `)
                )
              }

            function liked(){
              $.get(`api/posts/like/${user.id}/${p.id}`,(data)=>{
                if(data.mssg=="liked"){
                  $(`#like${p.id}`).text("Liked");
                }
                else{$("#like").text("Like");}
            })
            }
            liked()
              
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

              $(`#${p.id}`).click(()=>{

                const postId = p.id
                const userId = user.id
                const title = user.username
                const body = $(`#comment-${p.id}`).val()
        
                $.post('/api/comments/', {userId, postId, body}, (data)=>{
                  console.log('ok sent', data.postId)
                })
                $(`#ListId-${p.id}`).empty()
                comments()
              })
      
                function comments(){
                  $.get(`/api/comments?postId=${p.id}`, (comments)=>{
                    $(`#commentListId-${p.id}`).empty()
                    for(let c of comments){
                      $(`#ListId-${p.id}`).append(
                        $(`
                        <div class="card" id="comment-card">
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
                comments()
              console.log(p)
            
          

        })
        

        
    })
})
