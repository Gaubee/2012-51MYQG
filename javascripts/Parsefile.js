Parsefile = function () {
    this.data = arguments[0];
    function forEach(items, cb) {
        var length = items.length;
        var newItems = [];
        for (var i = 0; i < length; i++) {
            if (cb(i, items[i])) {
                var item = { "path": items[i]["path"], "size": items[i]["size"] };
                item["layer"] = item["path"].split("\/").length;
                item["name"] = item["path"].split("\/")[(item["layer"] - 1)];
                newItems.push(item);
            }
        }
        return newItems;
    }

    function forEachFile(items, cb) {
        var length = items.length;
        var newItems = [];
        for (var i = 0; i < length; i++) {
            if (cb(i, items[i]))
                newItems.push(items[i]);
        }
        return newItems;
    }
    try {
        //        console.log(getAllAttrs(item)); 

        var Filetree = {
            tree: this.data.tree,
            folder: forEach(this.data.tree, function (i, item) { return item["type"] === "tree"; }),
            file: forEach(this.data.tree, function (i, item) { return item["type"] === "blob"; })
        };
        Filetree.Notes = forEachFile(Filetree.file, function (i, item) { return item["path"].search("Notes") == 0; });
        Filetree.Portfolio = forEachFile(Filetree.file, function (i, item) { return item["path"].search("Portfolio") == 0; });
        Filetree.Slideshow = forEachFile(Filetree.file, function (i, item) { return item["path"].search("Slideshow") == 0; });
        Filetree.Photo = forEachFile(Filetree.file, function (i, item) { return item["path"].search("Photo") == 0; });
        Filetree.NotesFolids = forEachFile(Filetree.folder, function (i, item) { return item["path"].search("Notes") == 0 });
        Filetree.PortfolioFolids = forEachFile(Filetree.folder, function (i, item) { return item["path"].search("Portfolio") == 0; });
        Filetree.SlideshowFolids = forEachFile(Filetree.folder, function (i, item) { return item["path"].search("Slideshow") == 0; });
        Filetree.PhotoFolids = forEachFile(Filetree.folder, function (i, item) { return item["path"].search("Photo") == 0; });
    } catch (e) {
        console.error(e);
    }
    try {
        var Folods = function () {
            this.getFolder = function (path, level) {//level级数（Nunber），默认为ALL||0;
                //                if (data instanceof Array) 
                var level = level ? (level + path.split("\/").length) : 0;
                var items = this.folder;
                var length = items.length;
                var data = {}, newItems = [];
                for (var i = 0; i < length; i++) {
                    var item = items[i];
                    if (item["path"].search(path) == 0) {
                        if (item["path"] != path) {
                            if (level) {
                                if (item["layer"] === level) {
                                    newItems.push(item);
                                }
                            } else {
                                newItems.push(item);
                            }
                        }
                        else {
                            data = item;
                        }
                    }
                }
                data.Folder = newItems;
                return data;
            }
            this.getFile = function (path, level) {

                var level = level ? (level + path.split("\/").length) : 0;
                var items = this.file;
                var length = items.length;
                var data = {}, newItems = [];

                data.name = path.split("\/")[path.split("\/").length - 1];
                data.path = path.substr(data.name.length + 1);

                for (var i = 0; i < length; i++) {
                    var item = items[i];
                    if (item["path"].search(path) == 0) {
                        if (level) {
                            if (item["layer"] === level) {
                                newItems.push(item);
                            }
                        } else {
                            newItems.push(item);
                        }
                    }
                }
                data.File = newItems;
                return data;
            }
            this.getBoth = function (path, level) {
                var level = level ? (level + path.split("\/").length) : 0;
                var items = this.tree;
                var length = items.length;
                var data = {}, newItems = [];

                data.name = path.split("\/")[path.split("\/").length - 1];
                data.path = path.substr(data.name.length + 1);

                for (var i = 0; i < length; i++) {
                    var item = items[i];
                    if (item["path"].search(path) == 0) {
                        if (level) {
                            if (item["layer"] === level) {
                                newItems.push(item);
                            }
                        } else {
                            newItems.push(item);
                        }
                    }
                }
                data.Tree = newItems;
                return data;
            }
        } .call(Filetree);
    } catch (e) {
        console.error(e);
    }
    a = "asdfghjkl".split("");

    return Filetree;
};
window.Parsefile = Parsefile;