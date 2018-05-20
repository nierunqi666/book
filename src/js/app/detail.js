require(['jquery', 'handle', 'render', 'getPath'], function($, handle, render, getPath) {
    console.log(getPath());
    var id = getPath().id;
    $.ajax({
        url: "/api/detail",
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            console.log(data.data[0]);
            render(data.data[0], $('#detail'), $('.wrap'))
        },
        error: function(error) {
            console.log(error);
        }
    });
})