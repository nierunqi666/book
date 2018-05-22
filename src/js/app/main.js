require.config({
    baseUrl: "/js/",
    paths: {
        //依赖lib
        "jquery": "lib/jquery-3.3.1.min",
        "handle": "lib/handlebars",
        "bscroll": "lib/bscroll",
        "swiper": "lib/swiper-4.1.6.min",
        "text": "lib/text",



        //common
        "getPath": "common/getPath",
        "render": "common/render",
        "GetSlideDirection": "common/slide-direction",
        "header": "common/header",
        "storage": "common/storage",





        //app
        "index": "app/index",
        "search": "app/search",
        "detail": "app/detail",



        //模板
        "headerTpl": "../../page/tpl/header.html",
        "searchTpl": "../../page/tpl/search-tpl.html"

    }
});