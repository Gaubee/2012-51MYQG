
getAllAttrs = function (obj) {
    var it = '';
    for (var i in obj) {
        it += i + ':' + obj[i] + '\n';
    }
    alert(it);
};
$(function ($) {
    window.github = new GH();
    window.tagsTIME = false; //���Ʒ�ֹ����ʱ��ε����ɶ�������
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
            $(tagsa[i]).animate({ marginRight: '-96px' }, 200); // (96 * (j + 1) + 'px') ������ƶ��������Ԫ��Ҳ�������ƶ�����ʹû�и��ı���ֵ
            $(this).animate({ marginRight: (-96 * (i + 1) + 'px') }, 200 * i);
            $(this).addClass("TODO").off();
            github.getList($(this).attr("href").replace("#", ""), ".html");
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
    //    $("#md").html(converter.makeHtml($("#md").text()));


})();
