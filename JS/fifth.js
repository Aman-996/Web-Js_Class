// 目录内容盒子
var contents = document.querySelector('.contents');
// 讨论内容盒子
var comment = document.querySelector('.comment'); 
// 内容盒
var cont = comment.querySelector('.cont');
// 目录、讨论按钮
var Btn = document.querySelectorAll('.banner .right .title>span');
var save = comment.querySelector('button');
var message = comment.querySelector('input');
var Ol = cont.querySelector('ol');



// 动态生成课程目录
var str = "";
for (var i = 0; i < classList.length; i++) {
    str +=  `<div class="lesson">
                  <p>
                      <i>${classList[i].title}</i>
                      <span class="icon"></span>
                  </p>
                  <ol>`;
    for (var j = 0; j < classList[i].list.length; j++) {
      str += `
                  <li class="clearfix">
                    <a href = "#">
                        <div class="pic1 fl"></div>
                        <h4 class = "fl">${classList[i].list[j].name}</h4>
                        <img class="fr" src = "./images/playicon.png"  alt="pic">
                    </a>
                  </li>`
      
    }
    str += `</ol></div>`;
    contents.innerHTML = str;
}

// 动态添加评论区内容
var str2 = "";
for(var n = 0;n < commentList.length;n++) {
  str2 += `
          <li>
              <p class="clearfix">
                  <img src="${commentList[n].src}" alt="pic" class="fl">
                  <span class="fl">${commentList[n].name}</span>
                  <time class="fr">${commentList[n].time}</time>
              </p>
              <p>
                  <i id="message">${commentList[n].content}</i>
              </p>
          </li>`
  Ol.innerHTML = str2;
}

// 点击目录、讨论按钮
for(var j = 0;j < Btn.length;j++) {
  Btn[j].index = j;
  var tag = true;
  Btn[j].onclick = function() {
    for(var i = 0;i < Btn.length;i++) {
      Btn[i].className = "";
    }
    this.className = 'active';
    if(tag) {
      comment.style.display = 'block';
      contents.style.display = 'none';
      tag = false;
    } else {
      comment.style.display = 'none';
      contents.style.display = 'block';
      tag = true;
    }
  }
}

// 点击发布，发送评论
var str3 = "";
save.onclick = function() {
  str3 = `
      <p class="clearfix">
          <img src="./images/preson.png" alt="pic" class="fl">
          <span class="fl">一只蜗牛</span>
          <time class="fr">21:12</time>
      </p>
      <p>
          <i>${message.value}</i>
      </p>`

var OLi = document.createElement('li');
OLi.innerHTML = str3;

Ol.insertBefore(OLi,Ol.firstElementChild);
message.value = "";
}
