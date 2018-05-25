require(['jquery', 'handle', 'render', 'getPath', 'header', 'bscroll', 'storage'], function($, handle, render, getPath, header, bscroll, storage) {
    header({ title: '目录' });
    var id = getPath().id;
    $.ajax({
        url: "/api/chapter",
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            console.log(data);
            render(data.item, $('#chapter-list'), $('.chapter-list'));
            var myScroll = new bscroll('.section', {
                scrollY: true,
                click: true
            });
            var chapter_id = storage.get('chapter_id');
            console.log(chapter_id);
            var target;
            if (chapter_id) {
                target = chapter_id - 1;
            } else {
                target = data.item.toc.length - 1;
            }
            $('.chapter-list li').eq(target).addClass('active');
            myScroll.scrollToElement($('.chapter-list li').eq(target)[0], '.5s', true, true, 'easing');

        },
        error: function(error) {
            console.log(error);
        }
    });
})