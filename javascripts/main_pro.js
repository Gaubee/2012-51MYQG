
getAllAttrs = function (obj) {
    var it = '';
    for (var i in obj) {
        it += i + ':' + obj[i] + '\n';
    }
    return it;
};
NotesTagsAjax = function (url, headMS, type) {
    $.ajax({
        url: url + "\/README.md",
        cache: false,
        dataType: "text",
        success: function (data, type) {
            evalString = "init" + name + "()";
            $("#md").html(converter.makeHtml(data));
            try {
                eval(evalString);
            } catch (e) {
                console.warn(e);
            }
        },
        error: function () {
            var data = "#" + headMS;
            $("#md").html(converter.makeHtml(data) + "<div title=\'没有详细介绍\'>No details</div>");
        },
        complete: function () {
            if (type instanceof Array) {
                var NotesTags = FileData.getFolder(url, 1).Folder;
                console.log(url + NotesTags)
                var length = NotesTags.length;
                for (var i = 0; i < length; i++) {
                    Init_FileList(NotesTags[i]["path"], i, headMS);
                }
            } else {
                Init_FileList(url, 0, headMS);
            }
        }
    });
}
$(function () {
    function setTile() {
        var WT = parseInt($("#ms").css("width")) - 10, WT_W, WT_H, I;

        if (WT > 300) {
            for (var i = 3; true; i++) {
                var s_WT = (WT - 10 * (i - 2));
                if (s_WT / i <= 150) {
                    WT_W = (s_WT - 10) / i;
                    WT -= parseInt(Math.random() * (i - 1)) * (WT_W + 10); //随机排布公示
                    I = i;
                    break;
                }
            }
        } else {
            WT_W = (WT - 10) / 2;
            WT_H = WT / 2;
        }
        var Tiel_S = $("#ms .tile:not(.double)"), Tile_D = $("#ms .tile").filter(".double");
        Tiel_S.animate({ width: (WT_W + "px"), height: (WT_W + "px") }, 1000, "easeOutCubic").children(".tile-content").animate({ width: (WT_W + "px"), height: (WT_W + "px") }, 600, "easeOutCubic");
        Tile_D.animate({ width: (WT + "px"), height: (WT_W + "px") }, 1000, "easeOutCubic").children(".tile-content").animate({ width: (WT + "px"), height: (WT_W + "px") }, 600, "easeOutCubic");
    };

    window.onresize = function () {
        setTile();
        $.each($("#tl a"), function (key, val) {
            val.innerHTML = subStr(val.title, parseInt($("#tl").css("width")) / 10);
        });
    }

    $.ajax({
        url: "README.md",
        cache: false,
        dataType: "text",
        success: function (data, type) {
            $("#md").html(converter.makeHtml(data));
        }
    });


    $("#tags .tag").live({
        click: function () {
            var name = $(this).attr("href").replace("#", ""), url = "";
            if (name != "" && name != undefined) {
                url = name + "/";
            }
            url = url + "README.md"
            $.ajax({
                url: url,
                cache: false,
                dataType: "text",
                success: function (data, type) {
                    evalString = "init" + name + "()";

                    $("#md").html(converter.makeHtml(data));
                    eval(evalString);
                }
            });
        }
    });
    $("#NotesTag").mouseover(function () {
        $(this).addClass("bg-color-white");
    }).mouseout(function () {
        $(this).removeClass("bg-color-white");
    });


    var converter = new Showdown.converter();
    window.converter = converter;
    loadMD = function () {
        $.ajax({
            url: "README.md",
            cache: false,
            dataType: "text",
            success: function (data, type) {
                $("#md").html(converter.makeHtml(data));
            }
        });
    };


    $.ajax({
        url: "Filed.json",
        cache: false,
        dataType: "json",
        success: function (data, type) {
            FileData = Parsefile.call(Parsefile, data);
            //初始化Notes下拉菜单
            function initNotesTags() {
                var NotesTags = FileData.getFolder("Notes", 1).Folder, html = "";
                var length = NotesTags.length;
                for (var i = 0; i < length; i++) {
                    html += '<li><a class=\"tag\" href=\"#Notes\/' + NotesTags[i].name + '\" onclick=\"NotesTagsAjax(\'' + NotesTags[i].path + '\',\'' + NotesTags[i].name + '\')\">' + NotesTags[i].name + '</a></li>';
                }
                $("#NotesTags").append(html);
            }; initNotesTags();
            //初始化照片墙 
            initPhotos_ms = function () {
                $("#ms").fadeOut(800);
                var Proportion
                    , Photolength = FileData.Photo.length
                    , PhotoFolidslength = FileData.PhotoFolids.length
                    , html = '';
                Proportion = Photolength / (PhotoFolidslength + Photolength);
                var length = 5 + parseInt(10 * Math.random());
                for (var i = 0; i < length; i++) {
                    if (Math.random() > Proportion) {//文件夹，图片集
//                        console.log(html)
                        html += '<div style=\"background-color:#' + RanAllColor() + '\" class="tile double"><div class="tile-content images-set">';
                        var ranFolid = FileData.PhotoFolids[parseInt(Math.random() * PhotoFolidslength)];
                        var ranFolidItems = FileData.getFile(ranFolid["path"], 0).File;
                        var ranFolidItemsLength = ranFolidItems.length;
                        for (var j = 0; j < 5; j++) {
                            var ranFolidItem = ranFolidItems[parseInt(Math.random() * ranFolidItemsLength)];
                            html += '<img alt=\"' + ranFolidItem["name"] + '\" src=\"' + ranFolidItem["path"] + '\" />';
                        }
                        html += '</div><div class="brand"><span class="name">' + ranFolid["name"] + '</span></div></div>';
                    } else {//文件，单图片展
                        html += '<div style=\"background-color:#'+RanAllColor()+'\" class="tile"><div class="tile-content image">';
                        var ranFile = FileData.Photo[parseInt(Math.random() * Photolength)];
                        var name = ranFile["name"];
                        name = name.substr(0, name.length - name.split(".")[name.split(".").length - 1].length - 1);
                        html += '<img alt=\"' + ranFile["name"] + '\" src=\"' + ranFile["path"] + '\" /><div class="brand"><span class="name">' + name + '</span></div>';
                        html += ' </div> </div>';
                    }
                }
//                console.log(html)
                $("#ms").html(html);
                setTile();
                $("#ms").fadeIn(1200);
            }; initPhotos_ms();

        }
    });

    //    $("#Notes")


});
/******************************************/
/****************Init_Notes****************/
/******************************************/
var initNotes = function () {//Notes_Type
    var item = "<ul>";
    var info = "";
    $.each(FileData.NotesFolids, function (key, val) {
        if (val["layer"] == 2) {
            item += "<li class=\" notes-type-item \"><a href=\"#" + val["name"] + "\">" + val["name"] + "</a></li>";
            $.ajax({
                url: (val["path"] + "\/README.md"),
                cache: false,
                dataType: "text",
                async: false,
                success: function (data, type) {
                    info += "<div id=" + val["name"] + ">" + converter.makeHtml(data) + "</div>";
                },
                error: function () {
                    info += "<div id=" + val["name"] + ">" + 没有介绍 + "</div>"
                }
            });
        }

    });
    item += "</ul>" + info;
    $("#Notes_Type").html(item); //.tabs();
};
/******************************************/
/****************Init_Portfolio*************/
/******************************************/
var initPortfolio = function () {//Portfolio_Date
    $("#md").fadeOut(400);
    var item = "";
    var info = "";
    $.each(FileData.PortfolioFolids, function (key, val) {
        if (val["layer"] == 2) {
            /*			<div>
            <h3><a href="#">First</a></h3>
            <div>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
            </div>*/
            item += "<div id=" + val["name"] + " class=\"portfolio-date-item\" onclick=\"Init_FileBlock(\'" + val["path"] + "\',null,null,\'" + val["path"] + "\');\" ><h6 style=\"height:29px;line-height:15.7333px;text-align:right;\" href=\"#" + val["name"] + "\">" + val["name"] + "</h6>";
            $.ajax({
                url: (val["path"] + "\/README.md"),
                cache: false,
                dataType: "text",
                async: false,
                success: function (data, type) {
                    info = converter.makeHtml(data);
                    item += info + "</div><hr />";
                    //                    $("#" + val["name"]).live();
                },
                error: function () {
                    info = "<p>没有介绍</p>"
                    item += info + "</div><hr />";
                }
            });
        }
    });
    $("#Portfolio_Date").html(item); //.accordion({ header: "header",fillSpace: true });
    $("#md").fadeIn(800);
    $("#tl").fadeOut(1000);
};
/******************************************/
/****************Fn__RanColor**************/
/******************************************/
function RanColor() {
    return parseInt(Math.random() * 16 + 240).toString(16) + parseInt(Math.random() * 16 + 240).toString(16) + parseInt(Math.random() * 16 + 240).toString(16);
}
function RanAllColor() {
    return parseInt(Math.random() * 256).toString(16) + parseInt(Math.random() * 256).toString(16) + parseInt(Math.random() * 256).toString(16);
}
function RandarkColor() {
    return parseInt(Math.random() * 128).toString(16) + parseInt(Math.random() * 128).toString(16) + parseInt(Math.random() * 128).toString(16);
}
/******************************************/
/****************Init_Slideshow*************/
/******************************************/
var initSlideshow = function () {//Slideshow_Item
    $("#md").fadeOut(400);
    var item = "";
    var info = "";
    $.each(FileData.SlideshowFolids, function (key, val) {
        if (val["layer"] == 2) {
            item += "<a  target=\"_blank\" href=\'" + val["path"] + "\/index.html\'><div style=\"background-color:#" + RanColor() + "\" class=\"slideshow-item-item\"><h2 title=\'" + val["name"] + "\'>" + val["name"] + "</h2>";
            $.ajax({
                url: (val["path"] + "\/README.md"),
                cache: false,
                dataType: "text",
                async: false,
                success: function (data, type) {
                    info += converter.makeHtml(data) + "</div><hr />"
                },
                error: function () {
                    info += "<p id=" + val["name"] + ">" + 没有介绍 + "</p></div><a><hr />"
                }
            });
        }
    });
    item += info;
    $("#Slideshow_Item").html(item); //.tabs();
    $("#Slideshow_Item .slideshow-item-item").mouseover(function () { var color = "#" + RanColor(); console.log(color); $(this).css({ "backgroundColor": color }); }).mouseout(function () { $(this).css({ "backgroundColor": ("#" + RanColor()) }); });

    $("#md").fadeIn(800);
    $("#tl").fadeOut(1000);
}
/******************************************/
/****************Init_Photo*************/
/******************************************/
var initPhoto = function () {
    $("#md").fadeOut(400);
    var Proportion
                    , Photolength = FileData.Photo.length
                    , PhotoFolidslength = FileData.PhotoFolids.length
                    , html = '';
    Proportion = Photolength / (PhotoFolidslength + Photolength);
    var length = 20 + parseInt(30 * Math.random());
    for (var i = 0; i < length; i++) {
        if (Math.random() > Proportion) {//文件夹，图片集
//            console.log(html)
            html += '<div style=\"background-color:#' + RanAllColor() + '\" class="tile double"><div class="tile-content images-set">';
            var ranFolid = FileData.PhotoFolids[parseInt(Math.random() * PhotoFolidslength)];
            var ranFolidItems = FileData.getFile(ranFolid["path"], 0).File;
            var ranFolidItemsLength = ranFolidItems.length;
            for (var j = 0; j < 5; j++) {
                var ranFolidItem = ranFolidItems[parseInt(Math.random() * ranFolidItemsLength)];
                html += '<img alt=\"' + ranFolidItem["name"] + '\" src=\"' + ranFolidItem["path"] + '\" />';
            }
            html += '</div><div class="brand"><span class="name">' + ranFolid["name"] + '</span></div></div>';
        } else {//文件，单图片展
            html += '<div style=\"background-color:#' + RanAllColor() + '\" class="tile"><div class="tile-content image">';
            var ranFile = FileData.Photo[parseInt(Math.random() * Photolength)];
            var name = ranFile["name"];
            name = name.substr(0, name.length - name.split(".")[name.split(".").length - 1].length - 1);
            html += '<img alt=\"' + ranFile["name"] + '\" src=\"' + ranFile["path"] + '\" /><div class="brand"><span class="name">' + name + '</span></div>';
            html += ' </div> </div>';
        }
    }
//    console.log(html)
    $("#md").append(html);
    $("#md").fadeIn(800);
    $("#tl").fadeOut(1000);
};
/******************************************/
/****************Init_FileList*************/
/******************************************/
var Init_FileList = function (path, IsAdd, head) {//列表形式显示用于Notes模块,IsAdd配置是否追加（不添加头部）
    $("#md").fadeOut(400);
    if (!FileData.getFile[path]) {
        var fileList = FileData.getFile(path, 1);
        console.log("生产缓存");
        FileData.getFile[path] = fileList;
    } else {
        console.log("读取缓存");
        var fileList = FileData.getFile[path]
    }

    if (!IsAdd) {
        if (!head) {//没有传入头部信息的情况下默认为文件夹名字
            var md = '<h2 style=\'text-align:center;\'> ' + fileList.name + "<h2><ul>";
        } else {
            var md = '<h2 style=\'text-align:center;\'> ' + head + "<h2><ul>";
        }
    }
    else {
        var md = "";
    }
    //    console.log(fileList);
    var files = fileList.File;
    var length = files.length;
    for (var i = 0; i < length; i++) {
        var file = files[i];
        md += "<li><a title=\'" + file.name + "\' href=\'" + file.path + "\'>" + file.name + "</a></li>";
    }
    //    console.log("path:" + path);
    //    console.log(md);
    if (!IsAdd) {
        $("#tl").html(md);
    } else {
        $("#tl").append(md);
    }
    $("#md").fadeIn(800);

    $("#tl").fadeIn(1200);

    $.each($("#tl a"), function (key, val) {
        val.innerHTML = subStr(val.title, parseInt($("#tl").css("width")) / 10);
    });
}
var Init_FileBlock = function (path, IsAdd, head) {//块形式显示用于作品展示块,IsAdd配置是否追加（不添加头部）
    if (!FileData.getFile[path]) {
        var fileList = FileData.getFolder(path, 1);
        console.log("生产缓存");
        FileData.getFolder[path] = fileList;
    } else {
        console.log("读取缓存");
        var fileList = FileData.getFolder[path];
    }

    if (!IsAdd) {
        if (!head) {//没有传入头部信息的情况下默认为文件夹名字
            var md = '<h2 style=\'text-align:center;\'> ' + fileList.name + "<h2><ul>";
        } else {
            var md = '<h2 style=\'text-align:center;\'> ' + head + "<h2><ul>";
        }
    }
    else {
        var md = "";
    }
    //    console.log(fileList);
    var files = fileList.Folder;
    var length = files.length;
    window.clickHead = [];
    for (var i = 0; i < length; i++) {
        var file = files[i]; // <span></span>
        var parentPath = file.path.replace(("\/" + file.name), "");

        window.clickHead[i] = "<i onclick=\"Init_FileBlock(\'" + parentPath + "\',null,null,\'" + parentPath + "\');\" style=\'margin-top:10px;\' class=\'icon-swap-left place-left\'></i><h2>" + file.name + "</h2>";
        md += " <div onclick=\"Init_FileList(\'" + file.path + "\',null,clickHead[" + i + "])\" style=\'background-color:#" + RandarkColor() + "\' class=\"tile" + (Math.random() > 0.5 ? " double" : "") + "\"> <div class=\"brand\"><span class=\"name\" title=\'" + file.name + "\' href=\'" + file.path + "\'>" + file.name + "</span></div><div id=\'" + file.path + "\'></div></div>";
    }
    //    console.log("path:" + path);
    //    console.log(md);
    if (!IsAdd) {
        $("#tl").html(md);
    } else {
        $("#tl").append(md);
    }
    $("#tl").fadeIn(2600);

    $.each($("#tl a"), function (key, val) {
        val.innerHTML = subStr(val.title, parseInt($("#tl").css("width")) / 10);
    });
}

/**
* @param {string} str 要截取的字符串
*/
var getStrSize = function (str) {
    var size = 0;
    for (var i = 0, len = str.length; i < len; i++) {
        if (str.charCodeAt(i) > 255) {
            size += 2;
        } else {
            size++;
        }
    }
    return size;
};
/**
* @param {string} str 要截取的字符串
* @param {number} size 截取长度(单字节长度)
*/
var subStr = function (str, size) {
    var curSize = 0, arr = [];
    size = parseInt(size);
    for (var i = 0, len = str.length; i < len; i++) {
        arr.push(str.charAt(i));
        if (str.charCodeAt(i) > 255) {
            curSize += 2;
            if (size === curSize || size === curSize - 1) {
                return arr.join('');
            }
        } else {
            curSize++;
            if (size === curSize) {
                return arr.join('') + "...";
            }
        }
    }
    return str;
};
