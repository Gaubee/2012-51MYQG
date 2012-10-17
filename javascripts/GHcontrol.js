//��װGitHub.js��APIת����HTML
var GH = window.GH = function () {
    var _ = new Github({
        username: "",
        password: "******",
        auth: "basic"
    });
    var repo = _.getRepo("Gaubee", "2012-51MYQG");
    var branch = 'gh-pages';

    this.Repository = function () {
        this.getList = function (PATH, Nece, Suffix) {
            repo.getList(branch, PATH, function (err, list) {
                console.log(list)
                var html = "<ul>";
                var length = list.length;
                var er = [0, 0, 0];
                for (var i = 0; i < length; i++) {
                    try {

                        var pathString = list[i].path.replace("\"","");
                        if (pathString.split("\/").length > 2) {
                            //                        console.log('Too long');
                            er[0]++;
                            continue;
                        }
                        if (Nece) {
                            if (Nece != "") {
                                //                            console.log('No .html');
                                if (pathString.search(Nece) == -1) {
                                    er[1]++;
                                    continue;
                                }
                            }
                        }
                        if (Suffix) {
                            if (pathString.substr(-Suffix.length) != Suffix) {
                                console.log(pathString);
                                er[2]++;
                                continue;
                            }
                        }
                        html += "<li><a href=" + pathString + ">" + pathString + "</a></li>"
                    } catch (e) {
                        console.log(e + "\npathString:" + pathString);
                    }
                }
                console.log(er[0] + "." + er[1] + "." + er[2])
                html += "</ul>";
                $("#md").html(html);
            });
        }
        this.getRef = function (PATH) {
            repo.getRef(PATH, function (err, sha) {
                console.log(sha);
            });
        }
        this.read = function (PATH) {
            repo.read(branch, PATH, function (err, data) {
                console.log(data);
            });
        }
    } .call(this);
};


//alert(a.substring(0, 3)+',' + parseInt(a.substring(0, 2), 8).toString(16)+','+a.substring(3));

//(function () {
//    var E = "\"Notes/1.\\345\\210\\266\\344\\275\\234\\350\\276\\271\\346\\240\\217\\345\\260\\217\\345\\267\\245\\345\\205\\267\\347\\232\\204\\345\\237\\272\\346\\234\\254\\346\\212\\200\\345\\267\\247\\343\\200\\202.html\"";
//    alert(E);
//    var E_A = E.split("\\");
//    var length = E_A.length;
//    var it='';
//    for (var i = 0; i < length; i++) {
//        var S=parseInt(E_A[i],8).toString(16);
//        S=="NaN"&&(it+=E_A[i])||(it+="%"+S);
//    }
//    alert(it);
//    alert(decodeURIComponent(it));
//    //alert(E.replace(new RegExp("\\", "gm"), "%"));
//})();

//alert('a')&&function(){alert('b');};

//window.tree = [];
//var length = N.tree.length;
//for (var i = 0; i < length; i++) {
//var content=N.tree[i];
//content["type"] === "blob" && content["path"].search('\"')==-1 && tree.push(N.tree[i]["path"])
//}