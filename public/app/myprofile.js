$(() => {
    $('#navbar').load('/components/navbar.html')
    $('#footer').load('/components/footer.html')
    $('#content').load('/components/content.html', () => {
        let usern = JSON.parse(window.localStorage.user)

        let display="show"

        $.get("/api/users/"+usern.id, (u) => {
            $('#container').append(
                $(`
                <div class="card text-center">
                <div class="card-header">
                  Creator
                </div>
                <div class="card-body">
                  <h5 class="card-title" id="username">${u.username}</h5>
                  <p class="card-text" id="status">${u.status}</p>
                  <p class="card-text" id="email"><b>E-MAIL: </b> ${u.email}</p>
                  <p class="card-text"><b>FOLLOWERS: </b> ${u.followers}</p>
                  <button id="settings${u.id}" class="btn btn-success">Settings</button>
                </div>
                <div id="settingstab" class="card-footer text-muted">
                  
                <form>
                <div class="form-group1" id="form1">
                  <label for="exampleFormControlInput1">Change Username</label>
                  <input type="email" style="min-width: 500px" class="form-control" id="usernametab" placeholder="new username">
                  <button type="button" id="usernamebtn" style="margin-top: 5px;" class="btn btn-info">Submit</button>
                  
                </div>
                <div class="form-group2" id="form2">
                  <label for="exampleFormControlInput1">Change Email address</label>
                  <input type="email" style="min-width: 500px" class="form-control" id="emailtab" placeholder="name@example.com">
                  <button type="button" id="emailbtn" style="margin-top: 5px;" class="btn btn-info">Submit</button>
                </div>
                <div class="form-group3" id="form3">
                  <label for="exampleFormControlTextarea1">Change Status</label>
                  <textarea class="form-control" id="statustab" rows="3" placeholder="Status..."></textarea>
                  <button type="button" id="statusbtn" style="margin-top: 5px;" class="btn btn-info">Submit</button>
                </div>
              </form>


                </div>
              </div>
                `)
            )

            $("#settingstab").hide()
            $(`#settings${u.id}`).click(() => {
                console.log("===================================settings button========================================")
                
                if(display=="hide"){
                    $("#settingstab").hide()
                    display="show"
                }
                else if(display=="show"){
                    $("#settingstab").show()
                    display="hide"
                }
            })

            $("#usernamebtn").click(() => {
                $.post('/api/users/edit/username', {
                    newusername: $('#usernametab').val(),
                    id: usern.id
                }, (data)=> {
                    $('#form1').append(
                        $(`
                        <div class="alert alert-success" role="alert">
                        <h4 class="alert-heading">Username changed!</h4>
                        </div>
                        `)
                    )
                    window.localStorage.setItem('user', JSON.stringify(data));
                    $("#username").text(JSON.parse(window.localStorage.user).username);
                })
            })

            $("#emailbtn").click(() => {
                $.post('/api/users/edit/mail', {
                    newemail: $('#emailtab').val(),
                    id: usern.id
                }, (data)=>{
                    $('#form2').append(
                        $(`
                        <div class="alert alert-success" role="alert">
                        <h4 class="alert-heading">Email changed!</h4>
                        </div>
                        `)
                    )
                    
                    $.get("/api/users/"+usern.id, (u2)=> {
                        $("#email").text("<b>E-MAIL</b>:" `${u2.email}`)
                        console.log(`${u2.email}`)
                    })
                })
            })

            $("#statusbtn").click(() => {
                console.log("========================================username btn==========================================")
                    $.post('/api/users/edit/status', {
                        status: $('#statustab').val(),
                        id: usern.id
                    }, (data)=>{
                        if(data=='done'){
                            $('#form3').append(
                                $(`
                                <div class="alert alert-success" role="alert">
                                <h4 class="alert-heading">Status Changed!</h4>
                                </div>
                                `)
                            )
                            console.log("================================username changed========================================")
                            
                        }
                        $.get("/api/users/"+usern.id, (u3)=> {
                            $("#status").text(`${u3.status}`)
                            console.log(`${u3.status}`)
                        })
                    })
            })



        })
        
        

        

    })
})