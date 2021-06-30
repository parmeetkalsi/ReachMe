$(() => {
    $('#navbar').load('/components/navbar.html')
    $('#footer').load('/components/footer.html')
    $('#content').load('/components/content.html', () => {
        const params = new URLSearchParams(location.search);
        let usern=params.get('q1');

        if(usern === null){
            usern=JSON.parse(window.localStorage.user)
            console.log("usern" + usern)
        }

        console.log(usern + "usern")
        let usern1=JSON.parse(window.localStorage.user)
        console.log(`${usern1.id}`)
        console.log("=============================================" + usern1 + "==========================================")

        
        $.get("/api/users/"+usern, (u) => {
            $.get(`/api/users/follow/${usern1.id}/${u.id}`, (data) => {
                if(data=="followed"){
                    $("#follow").text("followed");
                }
            })
            $('#container').append(
                $(`
                <div class="card text-center">
                <div class="card-header">
                  Creator
                </div>
                <div class="card-body">
                  <h5 class="card-title">${u.username}</h5>
                  <p class="card-text">${u.status}</p>
                  <p class="card-text"><b>E-MAIL: </b> ${u.email}</p>
                  <p class="card-text"><b>FOLLOWERS: </b> ${u.followers}</p>
                  <button id="follow" class="btn btn-secondary">Follow</button>
                </div>
                <div class="card-footer text-muted">
                  
                </div>
              </div>
                `)
            )

            $("#follow").click(() => {
                console.log('==================================follow button working=================================================')
                const usern1id=usern1.id
                const usernid=u.id
                console.log(usern1id)
                console.log(usernid)
                console.log(u.id)
                $.get(`/api/users/follow/${usern1.id}/${u.id}`, (data) => {
                    if(data=="follow"){
                        $.post('/api/users/follow', { currentuser: usern1.id, userid: u.id }, (data) =>{
                            console.log("followed")
                            $("#follow").text("followed");
                        })
                    }
                    else{
                        $("#follow").text("followed");
                    }
                })
                /* $.post('/api/users/follow', {
                    currentuser: usern1.id,
                    userId: usern.id
                }, (data) =>{
                    console.log("followed")
                }) */
            })   

        })
    })

    

})