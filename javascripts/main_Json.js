
getAllAttrs = function (obj) {
    var it = '';
    for (var i in obj) {
        it += i + ':' + obj[i] + '\n';
    }
    return it;
};
$(function () {
    window.tagsTIME = false; //控制防止动画时多次点击造成动画错乱
    $("#tags .tag").live({
        mouseover: function () {
            $(this).animate({ height: '46px' }, 200);
            $(this).children("h2").animate({ marginTop: '2px' }, 200);
        },
        mouseout: function () {
            $(this).animate({ height: '30px' }, 200);
            $(this).children("h2").animate({ marginTop: '-6px' }, 200);
        },
        click: function () {
            if (tagsTIME) {
                return;
            }
            tagsTIME = true;
            var tagsa = $("#tags a"), i = 0;
            var length = tagsa.length;
            for (; i < length; i++) {
                if (tagsa[i] == this) {
                    break;
                }
            }
            $(tagsa[0]).animate({ marginRight: '96px' }, 200).animate({ marginTop: '31px', width: '90px' }, 200).addClass("tag").removeClass("tagvisiting");
            $(tagsa[i]).animate({ marginRight: '-96px' }, 200); // (96 * (j + 1) + 'px') 因相对移动，后面的元素也发生了移动，即使没有给改变数值
            $(this).animate({ marginRight: (-96 * (i + 1) + 'px') }, 200 * i);
            $(this).addClass("TODO").off();
            setTimeout(function () {
                $("#tags a").attr('style', '').find('h2').attr('style', '');
                var TODO = $('.TODO').addClass("tagvisiting").removeClass("tag TODO");
                $("#tags").prepend(TODO);

                tagsTIME = false;
            }, i * 200 + 700);

        }
    });


    //   window.N= github.getList("Notes");


    var converter = new Showdown.converter();
    loadMD = function () {
        $.ajax({
            url: "index.md",
            cache: false,
            dataType: "text",
            success: function (data, type) {
                $("#md").html(converter.makeHtml(data));
            }
        });
    }
    ajax_get = function () {
        $.ajax({
            url: ($("#ajax_get").attr("value")),
            dataType: "text",
            data: ($("#ajax_data").attr("value")),
            success: function (data, type) {
                getAllAttrs(data);
            }
        });
    }
    ajax_post = function () {
        $.ajax({
            url: ($("#ajax_post").attr("value")),
            dataType: "text",
            data: ($("#ajax_data").attr("value")),
            type: "POST",
            success: function (data, type) {
                getAllAttrs(data);
            }
        });
    }

    $.ajax({
        url: "File.json",
        cache: false,
        dataType: "json",
        success: function (data, type) {
            Resolve.call(Resolve,data);
        }
    })
    //    $("#md").html(converter.makeHtml($("#md").text()));


});