var bannerImg = document.querySelector(".banner .left img"); // banner大图
var classSubject = document.querySelectorAll(".banner .right .top .p"); // banner图右边信息
var TimeNow = document.querySelector(".banner .top .topPrice"); // banner图右边信息
var Time = document.querySelectorAll(".time span"); // 倒计时
var price = document.querySelector(".banner .down"); // 价格
var teach = document.querySelector(".teach"); // 教资
var lessonTitle = document.querySelector(".lessonTitle"); // 目录
var lessonPic = document.querySelector(".lessonPic"); // 详情
var lessonBtn = document.querySelectorAll(".list_cont span"); //课程按钮
var openBtn = document.querySelector('.open1');

console.log(openBtn);

// 更换banner图
bannerImg.src = videoDetail.poster;

// 倒计时
// 当前时间
auto();
setInterval(auto, 1000);
function auto() {
  var now = new Date();
  // 目标时间
  var targetTime = new Date("2021,12,30");
  // 时间差
  var time = Math.floor((targetTime - now) / 1000);
  // 换算
  var t = Math.floor(time / 86400);
  var h = Math.floor((time % 86400) / 3600);
  var m = Math.floor((time % 3600) / 60);
  var s = time % 60;

  // 写入标签
  Time[0].innerHTML = ujiuye.addZero(t);
  Time[1].innerHTML = ujiuye.addZero(h);
  Time[2].innerHTML = ujiuye.addZero(m);
  Time[3].innerHTML = ujiuye.addZero(s);
}

// 更换banner图右边信息
TimeNow.innerHTML = `<p class="p">【${videoDetail.year}${videoDetail.title}】</p>
                    <p class="p1">年级科目：${videoDetail.grade}</p>
                    <p class="p1">课时数量：${videoDetail.time}课时</p>
                    <p class="p1">开课时间：${videoDetail.duration}</p>
                    <p class="p1">有效期至：${videoDetail.period}</p>`;

// 价格
// price[0].innerHTML = '&yen;'+ videoDetail.price;
price.innerHTML = `<div class="price clearfix">
                            <span class="fl">&yen;${videoDetail.price}</span>
                            <a href="#" class="fr priceA">免费试学</a>
                            </div>
                            <div class="buy clearfix">
                            <a href="#"  class="fl">
                                <span>&yen;${videoDetail.price}单独购买</span>
                            </a>
                            <span class="fl line"></span>
                            <a href="#"  class="fr">
                                <span>&yen;${videoDetail.group}拼团</span>
                            </a>
                        </div>`;

// 教资
teach.innerHTML = `<h2>授课师资</h2>
                    <div class="left fl">
                        <div class="preson clearfix">
                            <div class="fl">
                                <img src="./images/preson.png" alt="">
                            </div>
                            <div class="name">
                                <p>${videoDetail.teacher}</p>
                                <p>${videoDetail.teacherTitle}</p>
                            </div>
                        </div>
                    </div>
                    <span class="line"></span>
                    <div class="right fr">
                        <p>
                            ${videoDetail.introduce}
                        </p>
                    </div>`;

// 切换课程目录与详情
lessonBtn[0].onclick = function () {
  lessonTitle.style.display = "block";
  lessonPic.style.display = "none";
  lessonBtn[0].className = "active";
  lessonBtn[1].className = "";
};

lessonBtn[1].onclick = function () {
  lessonTitle.style.display = "none";
  lessonPic.style.display = "block";
  lessonBtn[1].className = "active";
  lessonBtn[0].className = "";
};

// 课程目录
// 循环数据
var str = "";
for (var i = 0; i < classList.length; i++) {
  // 课程目录
  str +=  `<div class="lesson">
                <p>
                    <i>${classList[i].title}</i>
                    <span class="icon"></span>
                </p>
                <ol>`;
  for (var j = 0; j < classList[i].list.length; j++) {
    str += `
                <li>
                 <div class="pic1 fl"></div>
                 <h4>${classList[i].list[j].name}</h4>
                 <span class="start">${classList[i].list[j].time}</span>
                 <span class="replay active">立即播放</span>
                </li>`
    
  }
  str += `</ol></div>`;
  lessonTitle.innerHTML = str;


  var lessonOl = lessonTitle.getElementsByTagName("ol");
  var spanIcon = lessonTitle.querySelectorAll(".icon");
}
// 为span添加事件代理
for (var n = 0; n < lessonOl.length; n++) {
  lessonOl[n].onmouseover = function (eve) {
    var ev = window.event || eve;
    var targetChild = ev.target || ev.srcElement;
    if (targetChild.className == "start") {
      targetChild.nextElementSibling.style.display = "block";
      targetChild.style.display = "none";
    }
  };
  lessonOl[n].onmouseout = function (eve) {
    var ev = window.event || eve;
    var targetChild = ev.target || ev.srcElement;
    if (targetChild.className == "replay active") {
      targetChild.previousElementSibling.style.display = "block";
      targetChild.style.display = "none";
    }
  }
  lessonOl[n].onclick = function (eve) {
    var ev = window.event || eve;
    var targetChild = ev.target || ev.srcElement;
        if (targetChild.className == "replay active" && localStorage.getItem('isLogin') == 'true') {
          location.href = "./fifth.html";
        } else {
          loginBox.style.display = 'block';
        }
    }
}


// 点击小三角收起目录
for(var a = 0;a < spanIcon.length;a++) {
    console.log(spanIcon);
    spanIcon[a].index = a;
    spanIcon[a].tag = true;
    spanIcon[a].onclick = function() {
        if(this.tag) {
            spanIcon[this.index].className = 'icon3';
            lessonOl[this.index].style.display = 'none';
        } else {
            spanIcon[this.index].className = 'icon';
            lessonOl[this.index].style.display = 'block';
        }
        this.tag = !this.tag;
    }
}

openBtn.addEventListener("click",function(){
    var tag1 = true;
    if(this.tag1) {
        lessonTitle.style.display = 'none';
        openBtn.innerHTML = '<span class="open1">点击展开全部</span>';
        this.tag1 = false;
    } else {
        lessonTitle.style.display = 'block';
        openBtn.innerHTML = '<span class="open1">点击收起全部</span>';
        this.tag1 = true;
    }
    
})



