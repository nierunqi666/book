require(['jquery', 'handle', 'render', 'getPath', 'bscroll', 'storage', 'base64', 'jsonp'], function($, handle, render, getPath, bscroll, storage, base64, jsonp) { //
    //点击文字出现上下nav
    $('article').on('click', function() {
        $('.top').toggle();
        $('.bottom').toggle();
        $('.mask').show();
        $('.font-list').hide();
    });
    $('.mask').on('click', function() {
        $('.font-list').hide();
        $('.top').hide();
        $('.bottom').hide();
        $(this).toggle();
        $('.font').removeClass('active');
    });
    //点击字号设置
    $(".font").on('click', function() {
        $(this).toggleClass('active');
        $('.font-list').toggle();
    });
    //字号设置
    var initFont = storage.get('fontSize') || 14,
        maxFont = 18,
        minFont = 8;

    //大
    $('.large').on('click', function() {
        if (initFont <= maxFont) {
            initFont += 2;
            storage.set('fontSize', initFont);
            $('article>p').css('fontSize', initFont / 37.5 + 'rem');
        }


    });
    //小
    $('.small').on('click', function() {
        if (initFont >= minFont) {
            initFont -= 2;
            storage.set('fontSize', initFont);
            $('article>p').css('fontSize', initFont / 37.5 + 'rem');
        }
    });

    //背景
    var color = storage.get('bgColor');
    $('section').css('background', color); //初始化设置背景
    // var flag = true;
    $('.bg-list').on('click', 'li', function() {
        // if (flag) {
        //     $(this).addClass('active').siblings().removeClass('active');
        //     color = $(this).attr('bg-btn');
        //     storage.set('bgColor', color);
        //     $('section').css('background', color);
        // }
        if ($('.night').hasClass('day')) {
            $(this).addClass('active').siblings().removeClass('active');
        } else {
            $(this).addClass('active').siblings().removeClass('active');
            color = $(this).attr('bg-btn');
            storage.set('bgColor', color);
            $('section').css('background', color);
        }

    })

    //白天夜间切换
    $('.night').on('click', function() {
        $(this).toggleClass('day');
        if ($(this).hasClass('day')) {
            $(this).find($('b')).html('白天');
            $('section').css({
                'background': '#0f1410',
                'color': '#4e534f'
            });

        } else {
            $(this).find($('b')).html('夜间');
            // storage.set('bgColor', '#0f1410');
            var bg = storage.get('bgColor');
            $('section').css('background', bg);
        }

    })



    //获取章节数据
    var id = getPath().id,
        chapter_id = storage.get('chapter_id') || 1;
    console.log(id, chapter_id);
    $.ajax({
        url: "/api/chapter",
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(data) {
            $('.total').html(data.item.toc.length);
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    });

    getData();

    function getData() {
        $.ajax({
            url: '/api/article',
            dataType: 'json',
            data: {
                id: id,
                chapter_id: chapter_id
            },
            success: function(data) {
                console.log(data);
                jsonp({
                    url: data.url,
                    callback: 'duokan_fiction_chapter',
                    cache: true,
                    success: function(data) {
                        var cont = $.base64('decode', data, true);
                        var data = JSON.parse(cont);
                        console.log(data);
                        render(data, $('#acticle-tpl'), $('article'));
                        $('article>p').css('fontSize', initFont / 37.5 + 'rem'); //初始化设置字号
                    }
                })
            },
            error: function(error) {
                console.log(error);
            }
        })
    }
    //请求上一章
    $('.prev').on('click', function() {
        if (chapter_id > 1) {
            chapter_id -= 1;
            $('.cur').html(chapter_id);
            storage.set('chapter_id', chapter_id);
            getData();
        } else {
            alert('已到第一章');
        }


    });

    $('.cur').html(storage.get('chapter_id'));
    //请求下一章
    $('.next').on('click', function() {
        if (chapter_id < 5) {
            chapter_id += 1;
            storage.set('chapter_id', chapter_id);
            $('.cur').html(chapter_id);
            getData();
        } else {
            alert('已到最后一章');
        }

    });


    //目录
    $('.list').on('click', function() {
        chapter_id = storage.get('chapter_id');
        storage.set('chapter_id', chapter_id);
        window.location.href = '../../page/chapter.html?id=' + id + '&chapter_id='
        chapter_id;
    })

    //返回
    $('.icon-back').on('click', function() {
        window.location.href = '../../page/detail.html?id=' + id;
    })




    //请求数据





})