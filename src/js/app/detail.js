require(['jquery', 'handle', 'render', 'getPath', 'header', 'storage'], function($, handle, render, getPath, header, storage) {

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
                var val = storage.get('user');
                console.log(val);
                if (!val) {
                    window.location.href = '../../page/login.html';
                } else {
                    window.location.href = '../../page/everyPage.html?id=' + id;
                }
            })
        },
        error: function(error) {
            console.log(error);
        }
    });
})