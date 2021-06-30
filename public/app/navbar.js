/* let navlinks = $('.navbar-nav .nav-link')

navlinks.click((ev) => {

  let componentUrl = `/components/${$(ev.target).attr('data-component')}.html`
  $('#content').load(componentUrl)

}) */
let signup=function(){
  const pass1=$("#exampleInputPassword1").val();
  const pass2=$("#exampleInputPassword2").val();
  const username=$("#exampleInputEmail1").val();
  const email=$("#exampleInputEmail2").val();
  if(pass1!=pass2)
  {
      window.alert("Password didnt matched!! try again!!");
      
  }
  else if(pass1==0|| pass2==0 || username==0 || email==0){
      window.alert("Please fill all the fields!!");
  }
  else
  {
      if(email.indexOf('@')==-1)
      {
          window.alert("Please enter a valid E-mail!!")
      }
      else
      {  $.post('/api/users',{
              username:username,
              password:pass1,
              email:email
          },(data)=>{
              if(data)
              {
                  success(data);
              }
              else
              {
                  window.alert("Username Already taken!!!")
              }
          
          });

      }
  }
  


}
let logout=function(){
window.localStorage.clear();
window.location.replace("/");
}

let  login=function(){
$.post('api/users/login',{
  username:$("#exampleInputEmail1").val(),
  password:$("#exampleInputPassword1").val()
},(data)=>{
  if(data)
  {
      success(data);
  }
  else
  {
      window.alert("INVALID USERNAME OR PASSWORD!!!");
  }
});
}

let success=function(data){
  window.localStorage.user=JSON.stringify(data);
      $(".button").hide();
      $("#login").hide();
      $("#user").show(); 
      $("#logout").show();

      
      
      /* $("#content").load("/Components/successful.html",()=>{
          $("#succ").prepend($(`<h3>WELCOME ${data.username}</h3>`));
      }) */
      
      $("#user").text(JSON.parse(window.localStorage.user).username);
      setTimeout(()=>{
          window.location.replace("/");
      },3000)

}

let main=function(){
  console.log("===============================working=============================")
  if(window.localStorage.user)
  {
      $(".button").hide();
      $("#login").hide();
      $("#user").show(); 
      $("#logout").show();
      $("#user").text(JSON.parse(window.localStorage.user).username);
      $("#logout").click(()=>{
         logout();
      })
      $("#user").click(()=>{
          location.href='/components/myprofile.html'
      })
      $("#write-post").click(()=>{
        $('#content').load('/components/write-post.html')
     })
       $("#my-posts").click(()=>{
        $('#content').load('/components/my-posts.html')
      })
      

      $("#searchbtnnav").click(()=>{
        //console.log(search1)
        search()
      })


  }
  else
  {
     
      $(".button").show();
      $("#login").show();
      $("#logout").hide();
      $("#user").hide();

      $("#write-post").click(()=>{
        window.alert("LOGIN FIRST");
     })
       $("#my-posts").click(()=>{
        window.alert("LOGIN FIRST");
      })

      $("#signup").click(()=>{
          $("#content").load("/components/signup.html",()=>{
              $("#fp").text("Sign Up");
              $("#submit").click(()=>{  
                  signup();
              })

          })

      })
      $("#login").click(()=>{
          $("#content").load("/components/signin.html",()=>{
              $("#fp").text("Login");
              $("#submit").click(()=>{
                  login();
              })

          })

      })
  }
}

let search=function(){
    let search1=$("#searchinp").val()
    console.log($("#searchinp").val())
    //let s=$("#searchinput").val();
    window.location=`/components/particularposts.html?q=${search1}`
}

main()