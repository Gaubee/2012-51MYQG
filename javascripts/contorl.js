
window.message = document.createElement("div");

window.load = setInterval(function () {
    if (document.body && window) {
        document.body.appendChild(window.message);
        window.ExistMessage = true;
        window._WINDOW_H = window.innerHeight || document.body.clientHeight;
        clearInterval(window.load);
    }
}, 200);
var alert = function (T, style, IsAdd) {
    var log = document.createElement("a");

    if (!IsAdd) {//是否追加输出
        window.message.innerHTML += "<hr />"; // 默认追加
    } else {
        window.message.innerHTML = ""; //清空
    }
    log.innerHTML = T;
    window.message.appendChild(log);
    if (!window.ExistMessage) {

        (function () {//初始化原始属性

            var Sstyle = {
                position: 'fixed',
                left: '70%',
                width: '30%',
                top: "0",
                backgroundColor: '#555',
                opacity: 0.8,
                fontSize: '12px',
                color: '#FFF',
                padding: '5px',
                overflow: 'auto',
                top: "0px"
            };
            for (var css in Sstyle) {
                window.message.style[css] = Sstyle[css];
            }
            window.message.innerHTML += "<span style=\'position:fixed;top:0px;color:#22f;background-color:#FFF;margin-left:22%;cursor:pointer;\' onclick=\'(function(){var Message=window.message;var top=parseInt(Message.style.top);Message.style.top=top-20+\"px\";}).call(this)\'>↑</span>" +
             "<span  style=\'position:fixed;top:14px;color:#22f;background-color:#FFF;margin-left:22%;cursor:pointer;\' onclick=\'(function(){var Message=window.message;var top=parseInt(Message.style.top);Message.style.top=top>=0?\"0px\":top+20+\"px\";}).call(this)\'>↓</span>" +
             "<span  style=\'position:fixed;top:28px;color:#22f;background-color:#FFF;margin-left:22%;cursor:pointer;\' onclick=\'window.message.StopScroll=!window.message.StopScroll;alert(window.message.StopScroll?\"scroll is stopped\":\"scroll is running\");\'>■</span>";

            window.message.scroll = setInterval(function () {
                var top = parseInt(window.message.style.top);
                if ((window.message.clientHeight + top) > _WINDOW_H && _WINDOW_H != 0 && !window.message.StopScroll) {
                    window.message.style.top = top - (_WINDOW_H / 2) + 'px';
                    alert("Message Scroll!!", { color: '#aa0011', fontSize: '12px', backgroundColor: '#eeeeee' });
                }
                //window.message.style.top=parseInt(window.message.style.top) - (_WINDOW_H / 2) + 'px'
                //alert(window.message.style.top);
                //alert(window.message.clientHeight + " " + _WINDOW_H + " " + (window.message.clientHeight > _WINDOW_H));
            }, 200);
        })();
        window.ExistMessage = true;
    }
    if (style) {//追加样式到控制台信息
        for (var css in style) {
            log.style[css] = style[css];
        }
    }

}


var getAllAttrs = function (obj) {
    var it = '';
    for (var i in obj) {
        it += i + ':' + (typeof obj[i]) + '</br>';
    }
    return it;
}