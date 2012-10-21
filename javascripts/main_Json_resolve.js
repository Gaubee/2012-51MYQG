
getAllAttrs = function (obj) {
    var it = '';
    for (var i in obj) {
        it += i + ':' + obj[i] + '\n';
    }
    return it;
};
$(function () {



    $.ajax({
        url: "File.json",
        cache: false,
        dataType: "json",
        success: function (data, type) {
            Resolve.call(Resolve, data);
        }
    });


});