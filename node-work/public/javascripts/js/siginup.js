var fn=function(){
    var $inputEmail=$("#input-email").val();
    var $inputUserName=$("#username").val();
    var $userpsw = $("#userpes").val();
    var $repeatpsw=$("#repeatpsw").val();
    var $emailState = false ;
    var $username = false;
    var $userpswstaues = false;
    var $repeatpswstaues=false;
    $inputEmail.blur(function(){
        checkEmail();
    })
    $userpsw.blur(function(){
        checkpsw();
    })
    $repeatpsw.blur(function(){
        checkrepeatpsw();
    })
    $inputEmail.focus(function(){
        emailState=false;
        removeWarn($(this));
    })

    $inputUserName.focus(function(){
        $username = false;
        removeWarn($(this))
      })
      userpsw.focus(function(){

        $userpswstaues=false;
        removeWarn($(this))
      })
      $repeatpsw.focus(function(){

        $repeatpswstaues=false;
        removeWarn($(this));
      })
      $userpsw.bind("input",function(){
          checkpasswordlength();
      })
      $repeatpsw.blur(function(){
          if(!userpsw.val()){
              alert("you must write password first")
              repeatpsw.val("")
              return;
          }
      })

      if($userpsw.val()!==repeatpsw.val()){
          warnFun($repeatpsw,"两次密码不一致")
          return;
      }

      $repeatpsw=true;
      $repeatpsw.focus(function(){
          $repeatpsw=false;
          removeWarn($(this))
      })
     function checkEmail(){
         var email=$inputEmail
         if(!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,5}$/.test(email)){
             warnFun($inputEmail,"请输入正确的Email")
             return
         }
         checkEmailajax()
     }
     function checkEmailajax(){
         var email=$inputEmail
         $.ajax({
             "type":"CHECKOUT",
             "url":"/",
             "data":{
                 email:email
             },
             "success":function(data){
                 if(data.result.lenght>0){
                     warnFun($inputEmail,"该Email已被注册,请重新输入")
                 }else{
                     emailState=true
                 }
             }
         })
     }
     function warnFun(dom,value) {
        dom.parent().addClass("has-error");
        dom.siblings("div.control-label").remove();
        dom.after("<div class='control-label'>"+value+"</div>")
      }
    
     
      function removeWarn(dom){
        dom.parent().removeClass("has-error")
        dom.siblings("div.control-label").remove();
      }
      $userpsw.blur(function(){
          if(checkpsw()){
              if(checkpasswordlength()<2){
                  warnFun(userpsw,"密码安全等级不够")
                  $(".form-control").remove();
                  return;
              }
          }else{
              warnFun(userpsw,"请输入正确的密码")
              return;
          }
          $userpswstaues=true;
      })
      function checkpsw(){
          var password=$userpsw;
          var flag=true;
          if(password.lenght<8 || password.lenght>20){
              warnFun(userpsw,"密码长度为8-20位");
              flag=false;
          }
          if(/[^0-9a-zA-Z\`\!\@\#\$\%\^\&\*\(\)\_\+\{\}\,\.\/\"\:\;]/g.test(password)){
            warnFun($userpsw,"密码仅限于入数字、字母和符号 !@#$%^&*()_+{},./:;")
            flag = false;
          } 
          return flag;    
      }
    $(function(){
        $("#signin").click(function(){
            $.ajax({
                "type":"post",
                "url":"/signin",
                data:{
                    $userEmail:$("#input-email").val(),
                    $userName:$("#username").val(),
                    $userPwd:$("#userpsw").val(),
                },
                "success":function(data){
                    console.log(data)
                    alert("注册成功请登录")
                    window.location="/signin"
                }
            })
        })
    }) 
}
fn();