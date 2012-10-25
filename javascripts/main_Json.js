
getAllAttrs = function (obj) {
    var it = '';
    for (var i in obj) {
        it += i + ':' + obj[i] + '\n';
    }
    return it;
};


$(function () {
//    var GH = function () {
//        var _ = new Github({
//            username: "gaubeebangeel@gmail.com",
//            password: "gaubee546528",
//            auth: "basic"
//        });
//        var repo = _.getRepo("Gaubee", "2012-51MYQG");
//        var branch = 'gh-pages';
//        GH.prototype = repo;
//        this.Repository = function () {
//            this.contents = function (PATH) {
//                repo.contents(PATH, function () {
//                    console.log("get contents")
//                });
//            }

//            this.read = function (PATH) {
//                repo.read(branch, PATH, function () {
//                    console.log("read");
//                });
//            }
//            this.getList = function (PATH, Nece, Suffix) {
//                repo.getList(branch, PATH, function (err, list) {
//                    console.log(list)
//                    var html = "<ul>";
//                    var length = list.length;
//                    var er = [0, 0, 0];
//                    for (var i = 0; i < length; i++) {
//                        try {

//                            var pathString = list[i].path.replace("\"", "");
//                            if (pathString.split("\/").length > 2) {
//                                //                        console.log('Too long');
//                                er[0]++;
//                                continue;
//                            }
//                            if (Nece) {
//                                if (Nece != "") {
//                                    //                            console.log('No .html');
//                                    if (pathString.search(Nece) == -1) {
//                                        er[1]++;
//                                        continue;
//                                    }
//                                }
//                            }
//                            if (Suffix) {
//                                if (pathString.substr(-Suffix.length) != Suffix) {
//                                    console.log(pathString);
//                                    er[2]++;
//                                    continue;
//                                }
//                            }
//                            html += "<li><a href=" + pathString + ">" + pathString + "</a></li>"
//                        } catch (e) {
//                            console.log(e + "\npathString:" + pathString);
//                        }
//                    }
//                    console.log(er[0] + "." + er[1] + "." + er[2])
//                    html += "</ul>";
//                    $("#md").html(html);
//                });
//            }
//            this.getRef = function (PATH) {
//                repo.getRef(PATH, function (err, sha) {
//                    console.log(sha);
//                });
//            }
//            this.read = function (PATH) {
//                var D = {};
//                repo.read(branch, PATH, function (err, data) {
//                    D = data;
//                });
//                console.log(D);
//                return D;
//            }
//            this.getSha = function (PATH) {
//                var D = {};
//                repo.getSha(branch, PATH, function (err, sha) {
//                    D = sha;
//                });
//                console.log(D);
//                return D;
//            }
//        } .call(this);
//    };
//    window.GH = GH;

//    var FileJson = new GH().getSha("");
//    console.log(FileJson);


        $.ajax({
               url: "https://api.github.com/repos/Gaubee/2012-51MYQG/git/trees/gh-pages?recursive=true",
            cache: false,
            dataType: "json",
            success: function (data, type) {
                document.write(JSON.stringify(data));
            }
        });



});