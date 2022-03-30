// 登录
var login = document.querySelector('.login1');// 头部登录
var loginBox = document.querySelector('.big1'); // 登录盒
var loginInp = loginBox.querySelectorAll('input'); // 登录输入框
var loginText = document.querySelector('.login .loginText');
var userPic = document.querySelector('.login img');
var error = loginBox.querySelector('.error');// 错误提示
var loginTips = document.querySelector('.userlist');
var loginOut = loginTips.querySelector('.out');



// 注册
var reg = document.querySelector('.reg'); // 头部注册
var regBox = document.querySelector('.big2'); // 注册盒
var regInp = regBox.querySelectorAll('input'); // 注册输入框
var regSp = regBox.querySelectorAll('form span'); // 注册输入框提示
var yzNum = regBox.querySelector('.yz'); // 验证码


// 关闭登录、注册
var close = document.querySelectorAll('.close');

// ==============点击登录============
login.onclick = function() {
    loginBox.style.display = 'block';
}

loginInp[2].onclick = function() {
    data = localStorage.getItem('user');
    var Num = JSON.parse(data);
    for(var i = 0;i < Num.length;i++) {
        if(loginInp[0].value == Num[i].userName && loginInp[1].value == Num[i].password) {
            loginBox.style.display = 'none';

            loginText.style.display = 'none';
            userPic.style.display = 'block';
            // 添加登录状态
            localStorage.setItem('isLogin',true);
            return false;
        } else {
            // alert('请输入正确的账号或密码');
            error.style.visibility = 'visible';
            return false;
        }
    }
    return false;
}
// 点击头像显示菜单
userPic.onclick = function() {
    loginTips.style.display = 'block';
}

loginTips.onclick = function() {
    loginTips.style.display = 'none';
}

// 退出登录
loginOut.onclick = function() {
    loginTips.style.display = 'none';
    localStorage.setItem("isLogin", false);
    loginText.style.display = 'block';
    userPic.style.display = 'none';
}

if (localStorage.getItem("isLogin") == "true") {
    //显示头像，隐藏登录文字
    loginText.style.display = 'none';
    userPic.style.display = 'block';
} 
// ================================

// ============点击关闭==============
for(var i = 0;i < close.length;i++) {
    close[i].onclick = function() {
        loginBox.style.display = 'none';
        regBox.style.display = 'none'; 
    }
}

// ======================点击注册=========================
reg.onclick = function() {
    regBox.style.display = 'block';
}

// 验证手机号
regInp[0].onblur = function() {
    var reg = /^1[3-9]\d{9}$/;
    if(reg.test(regInp[0].value)) {
        regSp[0].innerHTML = "";
    } else {
        regSp[0].style.display = 'block'; 
    }
}

// 验证密码
regInp[1].onblur = function() {
    var reg = /(?=.*\d.*)(?=.*[a-zA-Z].*)^[0-9a-zA-Z]{6,12}$/;
    if(reg.test(regInp[1].value)) {
        regSp[1].innerHTML = "";
    } else {
        regSp[1].style.display = 'block'; 
    }
}

// 重复验证密码
regInp[2].onblur = function() {
    if(regInp[1].value == regInp[2].value) {
        regSp[2].innerHTML = "";
    } else {
        regSp[2].style.display = 'block'; 
    }
}

// 验证验证码
regInp[3].onblur = function() {
    if(regInp[3].value.toLowerCase() == yzNum.innerText.toLowerCase()) {
        regSp[3].innerHTML = "";
    } else {
        regSp[3].style.display = 'block'; 
    }
}

// 点击注册按钮
regInp[4].onclick = function() {
    var arr = ["手机号格式错误，请重新输入！","密码格式为6-12位字母加数字，请重新输入！","密码两次输入不同请验证","验证码输入不正确"];
    for(var i = 0;i < regInp.length-2;i++) {
        if(regInp[i].value == "") {
            regSp[i].style.display = 'block';
            regSp[i].innerText = arr[i];
        }
    }
    for(var j = 0;j < regSp.length;j++) {
        if(regSp[j].style.display == 'block') {
            return false;
        }
    }

    if(regInp[5].checked == false) {
        alert('请勾选协议');
        return false;
    }
    alert('注册成功');
    loginBox.style.display = 'block';
    regBox.style.display = 'none'; 

    // 存储密码至本地
    // 多组注册：将账号和密码存储到盒子中，已经有盒子了获取现在的盒子存储，没有创建一个新盒子
    if(localStorage.getItem('user') == null) {
        var arr1 = [];
    } else {
        var arr1 = JSON.parse(localStorage.getItem('user'));
    }

    // 新注册的账号密码，存储在盒子中
    arr1.push({"userName":regInp[0].value,"password":regInp[1].value})

    // 存储到本地
    localStorage.setItem('user',JSON.stringify(arr1));

    return false;
}