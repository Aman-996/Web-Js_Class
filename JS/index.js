// =========banner图============
// 获取元素
var banner_ODiv = document.querySelector('.banner');

var banPic_Oul = document.querySelector('.banner_pic');
var banTil_Oul = document.querySelector('.banner_title');

var banPic_Oli = banPic_Oul.getElementsByTagName('li');
var banTil_Oli = banTil_Oul.getElementsByTagName('li');

// 动态生成li
var listS = titleS = "";
for(var i = 0;i < bannerData.length;i++) {
    listS += '<li><img src = "'+bannerData[i].src+'" alt = "banner_pic"></li>';
    titleS +='<li>'+bannerData[i].title+'</li>';
}

// 添加内容至ul中
banPic_Oul.innerHTML = listS;
banTil_Oul.innerHTML = titleS;

// 初始化样式
banPic_Oli[0].style.opacity = 1;
banTil_Oli[0].className = 'active';

// 开启轮播自动切换
var n = 0;
var timer = setInterval(action, 2000);
function action() {
    n++;
    if(n == banPic_Oli.length) {
        n = 0;
    }
    // 切换图片
    for(var i = 0; i < banPic_Oli.length; i++) {
        ujiuye.bufferMove(banPic_Oli[i],{"opacity": 0},10);
        banTil_Oli[i].className = "";
    }
    ujiuye.bufferMove(banPic_Oli[n],{"opacity": 1},10);
    banTil_Oli[n].className = "active";
}

// 鼠标移入停止定时器
banner_ODiv.onmouseover = function() {
    clearInterval(timer);
}

// 鼠标移出开启定时器
banner_ODiv.onmouseout= function() {
    timer = setInterval(action,2000);
}

// 鼠标放入标题显示对应图片
for(var j = 0;j < banTil_Oli.length;j++) {
    banTil_Oli[j].index = j;
    banTil_Oli[j].onmouseover = function() {
        n = this.index;
        // 切换图片
        for (var i = 0;i < banPic_Oli.length;i++) {
            ujiuye.bufferMove(banPic_Oli[i],{"opacity": 0},10);
            banTil_Oli[i].className = "";
        }
        ujiuye.bufferMove(banPic_Oli[n],{"opacity": 1},10);
        banTil_Oli[n].className = "active";
    }
}
// =============================

// ========== 同步课程===========
// 获取元素
document.querySelector('.syn_Oul').innerHTML = showData(lesson.online);
document.querySelector('.test_Oul').innerHTML = showData(lesson.test);
document.querySelector('.good_Oul').innerHTML = showData(lesson.good);

function showData(date) {
    var message = "";
    for(var i = 0;i < date.length;i++) {
        message += `<li>
            <div class="pic">
                <img src="${date[i].src}" alt="banner4">
                <span>${date[i].cont}</span>
                <div class="pic_bgd clearfix">
                    ${date[i].isFree == true ? `<p class="fl">${date[i].num}人在学习</p>` : `<p class="fl">${date[i].num}人在学习</p><p class="fr">${date[i].time}</p>`}
                </div>
            </div> 
            <div class="txt clearfix">
                <div class="fl">
                    <h3>${date[i].title}</h3>
                    ${date[i].isFree == true ? `<span class="time">${date[i].time}课时</span>` : ""}
                </div>
                <div class="right fr">
                    ${date[i].isFree == true ? `<a href="./third.html">免费学习</a>` : `<a href="#">去考试</a>`}
                </div>
            </div>
        </li>`;
    }   
    return message;
}
// =================================
