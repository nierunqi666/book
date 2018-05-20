define(['handle'], function(handle) {
    function render(data, content, parent) {
        var source = content.html();
        var template = handle.compile(source);
        handle.registerHelper('num', function(index) {
            return "0" + (index + 2);
        })
        var html = template(data);
        parent.append(html);
    }

    return render
});