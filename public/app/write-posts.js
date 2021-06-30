
/* $(document).ready(function() {  
  console.log("============================document.ready===============================================")
    $('#UploadImage').click(() => {
      console.log("================")
      $('input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;
        alert('The file "' + fileName +  '" has been selected.');
     });
    })
}); */ 



/* $(document).ready(function(){
  $('input[type="file"]').change(function(e){
      var fileName = e.target.files[0].name;
      alert('The file "' + fileName +  '" has been selected.');
  });
}); */

$(document).ready(function() {
  $('input[type="file"]').change(function(e){
    //var fileName = e.target.files[0].name;
    const fileName = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '')
    alert('The file "' + fileName +  '" has been selected.');
  });
})


  //const fileName = $('input[type=file]').val()
  //const filename = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '')
  //console.log(fileName)
  
  $('#write-btn').click(() => {
      const userId = JSON.parse(window.localStorage.user).id
      console.log(userId + "asdasdas")
      const title = $('#p-title').val()
      const post = $('#p-body').val()
      const keyword=$("#exampleFormControlSelect1").val();
      const fileName = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '')
      alert('The file "' + fileName +  '" has been selected.');
      console.log(fileName)
      
  
     $.post('/api/posts', { userId , title, keyword, post, fileName}, (done) => {
      $('#content').load('/components/all-posts.html')
      $('.nav-item .active').removeClass('active')
      $("[data-components='my-posts']").addClass('active')
      console.log(done)
      console.log(userid)
      console.log(fileName)
    })
  
    })

