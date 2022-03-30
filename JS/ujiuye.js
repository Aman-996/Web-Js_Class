var ujiuye = (function () {
    /* 
*作用：获取元素的样式
*@parm {object} elemObj:标签
*@parm {string} attr:属性
*/
    function getStyle(elemObj, attr) {
        if (elemObj.currentStyle) {
            return elemObj.currentStyle[attr];
        } else {
            return getComputedStyle(elemObj)[attr];
        }
    }


    /* 
    *作用：元素运动
    *@parm {object} elemObj:标签
    *@parm {string} attr:属性
    *@parm {number} step:步长
    *@parm {number} target:目标值
    */

    function fly(elemObj, attr, step, target) {
        //7.确定步长的正负
        step = parseInt(getStyle(elemObj, attr)) < target ? step : -step;
        //6.定时器会叠加，在开启定时器之前，停止以前的定时器
        clearInterval(elemObj.timer);  //将定时器id存储在标签属性中
        elemObj.timer = setInterval(function () { //timer = 1
            //4.获取当前元素的位置  left
            var cur = parseInt(getStyle(elemObj, attr)) + step;

            //5.到目标的位置停止
            if ((cur >= target && step > 0) || (cur <= target && step < 0)) {//起飞
                cur = target;
                clearInterval(elemObj.timer);
            }
            //3.设置元素位置
            elemObj.style[attr] = cur + "px";
        }, 30);
    }

    /* 
    *作用：生成随机数
    *@parm {number} min：最小值
    *@parm {number} max：最大值
    */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /* 
    *作用：补0
    *@parm {number} num：需要补0的数值
    */
    function addZero(num) {
        return num < 10 ? "0" + num : num
    }

    /* 
    *作用：绑定事件
    *@parm {object} elemObj：标签
    *@parm {string} type：事件类型，不加on
    *@parm {function} fun：事件处理函数
    */
    function bind(elemObj, type, fun) {
        if (elemObj.addEventListener) {
            elemObj.addEventListener(type, fun);
        } else {
            elemObj.attachEvent("on" + type, fun);
        }
    }

    /* 
    *作用：取消事件
    *@parm {object} elemObj：标签
    *@parm {string} type：事件类型，不加on
    *@parm {function} fun：事件处理函数
    */
    function unbind(elemObj, type, fun) {
        if (elemObj.removeEventListener) {
            elemObj.removeEventListener(type, fun);
        } else {
            elemObj.detachEvent("on" + type, fun);
        }
    }

    /* 
    *作用：添加滚轮事件
    *@parm {object} elemObj：标签
    *@parm {function} upFun：往上滚调用的函数
    *@parm {function} downFun：往下滚调用的函数
    */
    function mouseWheel(elemObj, upFun, downFun) {
        //2.添加滚轮事件
        elemObj.onmousewheel = mouseScroll;
        //ff
        if (elemObj.addEventListener) {
            elemObj.addEventListener("DOMMouseScroll", mouseScroll);
        }

        //3.事件处理函数
        function mouseScroll(eve) {
            var ev = window.event || eve;
            //tag = true  上      false：下
            if (ev.wheelDelta) {
                tag = ev.wheelDelta > 0 ? true : false;
            } else {
                tag = ev.detail > 0 ? false : true;
            }

            //判断tag
            if (tag) {
                upFun();
            } else {
                downFun();
            }
        }
    }

    /* 
    *作用：缓冲运动
    *@parm {object} elemObj：标签
    *@parm {object} props:运动属性对象
    *@parm {number} time：运动时间
    */
    function bufferMove(elemObj, props, time, fun) {
        //6.在开启定时器之前，先清除之前的定时器
        clearInterval(elemObj.timer);
        elemObj.timer = setInterval(function () {
            //a.假设所有属性都到了目标点  tag = true;
            var tag = true;

            //7.遍历属性，有多少个属性，执行多少次
            for (var attr in props) {
                //3.获取元素当前位置
                if (attr == "opacity") {
                    var cur = parseInt(getStyle(elemObj, attr) * 100);
                    //透明度最大值为1，大于1,说明一件乘过了
                    props[attr] = props[attr] > 1 ? props[attr] : props[attr] * 100;
                } else {
                    var cur = parseInt(getStyle(elemObj, attr));
                }

                //4.计算速度 = (目标值-当前值) / 时间
                var speed = (props[attr] - cur) / time;

                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);


                //2.设置div的位置
                if (attr == "opacity") {
                    elemObj.style[attr] = (cur + speed) / 100;
                } else {
                    elemObj.style[attr] = cur + speed + "px";
                }

                //b.验证假设，循环每一个属性，但凡有一个没有到达目标点  假设不成立  tag=false
                if (cur != props[attr]) {
                    tag = false;
                }
            }


            //c.得出结论 tag
            if (tag) {//都到了目标点，停止定时器
                clearInterval(elemObj.timer);
                fun && fun(); //如果有回调函数再调用
            }

        }, 30);
    }

    return {
        "getStyle":getStyle,
        "fly":fly,
        "getRandom":getRandom,
        "addZero":addZero,
        "bind":bind,
        "unbind":unbind,
        "mouseWheel":mouseWheel,
        "bufferMove":bufferMove
    }
})();




