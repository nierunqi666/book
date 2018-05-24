require(['jquery', 'handle', 'render', 'getPath', 'header'], function($, handle, render, getPath, header) {

    var fiction_id = getPath().fiction_id;
    $.ajax({
        url: "/api/detail",
        dataType: 'json',
        data: {
            fiction_id: fiction_id
        },
        success: function(data) {
            console.log(data);
            header({ title: data.item.title });
            render(data, $('#deatil-cont'), $('.section'));
        },
        error: function(error) {
            console.log(error);
        }
    });
})