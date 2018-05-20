define(function() {
    function getPath() {
        var url = location.search;
        var obj = {};
        if (url.indexOf('?') !== -1) {
            url = url.substr(1);
            var arr = url.split('&');
            arr.forEach(function(item, index) {
                var objArr = item.split('=');
                obj[objArr[0]] = objArr[1];
            })
        }
        return obj;
    }
    return getPath
})