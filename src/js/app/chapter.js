require(['jquery', 'handle', 'render', 'getPath', 'header', 'bscroll'], function($, handle, render, getPath, header, bscroll) {
    header({ title: '目录' });
    var id = getPath().id;
    $.ajax({
        url: "/api/chapter",
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            console.log(data.item);
            render(data.item, $('#chapter-list'), $('.chapter-list'));
            var myScroll = new bscroll('.section', {
                scrollY: true,
                click: true
            });
            ($('.chapter-list li:last')).addClass('active');
            myScroll.scrollToElement($('.chapter-list li:last')[0], '.5s', true, true, 'easing');

        },
        error: function(error) {
            console.log(error);
        }
    });
})