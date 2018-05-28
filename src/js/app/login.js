require(['jquery', 'storage'], function($, storage) {
    //获取输入的值
    $('.button').on('click', function() {
        var user = $('#user').val();
        var pwd = $('#pwd').val();
        console.log(user, pwd);
        //数据请求
        $.ajax({
            url: '/login',
            dataType: 'json',
            type: 'post',
            data: {
                user: user,
                pwd: pwd
            },
            success: function(data) {
                if (data.code == 0) {
                    alert('登录成功');
                    storage.set('user', user);
                }
            },
            error: function(error) {
                console.warn(error);
            }
        })
    });
})