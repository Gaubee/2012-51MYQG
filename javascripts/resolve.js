

Resolve = function () {
    this.data = arguments[0];
    if (!this.data) {
        console.error("no data!");
        return this.data;
    };
    (function () {
        //        解析8进制成16进制从而解析成汉字（清除两个双引号）
        var tree = this.data.tree;
        var length = tree.length;

        for (var i = 0; i < length; i++) {
            var path = tree[i]["path"];
            if (path.indexOf("\"") === 0 && true) {
                var prepath = path.split("\"")[1].split("\\");
                var prepathlength = prepath.length;
                for (var j = 1; j < prepathlength; j++) {
                    var pathString = '0' + prepath[j];
                    prepath[j] = parseInt(pathString.substring(0, 4)).toString(16) + pathString.substring(4);
                }
                path = prepath.join("%");
                tree[i]["path"] = decodeURI(path);
            }
            //            console.log(tree[i]["path"]); //encodeURIComponent//encodeURI
            //            console.warn(tree[i]["type"]);
        }

        document.write(JSON.stringify(this.data));


    }).call(this);
};
window.Resolve = Resolve;
