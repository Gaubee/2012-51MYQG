Parsefile = function () {
    this.data = arguments[0];
    function forEach(items, cb) {
        var length = items.length;
        var newItems = [];
        for (var i = 0; i < length; i++) {
            if (cb.call(i, items[i]))
                newItems.push({ "push": items[i]["push"], "layer": items[i]["push"].split("\/").length, "size": items[i]["size"] });
        }
        return newItems;
    }
    function forEachFiletree(items, cb) {
        var length = items.length;
        var newItems = [];
        for (var i = 0; i < length; i++) {
            if (cb.call(i, items[i]))
                newItems.push(items[i]);
        }
        return newItems;
    }
    var Filetree = {
        tree: this.data.tree,
        folder: forEach(this.data.tree, function (i, item) { return iitem["type"] === "tree"; }),
        file: forEach(this.data.tree, function (i, item) { return iitem["type"] === "blob"; })
    };
    Filetree.Notes = forEachFiletree(Filetree.folder, function (i, item) { return item["path"].search("Notes") == 0; });
    Filetree.Portfolio = forEachFiletree(Filetree.file, function (i, item) { return item["path"] === "Notes"; });
    Filetree.Slideshow = forEachFiletree(Filetree.file, function (i, item) { return item["path"] === "Slideshow"; });
    a = "asdfghjkl".split("");

    return Filetree;
};
window.Parsefile = Parsefile;