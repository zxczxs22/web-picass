$(function() {
 
    // 滑动条下划线  start
    var navUnderline = document.querySelector('.nav ul');

    function mouseleaveFunc() {
        target.style.borderColor = 'transparent';
    }
    navUnderline.addEventListener("mouseleave", mouseleaveFunc);
    // 滑动条下划线  end

    var codeBoxShow = JSON.parse(localStorage.getItem('PICASSP_CODE')) || false;
    var codeBox = $('#code-box');
    var codeImg = $('#code-img');
    var codeId = '';
    var codeSwitch = true;
    if( codeBoxShow) {
        codeBox.css('display','block');
        getCodeImg();
    } else {
        codeBox.css('display','none')
    }
    codeImg.click(function(){
        if(codeSwitch) return ;
        codeSwitch = true;
        getCodeImg();
    })
    function getCodeImg() {
        $.picassoGet('/captcha/getCaptcha',{},function(data){
            codeSwitch = false;
            codeId = data.id;
            codeImg.attr("src", "data:image/png;base64,"+data.data);
        },function(err){
            codeSwitch = false;
            codeImg.attr("src", "./dist/images/login/codeImg2.jpg");
            layer.msg(err.message||err, {
                time: 1500
            });
        })
    }

    //登入事件
    $('input[type="submit"]').click(function(e) {
        var e = e || window.e
        e.preventDefault();
       
        var account = $('#account').val().trim();
        var password = $('#password').val();
        var code = $('#code-input').val();
        var parameter;
        var header;
        var lj = JSON.parse(localStorage.getItem('language'));
        var promptText = "";
        if (!account) {
            if (lj == "en") {
                promptText = "Please input account";
            } else {
                promptText = "请输入账号";
            }
            layer.msg(promptText, {
                time: 1500
            });
            return;
        }
        if (!password) {
            if (lj == "en") {
                promptText = "Please input password";
            } else {
                promptText = "请输入密码";
            }
            layer.msg(promptText, {
                time: 1500
            });
            return;
        }
        if (!validator.isEmail(account) && !validator.isMobilePhone(account, 'zh-CN')) {
            if (lj == "en") {
                promptText = "Wrong account format";
            } else {
                promptText = "账号格式输入错误";
            }
            layer.msg(promptText, {
                time: 1500
            });
            return;
        }
        var type = validator.isEmail(account) ? 0 : 1;

        if (!validator.isByteLength(password, {
                min: 3,
                max: 20
            })) {
                if (lj == "en") {
                    promptText = "Password between 3~20 characters";
                } else {
                    promptText = "密码长度须在3~20位之间";
                }
                layer.msg(promptText, {
                    time: 1500
                });
            return;
        }
        parameter = {
            type: type,
            account: account,
            password: md5(password),
            deviceNum: '',
            deviceInfo:{
                "uuid":"",
                "model":"",
                "platform":"",
                "version":"",
                "manufacturer":"",
                "serial":""
              },
            deviceType: '',
            operateSystem: '',
            ip: "192.168.0.1",
            location :  {
                latitude : "",
                longitude : ""
            },
        };
        if(codeSwitch) {
            if(!code) {
                if (lj == "en") {
                    promptText = "Please input code";
                } else {
                    promptText = "请输入验证码";
                }
                layer.msg(promptText, {
                    time: 1500
                });
            } else {
                header = {
                    "x-bnqkl-captchaId": codeId,
                    "x-bnqkl-captchaToken": code,
                }
            }
        }
        $.picassoPost('/user/login',parameter , function(data) {
            sessionStorage.token = JSON.stringify(data.token);
            sessionStorage.name = JSON.stringify(data.name);
            var lj = window.location.hash;
            var promptText = "";
            if (lj == "en") {
                promptText = "Login successfully";
            } else {
                promptText = "登录成功";
            }
            layer.msg(promptText, {
                time: 1500
            });
            localStorage.setItem("PICASSP_CODE",JSON.stringify(false))
            setTimeout(function() {
                window.location.href = "management.html"

            }, 800);

        }, function(err) {
            if(err.code == -2) {
                localStorage.setItem("PICASSP_CODE",JSON.stringify(true))
                codeBoxShow = true;
                codeBox.css('display','block');
                getCodeImg();
            }
            layer.msg(err.message, {
                time: 1500
            });
        },header);





    })

    // // 滑动验证 start
    // // 初始化
    // var sliderSwitch = false;
    // var slider = document.querySelector('#slider')
    // var handler = document.querySelector('.handler')
    // var bg = document.querySelector('.drag_bg')
    // var sliderTxt = document.querySelector('.drag_text')
    // var startX = 0,
    //     lastX = 0,
    //     doc = document,
    //     width = slider.offsetWidth,
    //     max = width - handler.offsetWidth;
    // // 滑块移动触发
    // function sliderMove(e) {
    //     var e = e || window.event;
    //     lastX = e.clientX - startX;
    //     lastX = Math.max(0, Math.min(max, lastX)); //这一步表示距离大于0小于max，巧妙写法
    //     if (lastX >= max) {
    //         handler.classList.add('handler_ok_bg');
    //         slider.classList.add('slide_ok');
    //         handler.removeEventListener('mousedown', sliderDown, false);
    //         sliderUp(e);
    //         sliderSwitch = true;
    //         sliderTxt.innerHTML = "成功"
    //         sliderTxt.style.color = "#FFF"
    //     }
    //     bg.style.width = lastX + 'px';
    //     handler.style.left = lastX + 'px'; //-2 border宽度
    // }
    // //松开触发
    // function sliderUp(e) {

    //     var e = e || window.event;
    //     slider.classList.remove('unselect');
    //     if (lastX < width) {
    //         bg.classList.add('ani');
    //         handler.classList.add('ani');
    //         bg.style.width = 0;
    //         handler.style.left = 0;
    //         setTimeout(function() {
    //             bg.classList.remove('ani');
    //             handler.classList.remove('ani');
    //         }, 300);
    //     }
    //     document.removeEventListener('mousemove', sliderMove, false);
    //     document.removeEventListener('mouseup', sliderUp, false);
    // }

    // // 点击滑块触发
    // function sliderDown(e) {
    //     var e = e || window.event;
    //     slider.classList.add('unselect');

    //     startX = e.clientX - handler.offsetLeft;

    //     document.addEventListener('mousemove', sliderMove, false);
    //     document.addEventListener('mouseup', sliderUp, false);
    //     return false;
    // }

    // handler.addEventListener('mousedown', sliderDown, false);
    // // 滑动验证 end



})