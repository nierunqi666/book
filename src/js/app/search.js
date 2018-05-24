require(['jquery', 'header', 'render', 'text!searchTpl', 'bscroll', 'storage'], function($, header, render, searchTpl, bscroll, storage) {

    header({ isSearch: true });
    $('body').append(searchTpl);
    var arr = storage.get('items') || [];
    render(arr, $('#history-list'), $('.history-search'));
    //小tag
    $('.history-search').on('click', 'li', function() {
        var val = $(this).text();
        $('.search-ipt').val(val);
        console.log(val);
        $.ajax({
            url: "/api/search",
            dataType: "json",
            data: {
                key: val
            },
            success: function(data) {
                console.log(data);
                if (!data) {
                    $('.inner-content').html('<p>暂无数据哦<p>');
                } else {
                    render(data.items, $('#book-list'), $('.search-list'));
                    $('.history-search').hide();
                }


            },
            error: function(error) {
                console.warn(error);
            }
        })
    });
    //搜索点击
    $('.click-search').on('click', function() {
        var val = $('.search-ipt').val();

        $('.history-search').hide();
        $('.search-list').show();
        if (!val) {
            $('.inner-content').html('<p>搜索内容为空,哈哈<p>');
        } else {
            $('.search-list').html('');
            $.ajax({
                url: "/api/search",
                dataType: "json",
                data: {
                    key: val
                },
                success: function(data) {
                    if (!data) {
                        $('.inner-content').html('<p>暂无数据哦<p>');
                    } else {
                        if (arr.indexOf(val) === -1) {
                            arr.push(val);
                            storage.set('items', arr);
                        }
                        render(data.items, $('#book-list'), $('.search-list'));
                        var myScroll = new bscroll('.scroll-wrap', {
                            scrollY: true,
                            probeType: 2,
                            click: true
                        });
                        $('.history-search').hide();
                    }

                },
                error: function(error) {
                    console.warn(error);
                }
            })
        }
    })

    //input
    $('.search-ipt').on('input', function() {
        var val = $(this).val();
        if (!val) {
            $('.history-search').show();
            $('.search-list').hide();
            $('.search-list').html('');
        }
    });
});