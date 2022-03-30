// 设置翻页
var pageOul = document.querySelector('.page_Oul');
var pageOLi = pageOul.querySelectorAll('li');
var praOul = document.querySelector('.pra_Oul');
var Subject = document.querySelectorAll('.subject span');
// 页数
var page = 0;

// 下一页
pageOLi[4].onclick = function() {
    page++;
    if(page == 4) {
        page = pageOLi.length-2;
        return false;
    }

    if(page == 1) {
        pageOLi[0].children[0].className = "active";
    } else {
        pageOLi[0].children[0].className = "";
    }
    if(page == 3) {
        pageOLi[4].children[0].className = "active";
    } else {
        pageOLi[4].children[0].className = "";
    }

    
    praOul.innerHTML = addMessage(page-1,online);

    for (var j = 1; j < pageOLi.length-1; j++) {
        pageOLi[j].children[0].className = "";
    }
    pageOLi[page].children[0].className = "active1";
}

// 上一页
pageOLi[0].onclick = function() {
    page--;
    

    if(page < 1) {
        page = 1;
        return false;
    }

    if(page == 1) {
        pageOLi[0].children[0].className = "active";
    } else {
        pageOLi[0].children[0].className = "";
    }
    if(page == 3) {
        pageOLi[4].children[0].className = "active";
    } else {
        pageOLi[4].children[0].className = "";
    }

    praOul.innerHTML = addMessage(page-1,online);

    for (var j = 1; j < pageOLi.length-1; j++) {
        pageOLi[j].children[0].className = "";
    }
    pageOLi[page].children[0].className = "active1";


}


// 添加点击事件
for(var n = 1;n < pageOLi.length-1;n++) {
    pageOLi[n].index = n;
    pageOLi[n].onclick = function() {
        // 清空样式
        for(var j = 0;j < pageOLi.length;j++) {
            pageOLi[j].firstChild.className = '';  
        }
        // 设置li样式
        pageOLi[this.index].firstChild.className = 'active1';
        page = this.index;
        // addMessage(this.index-1);
        praOul.innerHTML = addMessage(this.index-1,online);


        if (this.index == 1) {
            pageOLi[0].children[0].className = 'active';
        } else {
            pageOLi[0].children[0].className = '';
        }

        if (this.index == pageOLi.length-2) {
            pageOLi[pageOLi.length-1].children[0].className = 'active';
        } else {
            pageOLi[pageOLi.length-1].children[0].className = 'active2';
        }
    }
}

// 筛选
for(var i = 0;i < Subject.length;i++) {
   Subject[i].index = i;
   Subject[i].onclick = function() {
        for(var j = 0 ;j < Subject.length;j++) {
            Subject[j].className = '';
       }
        Subject[this.index].className = 'active';

        if(Subject[this.index].getAttribute('obj') == 'all') {
            praOul.innerHTML = addMessage(0,online);
        } else {
            var that = this;
            var arr = online.filter(function(value){
                return value.subject == Subject[that.index].getAttribute('obj');
            })
            praOul.innerHTML = addMessage(0,arr);
            pageOLi[2].remove();
            pageOLi[2].children[0].remove();
            pageOLi[3].remove();
            pageOLi[3].children[0].remove();
            pageOLi[0].children[0].className = 'active';
            pageOLi[4].children[0].className = 'active';
        }
    }  
}

// 调用addMessage
praOul.innerHTML += addMessage(0,online);

// 封装动态添加li
function addMessage(page,date) {
    var message = "";
    praOul.innerHTML = "";
    var end = (page + 1) * 12 > date.length ? date.length : (page + 1) * 12;
    // console.log(num);
        for(var i = page*12 ;i < end;i++) {
            message += `<li>
                <div class="pic">
                    <img src="${date[i].src}" alt="banner6">
                    <div class="pic_bgd clearfix">
                        <p class="fl">${date[i].num}人在学习</p>
                    </div>
                </div> 
                <div class="txt">
                    <div class="fl">
                        <h3>${date[i].title}</h3>
                        <span>${date[i].time}课时</span>
                    </div>
                    <div class="right fr">
                        <a href="./third.html">59.9元</a>
                    </div>
                </div>
                </li>`
    };

    return message;
}





















