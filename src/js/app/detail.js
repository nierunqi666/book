require(['jquery', 'handle', 'render', 'getPath', 'header'], function($, handle, render, getPath, header) {

    var id = getPath().id;
    $.ajax({
        url: "/api/detail",
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            console.log(data);
            header({ title: data.item.title });
            render(data, $('#deatil-cont'), $('.section'));
            $('.begin').on('click', function() {
                window.location.href = '../../page/everyPage.html?id=' + id;
            })
        },
        error: function(error) {
            console.log(error);
        }
    });
})