require(['jquery', 'swiper', 'bscroll', 'render'], function($, swiper, bscroll, render) {

    //尺寸
    var fontsize = $("html").css("fontSize");
    var size = parseFloat(fontsize) * 60 / 37.5;

    //实例化swiper
    var mySwiper = new swiper(".swiper-max", {
        on: {
            slideChangeTransitionStart: function() {
                var index = this.activeIndex;
                if (index == 1) {
                    $('.line').addClass("move");
                } else {
                    $('.line').removeClass("move");
                }
            },
        }

    });
    //tab切换
    $(".switch-tab>span").on("click", function() {
        mySwiper.slideTo($(this).index());
        $(this).addClass("tab-active").siblings().removeClass("tab-active");
        if ($(this).index() == 1) {
            $('.line').addClass("move");
        } else {
            $('.line').removeClass("move");
        }

    });

    //数据请求
    $.ajax({
        url: '/api/index',
        dataType: 'json',
        success: function(data) {
            console.log(data.items[6].data);
            render(data.items[0].data, $("#banner-list"), $(".banner")); //banner
            render(data.items[1].data, $("#hot-list"), $(".hot-list")); //最火
            render(data.items[2].data.data[0], $("#list-one"), $(".recommend-list-one"));
            render(data.items[2].data.data.splice(1, 4), $("#list-title"), $(".recommend-list-title"));
            render(data.items[3].data.data.splice(0, 5), $("#female-list-pic"), $(".female-list"));
            render(data.items[4].data.data.splice(0, 5), $("#male-list-pic"), $(".male-list"));
            render(data.items[5].data, $("#free-list"), $(".free-list"));
            render(data.items[6].data, $("#topics-list"), $(".topics-list-one"));
            banner();
        },
        error: function(error) {
            console.warn(error);
        }
    });
    //实例化轮播图
    function banner() {
        var bannerSwiper = new swiper(".banner", {
            autoplay: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination'
            }
        });
    }

    //实例化scroll
    var myScroll = new bscroll(".bookCity-scroll", {
        scrollY: true,
        probeType: 2,
        click: true
    })

    var pageNum = 1,
        total,
        count = 10,
        upLoad = "上拉加载更多",
        downRefesh = "下拉刷新",
        rebaseMore = "释放加载更多",
        rebaseRefresh = "释放刷新",
        noneDataTip = "暂无数据";
    var _parent = $('.bookCity-scroll>div');
    myScroll.on("scroll", function() {

        if (this.y < this.maxScrollY - size) {
            if (total && pageNum > total) {
                _parent.attr("up", noneDataTip);
            } else {
                _parent.attr("up", rebaseMore);
            }

        } else if (this.y < this.maxScrollY - size / 2) {
            if (total && pageNum > total) {
                _parent.attr("up", noneDataTip);
            } else {
                _parent.attr("up", upLoad);
            }
        } else if (this.y > size) {
            _parent.attr("down", rebaseRefresh);
        } else if (this.y > size / 2) {
            _parent.attr("down", downRefesh);
        }
    })

    myScroll.on("scrollEnd", function() {
        if (total && pageNum > total) {
            _parent.attr("up", noneDataTip);
        } else {
            _parent.attr("up", upLoad);
        }
        _parent.attr("down", downRefesh);
    })

    myScroll.on("touchEnd", function() {
        if (_parent.attr("up") === rebaseMore) {
            if (total && pageNum > total) {
                return false
            } else {
                loadMore(pageNum);
                pageNum++;
            }
        }
        if (_parent.attr("down") === rebaseRefresh) {
            location.reload()
        }
    })

    function loadMore(pageNum) {
        $.ajax({
            url: '/api/recommed',
            dataType: 'json',
            data: {
                pageNum: pageNum,
                count: count
            },
            success: function(data) {
                // render(data.items, $("#l-r-tpl"), $("#load-more"));
                myScroll.refresh();
                total = data.total / count;
            },
            error: function(error) {
                console.warn(error)
            }

        })
    }

    // //滑动处理  
    // var startX, startY;
    // document.addEventListener('touchstart', function(ev) {
    //     startX = ev.touches[0].pageX;
    //     startY = ev.touches[0].pageY;
    // }, false);
    // document.addEventListener('touchend', function(ev) {
    //     var endX, endY;
    //     endX = ev.changedTouches[0].pageX;
    //     endY = ev.changedTouches[0].pageY;
    //     var direction = getSlideDirection(startX, startY, endX, endY);
    //     switch (direction) {
    //         case 3:
    //             wrapSwiper.slideTo(1);
    //             $('.line').addClass("move");
    //             $("span").eq(1).addClass("tab-active").siblings().removeClass("tab-active");
    //             break;
    //         case 4:
    //             wrapSwiper.slideTo(0);
    //             _line.removeClass("move");
    //             $("span").eq(0).addClass("tab-active").siblings().removeClass("tab-active");
    //             break;
    //         default:
    //     }
    // }, false);


})